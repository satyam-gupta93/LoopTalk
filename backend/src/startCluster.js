import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, "app.js");
const lbPath = path.join(__dirname, "loadBalancer.js");

const processes = [];

// Helper to spawn processes with colored prefixes
const startProcess = (name, script, env, colorCode) => {
  const child = spawn("node", [script], {
    env: { ...process.env, ...env },
    stdio: ["inherit", "pipe", "pipe"],
    shell: true
  });

  const prefix = `\x1b[${colorCode}m[${name}]\x1b[0m`;

  child.stdout.on("data", (data) => {
    const lines = data.toString().trim().split("\n");
    lines.forEach((line) => {
      if (line.trim()) console.log(`${prefix} ${line}`);
    });
  });

  child.stderr.on("data", (data) => {
    const lines = data.toString().trim().split("\n");
    lines.forEach((line) => {
      if (line.trim()) console.error(`${prefix} \x1b[31m${line}\x1b[0m`);
    });
  });

  processes.push(child);
  return child;
};

console.log(`\n===============================================================`);
console.log(`🚀 LoopTalk Cluster: Launching 2 Server Instances + Load Balancer`);
console.log(`===============================================================\n`);

// 1. Start Server Instance 1 on Port 8000
startProcess("Server-8000", appPath, { PORT: "8000" }, "36"); // Cyan

// 2. Start Server Instance 2 on Port 8001
startProcess("Server-8001", appPath, { PORT: "8001" }, "35"); // Magenta

// 3. Start Load Balancer on Port 5000
setTimeout(() => {
  startProcess("LoadBalancer-5000", lbPath, { LB_PORT: "5000" }, "32"); // Green
}, 1500);

// Graceful cleanup on Ctrl + C
const cleanExit = () => {
  console.log("\n🛑 Shutting down all instances and load balancer...");
  processes.forEach((proc) => {
    try {
      proc.kill();
    } catch (e) {}
  });
  process.exit(0);
};

process.on("SIGINT", cleanExit);
process.on("SIGTERM", cleanExit);
