import http from "http";
import httpProxy from "http-proxy";

// The two backend server instances
const servers = [
  { target: "http://localhost:8000", name: "Instance-1 (Port 8000)" },
  { target: "http://localhost:8001", name: "Instance-2 (Port 8001)" }
];

let httpCounter = 0;
let wsCounter = 0;

// Create HTTP and WebSocket proxy
const proxy = httpProxy.createProxyServer({
  ws: true,
  changeOrigin: true,
  xfwd: true
});

proxy.on("error", (err, req, res) => {
  if (err.code !== "ECONNRESET") {
    console.warn(`[LoadBalancer Proxy Warn] ${err.message}`);
  }
  if (res && res.writeHead && !res.headersSent) {
    try {
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Bad Gateway: Backend instance unavailable" }));
    } catch (e) {}
  }
});

// HTTP Request Balancing (Round-Robin)
const server = http.createServer((req, res) => {
  const targetServer = servers[httpCounter % servers.length];
  httpCounter++;

  const endpoint = req.url.split("?")[0];
  console.log(`[LoadBalancer] HTTP ${req.method} ${endpoint} -> ${targetServer.name}`);
  proxy.web(req, res, { target: targetServer.target });
});

// WebSocket Connection Balancing (Strict Alternation between Users)
server.on("upgrade", (req, socket, head) => {
  socket.on("error", (err) => {
    if (err.code !== "ECONNRESET") {
      console.warn(`[LoadBalancer WebSocket Warn] ${err.message}`);
    }
  });

  // User 1 -> Server 8000, User 2 -> Server 8001, User 3 -> Server 8000, etc.
  const targetServer = servers[wsCounter % servers.length];
  const userNumber = wsCounter + 1;
  wsCounter++;

  console.log(`\n========================================================`);
  console.log(`[LoadBalancer] ⚡ WebSocket Connection #${userNumber} -> Routed to: ${targetServer.name}`);
  console.log(`========================================================\n`);

  proxy.ws(req, socket, head, { target: targetServer.target });
});

const LB_PORT = process.env.LB_PORT || 5000;
server.listen(LB_PORT, () => {
  console.log(`================================================================`);
  console.log(`🚀 LoopTalk Load Balancer is ACTIVE on http://localhost:${LB_PORT}`);
  console.log(`🔄 Strict WebSocket Alternator:`);
  console.log(`   👤 User 1 -> Instance-1 (Port 8000)`);
  console.log(`   👤 User 2 -> Instance-2 (Port 8001)`);
  console.log(`================================================================`);
});
