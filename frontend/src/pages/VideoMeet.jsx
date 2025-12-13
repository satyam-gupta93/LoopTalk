// import React, { useEffect, useRef, useState } from 'react'
// import io from "socket.io-client";
// import { 
//   Video,
//   VideoOff,
//   Mic,
//   MicOff,
//   PhoneOff,
//   MonitorUp,
//   MonitorX,
//   MessageSquare,
//   Send,
//   X
// } from 'lucide-react';

// const server_url = "http://localhost:8000";


// var connections = {};

// const peerConfigConnections = {
//     "iceServers": [
//         { "urls": "stun:stun.l.google.com:19302" }
//     ]
// }

// const VideoMeet = () => {

//     var socketRef = useRef();
//     let socketIdRef = useRef();

//     let localVideoref = useRef();

//     let [videoAvailable, setVideoAvailable] = useState(true);

//     let [audioAvailable, setAudioAvailable] = useState(true);

//     let [video, setVideo] = useState([]);

//     let [audio, setAudio] = useState();

//     let [screen, setScreen] = useState();

//     let [showModal, setModal] = useState(true);

//     let [screenAvailable, setScreenAvailable] = useState();

//     let [messages, setMessages] = useState([])

//     let [message, setMessage] = useState("");

//     let [newMessages, setNewMessages] = useState(3);

//     let [askForUsername, setAskForUsername] = useState(true);

//     let [username, setUsername] = useState("");

//     const videoRef = useRef([])

//     let [videos, setVideos] = useState([])

  

//     useEffect(() => {
//         console.log("HELLO");
//         getPermissions();
//     }, []);  

//     let getDislayMedia = () => {
//         if (screen) {
//             if (navigator.mediaDevices.getDisplayMedia) {
//                 navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
//                     .then(getDislayMediaSuccess)
//                     .then((stream) => { })
//                     .catch((e) => console.log(e))
//             }
//         }
//     }

//     const getPermissions = async () => {
//         try {
//             const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoPermission) {
//                 setVideoAvailable(true);
//                 console.log('Video permission granted');
//             } else {
//                 setVideoAvailable(false);
//                 console.log('Video permission denied');
//             }

//             const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
//             if (audioPermission) {
//                 setAudioAvailable(true);
//                 console.log('Audio permission granted');
//             } else {
//                 setAudioAvailable(false);
//                 console.log('Audio permission denied');
//             }

//             if (navigator.mediaDevices.getDisplayMedia) {
//                 setScreenAvailable(true);
//             } else {
//                 setScreenAvailable(false);
//             }

//             if (videoAvailable || audioAvailable) {
//                 const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
//                 if (userMediaStream) {
//                     window.localStream = userMediaStream;
//                     if (localVideoref.current) {
//                         localVideoref.current.srcObject = userMediaStream;
//                     }
//                 }
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (video !== undefined && audio !== undefined) {
//             getUserMedia();
//             console.log("SET STATE HAS ", video, audio);

//         }


//     }, [video, audio])
//     let getMedia = () => {
//         setVideo(videoAvailable);
//         setAudio(audioAvailable);
//         connectToSocketServer();

//     }




//     let getUserMediaSuccess = (stream) => {
//         try {
//             window.localStream.getTracks().forEach(track => track.stop())
//         } catch (e) { console.log(e) }

//         window.localStream = stream
//         localVideoref.current.srcObject = stream

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue

//             connections[id].addStream(window.localStream)

//             connections[id].createOffer().then((description) => {
//                 console.log(description)
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                     })
//                     .catch(e => console.log(e))
//             })
//         }

//         stream.getTracks().forEach(track => track.onended = () => {
//             setVideo(false);
//             setAudio(false);

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { console.log(e) }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//             window.localStream = blackSilence()
//             localVideoref.current.srcObject = window.localStream

//             for (let id in connections) {
//                 connections[id].addStream(window.localStream)

