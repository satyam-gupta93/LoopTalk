<!-- # LoopTalk - Real-Time Video and Chat Application

## Overview

LoopTalk is a real-time video conferencing and chat application that allows multiple users to join different rooms and communicate using video and messaging.

The project focuses on real-time communication, peer-to-peer video streaming, and scalable room-based interaction.

---

## Features

- Real-time video communication using WebRTC
- Real-time messaging using Socket.IO
- Multiple users can join dynamic rooms
- Room-based communication system
- Peer-to-peer video streaming
- User identification in chat
- Event-driven real-time updates

---

## Tech Stack

Frontend:
- React.js

Backend:
- Node.js
- Express.js

Real-Time Communication:
- Socket.IO
- WebRTC

---

## System Architecture

The system works in two main parts:

1. Signaling Server (Socket.IO)
2. Peer-to-Peer Communication (WebRTC)

Flow:

Client → Signaling Server → Peer-to-Peer Connection → Media Transfer

---

## How It Works

1. A user joins a room
2. The signaling server connects users in the same room
3. Users exchange offer and answer messages
4. ICE candidates are exchanged
5. A peer-to-peer connection is established using WebRTC
6. Video and audio streams are shared directly between users
7. Chat messages are sent in real-time using Socket.IO

---

## WebRTC Connection Flow

- User A creates an offer
- Offer is sent to User B via signaling server
- User B sends an answer
- ICE candidates are exchanged
- Peer-to-peer connection is established
- Media streams flow directly between users

---

## Room Management

- Users join rooms using a room ID
- Only users in the same room can communicate
- Server maintains a list of users in each room
- New users connect to all existing users in the room

---

## Chat System

- Real-time messaging using Socket.IO
- Messages are broadcast to all users in the room
- Sender identification is included

---

## Challenges Faced

- Handling WebRTC connection failures due to network issues
- Managing multiple peer connections in a single room
- Ensuring reliable signaling between users
- Debugging real-time communication issues

---

## Learnings

- Understanding of real-time communication systems
- Deep knowledge of WebRTC and peer-to-peer networking
- Socket.IO event handling
- Managing asynchronous data flow
- Building scalable real-time applications

---

## Future Improvements

- Improve UI/UX design
- Add recording functionality
- Implement better error handling
- Optimize performance for large rooms

---

## Installation and Setup

```bash
git clone https://github.com/your-username/looptalk.git
cd looptalk
npm install
npm start -->


<div align="center">

<br/>

```
██╗      ██████╗  ██████╗ ██████╗ ████████╗ █████╗ ██╗     ██╗  ██╗
██║     ██╔═══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔══██╗██║     ██║ ██╔╝
██║     ██║   ██║██║   ██║██████╔╝   ██║   ███████║██║     █████╔╝
██║     ██║   ██║██║   ██║██╔═══╝    ██║   ██╔══██║██║     ██╔═██╗
███████╗╚██████╔╝╚██████╔╝██║        ██║   ██║  ██║███████╗██║  ██╗
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
```

**Where common ground is found.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io)
[![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=flat-square&logo=webrtc&logoColor=white)](https://webrtc.org)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)

<br/>

</div>

---

## 📌 Overview

**LoopTalk** is a real-time video conferencing and chat application that lets multiple users join shared rooms and communicate through live video streams and instant messaging.

Built with **WebRTC** for peer-to-peer media transfer and **Socket.IO** for signaling and chat — LoopTalk is designed around speed, simplicity, and scalable room-based interaction.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎥 **Video Conferencing** | Real-time peer-to-peer video using WebRTC |
| 💬 **Live Chat** | Instant room-scoped messaging via Socket.IO |
| 🚪 **Dynamic Rooms** | Join any room with a unique Room ID |
| 👥 **Multi-user Support** | Multiple users per room, all connected |
| 🔁 **Event-Driven** | Fully reactive, real-time updates throughout |
| 🪪 **User Identity** | Sender identification shown in chat |

---

## 🛠 Tech Stack

```
┌─────────────────────────────────────────────┐
│                  FRONTEND                   │
│                  React.js                   │
├─────────────────────────────────────────────┤
│                  BACKEND                    │
│           Node.js  ·  Express.js            │
├─────────────────────────────────────────────┤
│            REAL-TIME LAYER                  │
│          Socket.IO  ·  WebRTC               │
└─────────────────────────────────────────────┘
```

---

## 🏗 System Architecture

LoopTalk operates in two coordinated layers:

```
  CLIENT A                                    CLIENT B
     │                                           │
     │──── join-room ──▶ SIGNALING SERVER ◀──────│
     │                        │                  │
     │◀──── offer/answer ─────┤─── offer/answer ─│
     │                        │                  │
     │◀──────────── ICE candidates ──────────────│
     │                                           │
     │◀════════ P2P WebRTC Connection ══════════▶│
     │              (media streams)              │
```

**Signaling** is handled by the Socket.IO server.
**Media** flows directly peer-to-peer via WebRTC — the server never touches your video.

---

## ⚙️ How It Works

```
1. User joins a room via Room ID
        ↓
2. Signaling server registers the user in that room
        ↓
3. Offer / Answer messages are exchanged via server
        ↓
4. ICE candidates are negotiated between peers
        ↓
5. WebRTC peer-to-peer connection is established
        ↓
6. Video & audio stream directly between users
        ↓
7. Chat messages broadcast via Socket.IO in real-time
```

---

## 🔗 WebRTC Connection Flow

```
User A                  Server                  User B
  │                       │                       │
  │──── create offer ────▶│                       │
  │                       │──── forward offer ───▶│
  │                       │                       │── create answer
  │                       │◀─── send answer ──────│
  │◀─── forward answer ───│                       │
  │                       │                       │
  │◀════ ICE candidates exchanged ════════════════│
  │                                               │
  │◀══════════ P2P Connection Established ════════│
  │◀══════════════ Media Streams Flow ════════════│
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v16+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/looptalk.git

# Navigate into the project
cd looptalk

# Install dependencies
npm install

# Start the server
npm start
```

> The app will be running at `http://localhost:3000`

---

## 🗂 Room Management

- Users join rooms using a **unique Room ID**
- Only users sharing the same Room ID can see and chat with each other
- The server tracks all active users per room
- New users automatically connect to all existing room participants

---

## 💬 Chat System

- Messages are **broadcast instantly** to all users in the room
- Each message is tagged with the **sender's identity**
- Powered entirely by **Socket.IO** event emitters

---

## 🧱 Challenges Faced

- 🔌 Handling WebRTC connection failures across different network conditions
- 👥 Managing multiple simultaneous peer connections per room
- 🔁 Ensuring reliable, ordered signaling between users
- 🐛 Debugging complex async real-time communication flows

---

## 📚 Learnings

- Deep understanding of **WebRTC** internals — offers, answers, ICE, STUN
- Real-world **Socket.IO** event handling at scale
- Managing **asynchronous data flows** in multi-user environments
- Architecting **scalable real-time systems** from the ground up

---

## 🔮 Future Improvements

- [ ] Improve UI/UX design and responsiveness
- [ ] Add **session recording** functionality
- [ ] Implement **TURN server** support for strict NAT networks
- [ ] Better error handling and reconnection logic
- [ ] Optimize performance for large rooms (SFU architecture)
- [ ] Add **screen sharing** support

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute.

---

<div align="center">

Built with 💚 using WebRTC & Socket.IO

**LoopTalk** — *Where common ground is found.*

</div>