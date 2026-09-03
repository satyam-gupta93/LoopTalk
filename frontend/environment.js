const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const server = isLocal ? "http://localhost:8000" : "https://looptalk-1.onrender.com";

export default server;