//                 connections[id].createOffer().then((description) => {
//                     connections[id].setLocalDescription(description)
//                         .then(() => {
//                             socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                         })
//                         .catch(e => console.log(e))
//                 })
//             }
//         })
//     }

//     let getUserMedia = () => {
//         if ((video && videoAvailable) || (audio && audioAvailable)) {
//             navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
//                 .then(getUserMediaSuccess)
//                 .then((stream) => { })
//                 .catch((e) => console.log(e))
//         } else {
//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { }
//         }
//     }





//     let getDislayMediaSuccess = (stream) => {
//         console.log("HERE")
//         try {
//             window.localStream.getTracks().forEach(track => track.stop())
//         } catch (e) { console.log(e) }

//         window.localStream = stream
//         localVideoref.current.srcObject = stream

//         for (let id in connections) {
//             if (id === socketIdRef.current) continue

//             connections[id].addStream(window.localStream)

//             connections[id].createOffer().then((description) => {
//                 connections[id].setLocalDescription(description)
//                     .then(() => {
//                         socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
//                     })
//                     .catch(e => console.log(e))
//             })
//         }

//         stream.getTracks().forEach(track => track.onended = () => {
//             setScreen(false)

//             try {
//                 let tracks = localVideoref.current.srcObject.getTracks()
//                 tracks.forEach(track => track.stop())
//             } catch (e) { console.log(e) }

//             let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//             window.localStream = blackSilence()
//             localVideoref.current.srcObject = window.localStream

//             getUserMedia()

//         })
//     }

//     let gotMessageFromServer = (fromId, message) => {
//         var signal = JSON.parse(message)

//         if (fromId !== socketIdRef.current) {
//             if (signal.sdp) {
//                 connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//                     if (signal.sdp.type === 'offer') {
//                         connections[fromId].createAnswer().then((description) => {
//                             connections[fromId].setLocalDescription(description).then(() => {
//                                 socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
//                             }).catch(e => console.log(e))
//                         }).catch(e => console.log(e))
//                     }
//                 }).catch(e => console.log(e))
//             }

//             if (signal.ice) {
//                 connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
//             }
//         }
//     }




//     let connectToSocketServer = () => {
//         socketRef.current = io.connect(server_url, { secure: false })

//         socketRef.current.on('signal', gotMessageFromServer)

//         socketRef.current.on('connect', () => {
//             socketRef.current.emit('join-call', window.location.href)
//             socketIdRef.current = socketRef.current.id

//             socketRef.current.on('chat-message', addMessage)

//             socketRef.current.on('user-left', (id) => {
//                 setVideos((videos) => videos.filter((video) => video.socketId !== id))
//             })

//             socketRef.current.on('user-joined', (id, clients) => {
//                 clients.forEach((socketListId) => {

//                     connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
//                     // Wait for their ice candidate       
//                     connections[socketListId].onicecandidate = function (event) {
//                         if (event.candidate != null) {
//                             socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
//                         }
//                     }

//                     // Wait for their video stream
//                     connections[socketListId].onaddstream = (event) => {
//                         console.log("BEFORE:", videoRef.current);
//                         console.log("FINDING ID: ", socketListId);

//                         let videoExists = videoRef.current.find(video => video.socketId === socketListId);

//                         if (videoExists) {
//                             console.log("FOUND EXISTING");

//                             // Update the stream of the existing video
//                             setVideos(videos => {
//                                 const updatedVideos = videos.map(video =>
//                                     video.socketId === socketListId ? { ...video, stream: event.stream } : video
//                                 );
//                                 videoRef.current = updatedVideos;
//                                 return updatedVideos;
//                             });
//                         } else {
//                             // Create a new video
//                             console.log("CREATING NEW");
//                             let newVideo = {
//                                 socketId: socketListId,
//                                 stream: event.stream,
//                                 autoplay: true,
//                                 playsinline: true
//                             };

