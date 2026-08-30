import mediasoup from "mediasoup";
import { Server } from "socket.io";
import { mediasoupConfig } from "../config/mediasoupConfig.js";

// Global Workers Pool
let workers = [];
let nextWorkerIndex = 0;

// Rooms Map: roomPath -> { router, peers: Map<socketId, Peer>, messages: [] }
const rooms = new Map();

/**
 * Initialize Mediasoup Workers
 */
export const initMediasoupWorkers = async () => {
  const { numWorkers } = mediasoupConfig;
  console.log(`[Mediasoup] Initializing ${numWorkers} worker(s)...`);

  for (let i = 0; i < numWorkers; i++) {
    const worker = await mediasoup.createWorker({
      logLevel: mediasoupConfig.worker.logLevel,
      logTags: mediasoupConfig.worker.logTags,
      rtcMinPort: mediasoupConfig.worker.rtcMinPort,
      rtcMaxPort: mediasoupConfig.worker.rtcMaxPort
    });

    worker.on("died", (error) => {
      console.error(`[Mediasoup] Worker ${worker.pid} died:`, error);
      setTimeout(() => process.exit(1), 2000);
    });

    workers.push(worker);
    console.log(`[Mediasoup] Worker ${i + 1}/${numWorkers} started (PID: ${worker.pid})`);
  }
};

/**
 * Get next worker from pool using round-robin
 */
const getWorker = () => {
  const worker = workers[nextWorkerIndex];
  nextWorkerIndex = (nextWorkerIndex + 1) % workers.length;
  return worker;
};

/**
 * Get or create a Room and Router for a meeting code
 */
const getOrCreateRoom = async (roomPath) => {
  let room = rooms.get(roomPath);
  if (!room) {
    const worker = getWorker();
    const router = await worker.createRouter({
      mediaCodecs: mediasoupConfig.router.mediaCodecs
    });

    room = {
      router,
      peers: new Map(), // socketId -> Peer
      messages: []
    };
    rooms.set(roomPath, room);
    console.log(`[Mediasoup] Created new Router for room: ${roomPath}`);
  }
  return room;
};

/**
 * Setup Socket.IO with Mediasoup SFU Signaling
 */
