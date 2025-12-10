

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
      {/* UI will be added in further steps */}
    </div>
  );
}

export default VideoMeet;
