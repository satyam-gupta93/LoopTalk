import React, { useEffect, useRef, useState } from 'react';
import * as mediasoupClient from 'mediasoup-client';
import io from 'socket.io-client';
import server from '../../environment';
import { 
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MonitorUp,
  MonitorX,
  MessageSquare,
  Send,
  X,
  Copy,
  Check,
  Users
} from 'lucide-react';

const server_url = server;

const VideoMeet = () => {
    const socketRef = useRef(null);
    const socketIdRef = useRef(null);
    const localVideoref = useRef(null);
    const localStreamRef = useRef(null);

    // Mediasoup Refs
    const deviceRef = useRef(null);
    const sendTransportRef = useRef(null);
    const recvTransportRef = useRef(null);
    const producersRef = useRef(new Map()); // mediaType -> Producer
    const consumersRef = useRef(new Map()); // consumerId -> Consumer

    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video, setVideo] = useState(true);
    let [audio, setAudio] = useState(true);
    let [screen, setScreen] = useState(false);
    let [showModal, setModal] = useState(false);
    let [screenAvailable, setScreenAvailable] = useState(false);
    let [messages, setMessages] = useState([]);
    let [message, setMessage] = useState("");
    let [newMessages, setNewMessages] = useState(0);
    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");
    let [copied, setCopied] = useState(false);

    const videoRef = useRef([]);
    let [videos, setVideos] = useState([]);
    let [participants, setParticipants] = useState({});

    // 1. Initial AV permissions
    useEffect(() => {
        getPermissions();
        return () => {
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const getPermissions = async () => {
        try {
            if (navigator.mediaDevices?.getDisplayMedia) {
                setScreenAvailable(true);
            }

            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                } 
            });

            localStreamRef.current = stream;
            window.localStream = stream;

            if (localVideoref.current) {
                localVideoref.current.srcObject = stream;
            }
            setVideoAvailable(true);
            setAudioAvailable(true);
            setVideo(true);
            setAudio(true);
        } catch (error) {
            console.log("Permission error:", error);
            try {
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                localStreamRef.current = audioStream;
                window.localStream = audioStream;
                setAudioAvailable(true);
                setVideoAvailable(false);
                setVideo(false);
                setAudio(true);
            } catch (e) {
                setAudioAvailable(false);
                setVideoAvailable(false);
                setVideo(false);
                setAudio(false);
            }
        }
    };

    // Keep preview video stream attached
    useEffect(() => {
        if (localVideoref.current && localStreamRef.current) {
            localVideoref.current.srcObject = localStreamRef.current;
        }
    }, [askForUsername]);

    /**
     * Consume a remote producer
     */
    const consumeProducer = async (prodInfo) => {
        const { producerId, producerSocketId, producerUsername, kind, appData } = prodInfo;
        const device = deviceRef.current;
        const recvTransport = recvTransportRef.current;
        const socket = socketRef.current;

        if (!device || !recvTransport || !socket) return;

        socket.emit(
            'consume',
            {
                transportId: recvTransport.id,
                producerId,
                rtpCapabilities: device.rtpCapabilities
            },
            async (response) => {
                if (response.error) {
                    console.error('[Mediasoup] Consume error:', response.error);
                    return;
                }

                const { id, kind, rtpParameters } = response.params;

                try {
                    const consumer = await recvTransport.consume({
                        id,
                        producerId,
                        kind,
                        rtpParameters,
                        appData
                    });

                    consumersRef.current.set(consumer.id, consumer);

                    // Resume consumer on server
                    socket.emit('resume-consumer', { consumerId: consumer.id });

                    setVideos((prevVideos) => {
                        const existingIndex = prevVideos.findIndex(v => v.socketId === producerSocketId);
                        if (existingIndex !== -1) {
                            const existing = prevVideos[existingIndex];
                            existing.stream.addTrack(consumer.track);
                            const updated = [...prevVideos];
                            updated[existingIndex] = { ...existing };
                            videoRef.current = updated;
                            return updated;
                        } else {
                            const stream = new MediaStream([consumer.track]);
                            const newVideo = {
                                socketId: producerSocketId,
                                stream: stream,
                                autoplay: true,
                                playsinline: true,
                                producerId: producerId
                            };
                            const updated = [...prevVideos, newVideo];
                            videoRef.current = updated;
                            return updated;
                        }
                    });

                    if (producerUsername) {
                        setParticipants(prev => ({
                            ...prev,
                            [producerSocketId]: producerUsername
                        }));
                    }
                } catch (err) {
                    console.error('[Mediasoup] Consumer error:', err);
                }
            }
        );
    };

    /**
     * Publish local media tracks to SFU
     */
    const publishLocalMedia = async () => {
        const sendTransport = sendTransportRef.current;
        const stream = localStreamRef.current;

        if (!sendTransport || !stream) return;

        // Video Track
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack && video) {
            try {
                const videoProducer = await sendTransport.produce({
                    track: videoTrack,
                    encodings: [
                        { maxBitrate: 100000 },
                        { maxBitrate: 300000 },
                        { maxBitrate: 900000 }
                    ],
                    codecOptions: {
                        videoGoogleStartBitrate: 1000
                    },
                    appData: { mediaType: 'webcam' }
                });
                producersRef.current.set('webcam', videoProducer);
            } catch (e) {
                console.error("Error producing video:", e);
            }
        }

        // Audio Track
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack && audio) {
            try {
                const audioProducer = await sendTransport.produce({
                    track: audioTrack,
                    appData: { mediaType: 'mic' }
                });
                producersRef.current.set('mic', audioProducer);
            } catch (e) {
                console.error("Error producing audio:", e);
            }
        }
    };

    /**
     * Connect to Room via SFU
     */
    const connect = () => {
        const userDisplayName = username.trim() || 'Anonymous';
        setUsername(userDisplayName);
        setAskForUsername(false);

        const roomPath = window.location.pathname.replace(/^\//, '') || 'default-room';

        const socket = io.connect(server_url, { secure: false, transports: ['websocket', 'polling'] });
        socketRef.current = socket;

        socket.on('connect', () => {
            socketIdRef.current = socket.id;

            socket.emit('join-room', { roomPath, username: userDisplayName }, async (response) => {
                if (response.error) {
                    alert(`Failed to join room: ${response.error}`);
                    return;
                }

                const { rtpCapabilities, existingProducers, existingMessages } = response;

                if (existingMessages) {
                    setMessages(existingMessages.map(m => ({ sender: m.sender, data: m.data })));
                }

                try {
                    const device = new mediasoupClient.Device();
                    await device.load({ routerRtpCapabilities: rtpCapabilities });
                    deviceRef.current = device;

                    // 1. Create Send Transport
                    socket.emit('create-webrtc-transport', { direction: 'send' }, async (sendRes) => {
                        if (sendRes.error) {
                            console.error('Error creating send transport:', sendRes.error);
                            return;
                        }

                        const sendTransport = device.createSendTransport(sendRes.params);

                        sendTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
                            socket.emit('connect-transport', { transportId: sendTransport.id, dtlsParameters }, (res) => {
                                if (res?.error) errback(res.error);
                                else callback();
                            });
                        });

                        sendTransport.on('produce', ({ kind, rtpParameters, appData }, callback, errback) => {
                            socket.emit('produce', { transportId: sendTransport.id, kind, rtpParameters, appData }, (res) => {
                                if (res?.error) errback(res.error);
                                else callback({ id: res.id });
                            });
                        });

                        sendTransportRef.current = sendTransport;
                        await publishLocalMedia();
                    });

                    // 2. Create Recv Transport
                    socket.emit('create-webrtc-transport', { direction: 'recv' }, async (recvRes) => {
                        if (recvRes.error) {
                            console.error('Error creating recv transport:', recvRes.error);
                            return;
                        }

                        const recvTransport = device.createRecvTransport(recvRes.params);

                        recvTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
                            socket.emit('connect-transport', { transportId: recvTransport.id, dtlsParameters }, (res) => {
                                if (res?.error) errback(res.error);
                                else callback();
                            });
                        });

                        recvTransportRef.current = recvTransport;

                        // Consume existing producers
                        if (existingProducers && existingProducers.length > 0) {
                            for (const prod of existingProducers) {
                                await consumeProducer(prod);
                            }
                        }
                    });

                } catch (e) {
                    console.error('Error initializing Mediasoup client:', e);
                }
            });

            // Listen for new producers
            socket.on('new-producer', async (prodInfo) => {
                await consumeProducer(prodInfo);
            });

            // Listen for closed producers
            socket.on('producer-closed', ({ producerId, producerSocketId }) => {
                setVideos((prevVideos) => {
                    const filtered = prevVideos.filter(v => v.socketId !== producerSocketId);
                    videoRef.current = filtered;
                    return filtered;
                });
                consumersRef.current.delete(producerId);
            });

            // Listen for peer-joined
            socket.on('peer-joined', ({ socketId, username: peerName }) => {
                setParticipants(prev => ({ ...prev, [socketId]: peerName }));
            });

            // Listen for peer-left
            socket.on('peer-left', ({ socketId }) => {
                setVideos((prevVideos) => {
                    const filtered = prevVideos.filter(v => v.socketId !== socketId);
                    videoRef.current = filtered;
                    return filtered;
                });
                setParticipants((prev) => {
                    const updated = { ...prev };
                    delete updated[socketId];
                    return updated;
                });
            });

            // Listen for chat messages
            socket.on('chat-message', (data, sender, socketIdSender) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: sender, data: data }
                ]);
                if (socketIdSender !== socketIdRef.current) {
                    setNewMessages((prevNewMessages) => prevNewMessages + 1);
                }
            });
        });
    };

    let handleVideo = async () => {
        const videoProducer = producersRef.current.get('webcam');
        const stream = localStreamRef.current;
        const videoTrack = stream?.getVideoTracks()[0];

        if (video) {
            if (videoTrack) videoTrack.enabled = false;
            if (videoProducer) {
                videoProducer.pause();
                socketRef.current?.emit('pause-producer', { producerId: videoProducer.id });
            }
            setVideo(false);
        } else {
            if (videoTrack) {
                videoTrack.enabled = true;
                if (videoProducer) {
                    videoProducer.resume();
                    socketRef.current?.emit('resume-producer', { producerId: videoProducer.id });
                } else if (sendTransportRef.current) {
                    const newProducer = await sendTransportRef.current.produce({
                        track: videoTrack,
                        appData: { mediaType: 'webcam' }
                    });
                    producersRef.current.set('webcam', newProducer);
                }
            }
            setVideo(true);
        }
    };

    let handleAudio = () => {
        const audioProducer = producersRef.current.get('mic');
        const stream = localStreamRef.current;
        const audioTrack = stream?.getAudioTracks()[0];

        if (audio) {
            if (audioTrack) audioTrack.enabled = false;
            if (audioProducer) {
                audioProducer.pause();
                socketRef.current?.emit('pause-producer', { producerId: audioProducer.id });
            }
            setAudio(false);
        } else {
            if (audioTrack) audioTrack.enabled = true;
            if (audioProducer) {
                audioProducer.resume();
                socketRef.current?.emit('resume-producer', { producerId: audioProducer.id });
            }
            setAudio(true);
        }
    };

    let handleScreen = async () => {
        const sendTransport = sendTransportRef.current;
        if (!sendTransport) return;

        if (screen) {
            const screenProducer = producersRef.current.get('screen');
            if (screenProducer) {
                socketRef.current?.emit('close-producer', { producerId: screenProducer.id });
                screenProducer.close();
                producersRef.current.delete('screen');
            }
            setScreen(false);
        } else {
            try {
                const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
                const screenTrack = displayStream.getVideoTracks()[0];
                const screenProducer = await sendTransport.produce({
                    track: screenTrack,
                    appData: { mediaType: 'screen' }
                });
                producersRef.current.set('screen', screenProducer);
                setScreen(true);

                screenTrack.onended = () => {
                    socketRef.current?.emit('close-producer', { producerId: screenProducer.id });
                    screenProducer.close();
                    producersRef.current.delete('screen');
                    setScreen(false);
                };
            } catch (e) {
                console.error("Screen share error:", e);
            }
        }
    };

    let handleEndCall = () => {
        try {
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        } catch (e) { }
        window.location.href = "/home";
    };

    let sendMessage = () => {
        if (!message.trim() || !socketRef.current) return;
        socketRef.current.emit('chat-message', {
            text: message.trim(),
            sender: username || 'Anonymous'
        });
        setMessage("");
    };

    const copyMeetingLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    /**
     * Compute Dynamic Adaptive Grid Layout based on number of remote videos
     */
    const getGridContainerClass = (count) => {
        if (count === 1) {
            return "grid-cols-1 max-w-4xl max-h-[75vh]";
        }
        if (count === 2) {
            return "grid-cols-1 md:grid-cols-2 max-w-5xl max-h-[75vh]";
        }
        if (count === 3) {
            return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl";
        }
        if (count === 4) {
            return "grid-cols-1 sm:grid-cols-2 max-w-5xl";
        }
        if (count <= 6) {
            return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl";
        }
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl";
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {askForUsername === true ? (
                <div className="flex flex-col items-center justify-center min-h-screen px-4">
                    <div className="w-full max-w-md space-y-6">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-950">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold text-white">Loop Talk</h2>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white text-center">Enter Lobby</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                                        onKeyPress={(e) => e.key === 'Enter' && connect()}
                                    />
                                </div>

                                <button
                                    onClick={connect}
                                    className="w-full px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950"
                                >
                                    <Video className="w-5 h-5" />
                                    Connect
                                </button>
                            </div>

                            <div className="relative rounded-xl overflow-hidden bg-slate-800 border border-slate-700 aspect-video flex items-center justify-center">
                                <video 
                                    ref={localVideoref} 
                                    autoPlay 
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                    <span className="text-xs text-white font-medium">Preview</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
                    {/* Chat Modal */}
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md h-[80vh] max-h-[600px] flex flex-col shadow-2xl">
                                <div className="flex items-center justify-between p-4 border-b border-slate-800">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-emerald-500" />
                                        Chat
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setModal(false);
                                            setNewMessages(0);
                                        }}
                                        className="p-2 hover:bg-slate-800 rounded-lg transition cursor-pointer"
                                    >
                                        <X className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.length !== 0 ? (
                                        messages.map((item, index) => (
                                            <div key={index} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                                                <p className="text-emerald-400 font-semibold text-sm mb-1">
                                                    {item.sender}
                                                </p>
                                                <p className="text-slate-200 text-sm break-words">{item.data}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                            <MessageSquare className="w-12 h-12 mb-2 opacity-50" />
                                            <p>No messages yet</p>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 border-t border-slate-800">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition text-sm"
                                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                        />
                                        <button
                                            onClick={sendMessage}
                                            className="px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer flex items-center justify-center"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Meeting Area */}
                    <div className="relative flex-1 w-full h-[calc(100vh-100px)] flex items-center justify-center p-3 sm:p-6">
                        {videos.length === 0 ? (
                            /* State when User is alone in the room */
                            <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-md bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-3xl shadow-xl">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white">You're the only one here</h3>
                                    <p className="text-sm text-slate-400">Share this meeting link with others to start talking.</p>
                                </div>
                                <button
                                    onClick={copyMeetingLink}
                                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-sm transition flex items-center gap-2 cursor-pointer"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                                    <span>{copied ? "Link Copied!" : "Copy Meeting Link"}</span>
                                </button>
                            </div>
                        ) : (
                            /* Dynamic Adaptive Responsive Grid based on connected users count */
                            <div className={`w-full h-full grid gap-3 sm:gap-4 items-center justify-center mx-auto transition-all duration-300 ${getGridContainerClass(videos.length)}`}>
                                {videos.map((videoItem) => (
                                    <div 
                                        key={videoItem.socketId}
                                        className="relative w-full h-full min-h-[220px] aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center group"
                                    >
                                        <video
                                            data-socket={videoItem.socketId}
                                            ref={ref => {
                                                if (ref && videoItem.stream) {
                                                    ref.srcObject = videoItem.stream;
                                                }
                                            }}
                                            autoPlay
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-3 left-3 px-3 py-1.5 max-w-[80%] rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-center shadow-lg">
                                            <span className="text-xs text-white font-medium truncate block">
                                                {participants[videoItem.socketId] || 'Participant'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Local User Picture-in-Picture (PiP) Window */}
                        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-32 sm:w-48 md:w-56 aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-700/80 shadow-2xl z-20 group">
                            {video ? (
                                <video 
                                    ref={localVideoref} 
                                    autoPlay 
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                                    <VideoOff className="w-6 h-6 mb-1 text-slate-600" />
                                    <span className="text-[10px] text-slate-400">Camera Off</span>
                                </div>
                            )}
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80">
                                <span className="text-[10px] sm:text-xs text-white font-medium">{username || 'You'} (You)</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Controls Bar */}
                    <div className="z-30 flex items-center justify-center pb-4 sm:pb-6 px-4">
                        <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl">
                            <button
                                onClick={handleVideo}
                                className={`p-3 sm:p-3.5 rounded-xl transition cursor-pointer ${
                                    video 
                                        ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-950'
                                }`}
                                title={video ? "Turn Camera Off" : "Turn Camera On"}
                            >
                                {video ? <Video className="w-5 h-5 sm:w-6 sm:h-6" /> : <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" />}
                            </button>

                            <button
                                onClick={handleAudio}
                                className={`p-3 sm:p-3.5 rounded-xl transition cursor-pointer ${
                                    audio 
                                        ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-950'
                                }`}
                                title={audio ? "Mute Microphone" : "Unmute Microphone"}
                            >
                                {audio ? <Mic className="w-5 h-5 sm:w-6 sm:h-6" /> : <MicOff className="w-5 h-5 sm:w-6 sm:h-6" />}
                            </button>

                            <button
                                onClick={handleEndCall}
                                className="p-3 sm:p-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition cursor-pointer shadow-lg shadow-red-950"
                                title="Leave Meeting"
                            >
                                <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            {screenAvailable && (
                                <button
                                    onClick={handleScreen}
                                    className={`p-3 sm:p-3.5 rounded-xl transition cursor-pointer ${
                                        screen 
                                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-950' 
                                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                                    }`}
                                    title={screen ? "Stop Screen Sharing" : "Share Screen"}
                                >
                                    {screen ? <MonitorUp className="w-5 h-5 sm:w-6 sm:h-6" /> : <MonitorX className="w-5 h-5 sm:w-6 sm:h-6" />}
                                </button>
                            )}

                            <button
                                onClick={() => {
                                    setModal(!showModal);
                                    setNewMessages(0);
                                }}
                                className="relative p-3 sm:p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
                                title="Chat Messages"
                            >
                                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                                {newMessages > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                                        {newMessages > 99 ? '99+' : newMessages}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoMeet;
