
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
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}
function VideoMeet() {

  const [askForUsername, setAskForUsername] = useState(true);
  const [username, setUsername] = useState("");
  const [showModal, setModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  

  const connect = () => setAskForUsername(false);
  const sendMessage = () => console.log("send message");
  const handleVideo = () => console.log("toggle video");
  const handleAudio = () => console.log("toggle audio");
  const handleEndCall = () => console.log("end call");
  const handleScreen = () => console.log("screen share");

    useEffect(() => {
    setVideos([
      { socketId: "1", stream: null },
      { socketId: "2", stream: null },
      { socketId: "3", stream: null },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
          {askForUsername ? (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md space-y-6 bg-slate-900 p-8 rounded-xl">
          <h2 className="text-white text-2xl font-bold text-center">Enter Lobby</h2>

          <input 
            type="text"
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />

          <button 
            className="w-full p-3 bg-emerald-600 text-white rounded-lg"
            onClick={connect}
          >
            Connect
          </button>
        </div>
      </div>
    ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map(v => (
        <div key={v.socketId} className="bg-slate-800 h-96 rounded-xl" />
      ))}
    </div>
    )}
      <div className="flex justify-center gap-3 p-4">
    <button onClick={handleVideo} className="p-4 bg-slate-800 text-white rounded-xl">Video</button>
    <button onClick={handleAudio} className="p-4 bg-slate-800 text-white rounded-xl">Mic</button>
    <button onClick={handleEndCall} className="p-4 bg-red-600 text-white rounded-xl">End</button>
    <button onClick={() => setModal(true)} className="p-4 bg-slate-800 text-white rounded-xl">Chat</button>
  </div>


    </div>
  );
}

export default VideoMeet;