//                             setVideos(videos => {
//                                 const updatedVideos = [...videos, newVideo];
//                                 videoRef.current = updatedVideos;
//                                 return updatedVideos;
//                             });
//                         }
//                     };


//                     // Add the local video stream
//                     if (window.localStream !== undefined && window.localStream !== null) {
//                         connections[socketListId].addStream(window.localStream)
//                     } else {
//                         let blackSilence = (...args) => new MediaStream([black(...args), silence()])
//                         window.localStream = blackSilence()
//                         connections[socketListId].addStream(window.localStream)
//                     }
//                 })

//                 if (id === socketIdRef.current) {
//                     for (let id2 in connections) {
//                         if (id2 === socketIdRef.current) continue

//                         try {
//                             connections[id2].addStream(window.localStream)
//                         } catch (e) { }

//                         connections[id2].createOffer().then((description) => {
//                             connections[id2].setLocalDescription(description)
//                                 .then(() => {
//                                     socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
//                                 })
//                                 .catch(e => console.log(e))
//                         })
//                     }
//                 }
//             })
//         })
//     }

//     let silence = () => {
//         let ctx = new AudioContext()
//         let oscillator = ctx.createOscillator()
//         let dst = oscillator.connect(ctx.createMediaStreamDestination())
//         oscillator.start()
//         ctx.resume()
//         return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
//     }
//     let black = ({ width = 640, height = 480 } = {}) => {
//         let canvas = Object.assign(document.createElement("canvas"), { width, height })
//         canvas.getContext('2d').fillRect(0, 0, width, height)
//         let stream = canvas.captureStream()
//         return Object.assign(stream.getVideoTracks()[0], { enabled: false })
//     }

//     let handleVideo = () => {
//         setVideo(!video);
//         // getUserMedia();
//     }
//     let handleAudio = () => {
//         setAudio(!audio)
//         // getUserMedia();
//     }

//     useEffect(() => {
//         if (screen !== undefined) {
//             getDislayMedia();
//         }
//     }, [screen])
//     let handleScreen = () => {
//         setScreen(!screen);
//     }

//     let handleEndCall = () => {
//         try {
//             let tracks = localVideoref.current.srcObject.getTracks()
//             tracks.forEach(track => track.stop())
//         } catch (e) { }
//         window.location.href = "/"
//     }

//     let openChat = () => {
//         setModal(true);
//         setNewMessages(0);
//     }
//     let closeChat = () => {
//         setModal(false);
//     }
//     let handleMessage = (e) => {
//         setMessage(e.target.value);
//     }

//     const addMessage = (data, sender, socketIdSender) => {
//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: sender, data: data }
//         ]);
//         if (socketIdSender !== socketIdRef.current) {
//             setNewMessages((prevNewMessages) => prevNewMessages + 1);
//         }
//     };



//     let sendMessage = () => {
//         console.log(socketRef.current);
//         socketRef.current.emit('chat-message', message, username)
//         setMessage("");

//         // this.setState({ message: "", sender: username })
//     }

    
//     let connect = () => {
//         setAskForUsername(false);

//           socketRef.current = io.connect(server_url, { secure: false });
        
//         getMedia();
//     }
//     // Rest of your states...

//     //   useEffect(() => {
//     //   // Add dummy participant videos for UI preview
//     // //   getPermissions();
//     //   setVideos([
//     //     { socketId: "1", stream: null },
//     //     { socketId: "2", stream: null },
//     //     { socketId: "3", stream: null },
//     //     { socketId: "4", stream: null },
//     //     { socketId: "5", stream: null },
//     //     { socketId: "6", stream: null }
//     //   ]);
//     // }, []);   // <-- FIXED

