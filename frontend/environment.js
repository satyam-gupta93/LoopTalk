const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Routes all local traffic through the Load Balancer (Port 5000)
const server = isLocal ? "http://localhost:5000" : "https://looptalk-1.onrender.com";

export default server;