export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    let currentRoomPath = null;

    console.log(`[Socket] Client connected: ${socket.id}`);

    /**
     * 1. JOIN ROOM
     */
    socket.on("join-room", async ({ roomPath, username }, callback) => {
      try {
        currentRoomPath = roomPath;
        const room = await getOrCreateRoom(roomPath);

        // Register peer
        const peer = {
          id: socket.id,
          username: username || "Anonymous",
          transports: new Map(), // transportId -> transport
          producers: new Map(),  // producerId -> producer
          consumers: new Map()   // consumerId -> consumer
        };
        room.peers.set(socket.id, peer);
        socket.join(roomPath);

        console.log(`[Mediasoup] User "${peer.username}" (${socket.id}) joined room "${roomPath}"`);

        // Collect existing producers in room for the newcomer to consume
        const existingProducers = [];
        for (const [peerId, otherPeer] of room.peers.entries()) {
          if (peerId !== socket.id) {
            for (const [prodId, producer] of otherPeer.producers.entries()) {
              existingProducers.push({
                producerId: prodId,
                producerSocketId: peerId,
                producerUsername: otherPeer.username,
                kind: producer.kind,
                appData: producer.appData
              });
            }
          }
        }

        // Notify other peers in room about new peer
        socket.to(roomPath).emit("peer-joined", {
          socketId: socket.id,
          username: peer.username
        });

        // Callback with router RTP capabilities, existing producers, and messages
        callback({
          rtpCapabilities: room.router.rtpCapabilities,
          existingProducers,
          existingMessages: room.messages
        });
      } catch (error) {
        console.error("[Mediasoup] Error joining room:", error);
        callback({ error: error.message });
      }
    });

    /**
     * 2. CREATE WEBRTC TRANSPORT (Send or Recv)
     */
    socket.on("create-webrtc-transport", async ({ direction }, callback) => {
      try {
        const room = rooms.get(currentRoomPath);
        if (!room) return callback({ error: "Room not found" });

        const peer = room.peers.get(socket.id);
        if (!peer) return callback({ error: "Peer not found" });

        const transport = await room.router.createWebRtcTransport({
          listenIps: mediasoupConfig.webRtcTransport.listenIps,
          enableUdp: mediasoupConfig.webRtcTransport.enableUdp,
          enableTcp: mediasoupConfig.webRtcTransport.enableTcp,
          preferUdp: mediasoupConfig.webRtcTransport.preferUdp,
          initialAvailableOutgoingBitrate: mediasoupConfig.webRtcTransport.initialAvailableOutgoingBitrate,
          appData: { direction }
        });

        peer.transports.set(transport.id, transport);

        transport.on("dtlsstatechange", (dtlsState) => {
          if (dtlsState === "closed") {
            transport.close();
          }
        });

        transport.on("close", () => {
          console.log(`[Mediasoup] Transport ${transport.id} closed for peer ${socket.id}`);
        });

        callback({
          params: {
            id: transport.id,
            iceParameters: transport.iceParameters,
            iceCandidates: transport.iceCandidates,
            dtlsParameters: transport.dtlsParameters
          }
        });
      } catch (error) {
        console.error("[Mediasoup] Error creating WebRtcTransport:", error);
        callback({ error: error.message });
      }
    });

    /**
     * 3. CONNECT TRANSPORT
     */
    socket.on("connect-transport", async ({ transportId, dtlsParameters }, callback) => {
      try {
        const room = rooms.get(currentRoomPath);
        if (!room) return callback({ error: "Room not found" });

        const peer = room.peers.get(socket.id);
        if (!peer) return callback({ error: "Peer not found" });

        const transport = peer.transports.get(transportId);
        if (!transport) return callback({ error: "Transport not found" });

        await transport.connect({ dtlsParameters });
        callback({ connected: true });
      } catch (error) {
        console.error("[Mediasoup] Error connecting transport:", error);
        callback({ error: error.message });
      }
    });

    /**
     * 4. PRODUCE (Publish audio/video/screen track)
     */
    socket.on("produce", async ({ transportId, kind, rtpParameters, appData }, callback) => {
      try {
        const room = rooms.get(currentRoomPath);
        if (!room) return callback({ error: "Room not found" });

        const peer = room.peers.get(socket.id);
        if (!peer) return callback({ error: "Peer not found" });

        const transport = peer.transports.get(transportId);
        if (!transport) return callback({ error: "Transport not found" });

        const producer = await transport.produce({
          kind,
          rtpParameters,
          appData: appData || {}
        });

        peer.producers.set(producer.id, producer);

        producer.on("transportclose", () => {
          producer.close();
        });

        console.log(`[Mediasoup] Peer "${peer.username}" created ${kind} producer ${producer.id} (${appData?.mediaType || "media"})`);

        // Broadcast to all other peers in the room that a new producer is available
        socket.to(currentRoomPath).emit("new-producer", {
          producerId: producer.id,
          producerSocketId: socket.id,
          producerUsername: peer.username,
          kind: producer.kind,
          appData: producer.appData
        });

        callback({ id: producer.id });
      } catch (error) {
        console.error("[Mediasoup] Error producing:", error);
        callback({ error: error.message });
      }
    });

    /**
     * 5. CONSUME (Subscribe to a remote peer's producer)
     */
    socket.on("consume", async ({ transportId, producerId, rtpCapabilities }, callback) => {
      try {
        const room = rooms.get(currentRoomPath);
        if (!room) return callback({ error: "Room not found" });

        const peer = room.peers.get(socket.id);
        if (!peer) return callback({ error: "Peer not found" });

        const transport = peer.transports.get(transportId);
        if (!transport) return callback({ error: "Transport not found" });

        if (!room.router.canConsume({ producerId, rtpCapabilities })) {
          return callback({ error: "Cannot consume producer with provided capabilities" });
        }

        // Find the producer and its owning peer info
        let targetProducer = null;
        let targetPeer = null;
        for (const [peerId, p] of room.peers.entries()) {
          if (p.producers.has(producerId)) {
            targetProducer = p.producers.get(producerId);
            targetPeer = p;
            break;
          }
        }

        if (!targetProducer) return callback({ error: "Target producer not found" });

        const consumer = await transport.consume({
          producerId,
          rtpCapabilities,
          paused: true, // Recommended: start paused until client confirms ready
          appData: targetProducer.appData
        });

        peer.consumers.set(consumer.id, consumer);

        consumer.on("transportclose", () => {
          consumer.close();
        });

        consumer.on("producerclose", () => {
          consumer.close();
          peer.consumers.delete(consumer.id);
          socket.emit("producer-closed", {
            producerId,
            producerSocketId: targetPeer?.id
          });
        });

        callback({
          params: {
            id: consumer.id,
            producerId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
            appData: consumer.appData,
            producerSocketId: targetPeer.id,
            producerUsername: targetPeer.username
          }
        });
      } catch (error) {
        console.error("[Mediasoup] Error consuming:", error);
        callback({ error: error.message });
      }
    });

    /**
     * 6. RESUME CONSUMER
     */
    socket.on("resume-consumer", async ({ consumerId }, callback) => {
      try {
        const room = rooms.get(currentRoomPath);
        if (!room) return callback?.({ error: "Room not found" });

        const peer = room.peers.get(socket.id);
        if (!peer) return callback?.({ error: "Peer not found" });

        const consumer = peer.consumers.get(consumerId);
        if (!consumer) return callback?.({ error: "Consumer not found" });

        await consumer.resume();
        callback?.({ resumed: true });
      } catch (error) {
        console.error("[Mediasoup] Error resuming consumer:", error);
        callback?.({ error: error.message });
      }
    });

    /**
     * 7. CLOSE PRODUCER (e.g., stop screen share or camera track)
     */
    socket.on("close-producer", async ({ producerId }, callback) => {
      try {
        const room = rooms.get(currentRoomPath);
        if (!room) return callback?.({ error: "Room not found" });

        const peer = room.peers.get(socket.id);
        if (!peer) return callback?.({ error: "Peer not found" });

        const producer = peer.producers.get(producerId);
        if (producer) {
          producer.close();
          peer.producers.delete(producerId);

          socket.to(currentRoomPath).emit("producer-closed", {
            producerId,
            producerSocketId: socket.id
          });
        }
        callback?.({ closed: true });
      } catch (error) {
        console.error("[Mediasoup] Error closing producer:", error);
        callback?.({ error: error.message });
      }
    });

    /**
     * 8. CHAT MESSAGE
     */
    socket.on("chat-message", ({ text, sender }) => {
      if (!currentRoomPath) return;

      const room = rooms.get(currentRoomPath);
      if (!room) return;

      const msgObj = {
        sender: sender || "Anonymous",
        data: text,
        "socket-id-sender": socket.id,
        timestamp: new Date().toISOString()
      };

      room.messages.push(msgObj);

      io.to(currentRoomPath).emit("chat-message", msgObj.data, msgObj.sender, msgObj["socket-id-sender"]);
    });

    /**
     * 9. DISCONNECT & CLEANUP
     */
    socket.on("disconnect", () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`);

      if (!currentRoomPath) return;
      const room = rooms.get(currentRoomPath);
      if (!room) return;

      const peer = room.peers.get(socket.id);
      if (peer) {
        // Close all producers and notify room
        for (const [prodId, producer] of peer.producers.entries()) {
          producer.close();
          socket.to(currentRoomPath).emit("producer-closed", {
            producerId: prodId,
            producerSocketId: socket.id
          });
        }

        // Close all consumers
        for (const consumer of peer.consumers.values()) {
          consumer.close();
        }

        // Close all transports
        for (const transport of peer.transports.values()) {
          transport.close();
        }

        room.peers.delete(socket.id);

        socket.to(currentRoomPath).emit("peer-left", {
          socketId: socket.id,
          username: peer.username
        });

        console.log(`[Mediasoup] Cleaned up peer "${peer.username}" (${socket.id}) from room "${currentRoomPath}"`);
      }

      // If room is empty, close router and delete room
      if (room.peers.size === 0) {
        room.router.close();
        rooms.delete(currentRoomPath);
        console.log(`[Mediasoup] Room "${currentRoomPath}" is empty. Router closed.`);
      }
    });
  });

  return io;
};

export default connectToSocket;
