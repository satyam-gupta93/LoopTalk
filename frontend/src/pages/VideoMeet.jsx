

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
      <></>
    )}

    </div>
  );
}

export default VideoMeet;