//   return (
//      <div className="min-h-screen bg-slate-950">
//             {askForUsername === true ? (
//                 <div className="flex flex-col items-center justify-center min-h-screen px-4">
//                     <div className="w-full max-w-md space-y-6">
//                         {/* Logo */}
//                         <div className="flex items-center justify-center gap-3 mb-8">
//                             <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center">
//                                 <Video className="w-6 h-6 text-white" />
//                             </div>
//                             <h2 className="text-2xl font-semibold text-white">Loop Talk</h2>
//                         </div>

//                         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
//                             <h2 className="text-2xl font-bold text-white text-center">Enter Lobby</h2>
                            
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-300 mb-2">
//                                         Username
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={username}
//                                         onChange={(e) => setUsername(e.target.value)}
//                                         placeholder="Enter your username"
//                                         className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
//                                         onKeyPress={(e) => e.key === 'Enter' && connect()}
//                                     />
//                                 </div>

//                                 <button
//                                     onClick={connect}
//                                     className="w-full px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition flex items-center justify-center gap-2"
//                                 >
//                                     <Video className="w-5 h-5" />
//                                     Connect
//                                 </button>
//                             </div>

//                             {/* Local Video Preview */}
//                             <div className="relative rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
//                                 <video 
//                                     ref={localVideoref} 
//                                     autoPlay 
//                                     muted
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700">
//                                     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
//                                     <span className="text-xs text-white font-medium">Preview</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="relative min-h-screen">
//                     {/* Chat Modal */}
//                     {showModal && (
//                         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//                             <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md h-[600px] flex flex-col">
//                                 {/* Chat Header */}
//                                 <div className="flex items-center justify-between p-4 border-b border-slate-800">
//                                     <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                                         <MessageSquare className="w-5 h-5 text-emerald-500" />
//                                         Chat
//                                     </h2>
//                                     <button
//                                         onClick={() => {
//                                             setModal(false);
//                                             setNewMessages(0);
//                                         }}
//                                         className="p-2 hover:bg-slate-800 rounded-lg transition"
//                                     >
//                                         <X className="w-5 h-5 text-slate-400" />
//                                     </button>
//                                 </div>

//                                 {/* Messages Display */}
//                                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                                     {messages.length !== 0 ? (
//                                         messages.map((item, index) => (
//                                             <div key={index} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
//                                                 <p className="text-emerald-400 font-semibold text-sm mb-1">
//                                                     {item.sender}
//                                                 </p>
//                                                 <p className="text-slate-200 text-sm">{item.data}</p>
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <div className="flex flex-col items-center justify-center h-full text-slate-500">
//                                             <MessageSquare className="w-12 h-12 mb-2 opacity-50" />
//                                             <p>No messages yet</p>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Message Input */}
//                                 <div className="p-4 border-t border-slate-800">
//                                     <div className="flex gap-2">
//                                         <input
//                                             type="text"
//                                             value={message}
//                                             onChange={(e) => setMessage(e.target.value)}
//                                             placeholder="Type your message..."
//                                             className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
//                                             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                                         />
//                                         <button
//                                             onClick={sendMessage}
//                                             className="px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
//                                         >
//                                             <Send className="w-5 h-5" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Main Video Container */}
//                     <div className="relative h-screen flex flex-col">
//                         {/* Conference View - Remote Videos */}
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-slate-950">
//                             {videos.map((video) => (
//                                 <div 
//                                     key={video.socketId}
//                                     className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl"
//                                 >
//                                     {/* //<h2 className="text-xs text-white font-medium">{video.socketId}</h2> */}
//                                     <video
//                                         data-socket={video.socketId}
//                                         ref={ref => {
//                                             if (ref && video.stream) {
//                                                 ref.srcObject = video.stream;
//                                             }
//                                         }}
//                                         autoPlay
//                                         className="w-full h-full object-cover"
//                                     />
//                                     <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700">
//                                         <span className="text-xs text-white font-medium">Participant</span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Local Video - Picture in Picture */}
//                         <div className="absolute bottom-24 right-4 w-64 rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-800 shadow-2xl">
//                             <video 
//                                 ref={localVideoref} 
//                                 autoPlay 
//                                 muted
//                                 className="w-full h-full object-cover"
//                             />
//                             <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-700">
//                                 <span className="text-xs text-white font-medium">You</span>
//                             </div>
//                         </div>

