import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    socket.on("join-call", (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }
      if (!messages[path]){
        messages[path] = [];
      } 

      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Send existing messages to the new user
      messages[path].forEach((msg) => {
        io.to(socket.id).emit(
          "chat-message",
          msg.data,
          msg.sender,
          msg["socket-id-sender"]
        );
      });
    });

    socket.on("signal", (toID, message) => {
      io.to(toID).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      let matchingRoom = null;

      for (const [roomKey, roomValue] of Object.entries(connections)) {
        if (roomValue.includes(socket.id)) {
          matchingRoom = roomKey;
          break;
        }
      }

      if (matchingRoom) {
        if (!messages[matchingRoom]) messages[matchingRoom] = [];

        messages[matchingRoom].push({
          sender,
          data,
          "socket-id-sender": socket.id,
        });

        console.log( matchingRoom, ":", sender, data);

        connections[matchingRoom].forEach((id) => {
          io.to(id).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      for (const [room, users] of Object.entries(connections)) {
        if (users.includes(socket.id)) {
          users.forEach((id) => io.to(id).emit("user-left", socket.id));

          connections[room] = users.filter((id) => id !== socket.id);
          if (connections[room].length === 0) delete connections[room];
          break;
        }
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};

export default connectToSocket;
