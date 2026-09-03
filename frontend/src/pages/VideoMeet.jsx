
import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
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

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" },
        { "urls": "stun:stun1.l.google.com:19302" },
        { "urls": "stun:stun2.l.google.com:19302" }
    ],
    // Add these for better performance
    iceCandidatePoolSize: 10
}

const VideoMeet = () => {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);
    let [video, setVideo] = useState([]);
    let [audio, setAudio] = useState();
    let [screen, setScreen] = useState();
    let [showModal, setModal] = useState(false);
    let [screenAvailable, setScreenAvailable] = useState();
    let [messages, setMessages] = useState([])
    let [message, setMessage] = useState("");
    let [newMessages, setNewMessages] = useState(0);
    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");
    let [copied, setCopied] = useState(false);

    const videoRef = useRef([])
    let [videos, setVideos] = useState([])
    
    // NEW: Store participant names mapped to socket IDs
    let [participants, setParticipants] = useState({});

    useEffect(() => {
        console.log("HELLO");
        getPermissions();
    }, []);  

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);
        }
    }, [video, audio])

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                console.log(description)
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }

    let getDislayMediaSuccess = (stream) => {
        console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            getUserMedia()
        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false, transports: ['websocket', 'polling'] })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            const roomCode = window.location.pathname.replace(/^\//, '') || 'default-room';
            // Send clean room code along with join-call
            socketRef.current.emit('join-call', roomCode, username)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on('chat-message', addMessage)

            // NEW: Listen for user-left with name cleanup
            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
                setParticipants((prev) => {
                    const updated = { ...prev };
                    delete updated[id];
                    return updated;
                })
            })

            // NEW: Listen for participant-info to get all participant names
            socketRef.current.on('participant-info', (id, name) => {
                setParticipants((prev) => ({ ...prev, [id]: name }))
            })

            socketRef.current.on('user-joined', (id, clients, allParticipants) => {
                // NEW: Update participants with all current names
                console.log("Received participants:", allParticipants)
                if (allParticipants) {
                    setParticipants((prev) => ({ ...prev, ...allParticipants }))
                }

                clients.forEach((socketListId) => {
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    connections[socketListId].onaddstream = (event) => {
                        console.log("BEFORE:", videoRef.current);
                        console.log("FINDING ID: ", socketListId);

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            console.log("FOUND EXISTING");

                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            console.log("CREATING NEW");
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };

                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }
    
    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    let handleVideo = () => {
        setVideo(!video);
    }
    
    let handleAudio = () => {
        setAudio(!audio)
    }

    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen])
    
    let handleScreen = () => {
        setScreen(!screen);
    }

    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        } catch (e) { }
        window.location.href = "/home"
    }

    let openChat = () => {
        setModal(true);
        setNewMessages(0);
    }
    
    let closeChat = () => {
        setModal(false);
    }
    
    let handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };

    let sendMessage = () => {
        console.log(socketRef.current);
        socketRef.current.emit('chat-message', message, username)
        setMessage("");
    }

let connect = () => {
    setAskForUsername(false);
    getMedia();
}

    const copyMeetingLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
                            <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold text-white">Loop Talk</h2>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
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
                                    className="w-full px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition flex items-center justify-center gap-2"
                                >
                                    <Video className="w-5 h-5" />
                                    Connect
                                </button>
                            </div>

                            <div className="relative rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                                <video 
                                    ref={localVideoref} 
                                    autoPlay 
                                    muted
                                    className="w-full h-48 object-cover"
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
                <div className="relative min-h-screen">
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md h-[600px] flex flex-col">
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
                                        className="p-2 hover:bg-slate-800 rounded-lg transition"
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
                                                <p className="text-slate-200 text-sm">{item.data}</p>
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
                                            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                        />
                                        <button
                                            onClick={sendMessage}
                                            className="px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="relative h-screen flex flex-col">
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
                                    {videos.map((video) => (
                                        <div 
                                            key={video.socketId}
                                            className="relative w-full h-full min-h-[220px] aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center group"
                                        >
                                            <video
                                                data-socket={video.socketId}
                                                ref={ref => {
                                                    if (ref && video.stream) {
                                                        ref.srcObject = video.stream;
                                                    }
                                                }}
                                                autoPlay
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-3 left-3 px-3 py-1.5 max-w-[80%] rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-center shadow-lg">
                                                <span className="text-xs text-white font-medium truncate block">
                                                    {participants[video.socketId] || 'Unknown'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Local User Picture-in-Picture (PiP) Window */}
                            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-32 sm:w-48 md:w-56 aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-700/80 shadow-2xl z-20 group">
                                <video 
                                    ref={localVideoref} 
                                    autoPlay 
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80">
                                    <span className="text-[10px] sm:text-xs text-white font-medium">{username || 'You'} (You)</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                            <div className="flex items-center gap-3 px-6 py-3 bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl">
                                <button
                                    onClick={handleVideo}
                                    className={`p-4 rounded-xl transition ${
                                        video 
                                            ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                                            : 'bg-red-600 hover:bg-red-700 text-white'
                                    }`}
                                >
                                    {video ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                                </button>

                                <button
                                    onClick={handleAudio}
                                    className={`p-4 rounded-xl transition ${
                                        audio 
                                            ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                                            : 'bg-red-600 hover:bg-red-700 text-white'
                                    }`}
                                >
                                    {audio ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                                </button>

                                <button
                                    onClick={handleEndCall}
                                    className="p-4 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
                                >
                                    <PhoneOff className="w-6 h-6" />
                                </button>

                                {screenAvailable && (
                                    <button
                                        onClick={handleScreen}
                                        className={`p-4 rounded-xl transition ${
                                            screen 
                                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                                : 'bg-slate-800 hover:bg-slate-700 text-white'
                                        }`}
                                    >
                                        {screen ? <MonitorUp className="w-6 h-6" /> : <MonitorX className="w-6 h-6" />}
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        setModal(!showModal);
                                        setNewMessages(0);
                                    }}
                                    className="relative p-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
                                >
                                    <MessageSquare className="w-6 h-6" />
                                    {newMessages > 0 && (
                                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">
                                            {newMessages > 99 ? '99+' : newMessages}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
  )
}

export default VideoMeet