//                         {/* Control Buttons */}
//                         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
//                             <div className="flex items-center gap-3 px-6 py-3 bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl">
//                                 <button
//                                     onClick={handleVideo}
//                                     className={`p-4 rounded-xl transition ${
//                                         video 
//                                             ? 'bg-slate-800 hover:bg-slate-700 text-white' 
//                                             : 'bg-red-600 hover:bg-red-700 text-white'
//                                     }`}
//                                 >
//                                     {video ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
//                                 </button>

//                                 <button
//                                     onClick={handleAudio}
//                                     className={`p-4 rounded-xl transition ${
//                                         audio 
//                                             ? 'bg-slate-800 hover:bg-slate-700 text-white' 
//                                             : 'bg-red-600 hover:bg-red-700 text-white'
//                                     }`}
//                                 >
//                                     {audio ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
//                                 </button>

//                                 <button
//                                     onClick={handleEndCall}
//                                     className="p-4 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
//                                 >
//                                     <PhoneOff className="w-6 h-6" />
//                                 </button>

//                                 {screenAvailable && (
//                                     <button
//                                         onClick={handleScreen}
//                                         className={`p-4 rounded-xl transition ${
//                                             screen 
//                                                 ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
//                                                 : 'bg-slate-800 hover:bg-slate-700 text-white'
//                                         }`}
//                                     >
//                                         {screen ? <MonitorUp className="w-6 h-6" /> : <MonitorX className="w-6 h-6" />}
//                                     </button>
//                                 )}

//                                 <button
//                                     onClick={() => {
//                                         setModal(!showModal);
//                                         setNewMessages(0);
//                                     }}
//                                     className="relative p-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
//                                 >
//                                     <MessageSquare className="w-6 h-6" />
//                                     {newMessages > 0 && (
//                                         <span className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">
//                                             {newMessages > 99 ? '99+' : newMessages}
//                                         </span>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//   )
// }

// export default VideoMeet




import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
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
  X
} from 'lucide-react';

const server_url = "http://localhost:8000";

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
    let [showModal, setModal] = useState(true);
    let [screenAvailable, setScreenAvailable] = useState();
    let [messages, setMessages] = useState([])
    let [message, setMessage] = useState("");
    let [newMessages, setNewMessages] = useState(3);
    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");

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
        socketRef.current = io.connect(server_url, { secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            // NEW: Send username along with join-call
            socketRef.current.emit('join-call', window.location.href, username)
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

    // 1️⃣ Create socket connection FIRST
    socketRef.current = io.connect(server_url, { secure: false });

    // 2️⃣ Now send username
    socketRef.current.emit("set-username", username);

    // 3️⃣ Now start webcam + WebRTC
    getMedia();
}

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
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-slate-950">
                            {videos.map((video) => (
                                <div 
                                    key={video.socketId}
                                    className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl"
                                >
                                    <video
                                        data-socket={video.socketId}
                                        ref={ref => {
                                            if (ref && video.stream) {
                                                ref.srcObject = video.stream;
                                            }
                                        }}
                                        autoPlay
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-3 left-3 px-3 py-1.5 w-28 rounded-full bg-slate-900/90 border border-slate-700 text-center">
                                        <span className="text-xs text-white font-medium truncate block">
                                            {participants[video.socketId] || 'Unknown'}
                                        </span>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className="absolute bottom-24 right-4 w-64 rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-800 shadow-2xl">
                            <video 
                                ref={localVideoref} 
                                autoPlay 
                                muted
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-slate-900/90 border border-slate-700">
                                <span className="text-xs text-white font-medium">{username} (You)</span>
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
