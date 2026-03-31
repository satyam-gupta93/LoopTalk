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

# LoopTalk

**Where common ground is found.**

A real-time video conferencing and chat application.

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white)

<br/>

</div>

---

## Overview

LoopTalk is a real-time video conferencing and chat application that allows multiple users to join different rooms and communicate using video and messaging.

The project focuses on real-time communication, peer-to-peer video streaming, and scalable room-based interaction.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Real-Time | Socket.IO, WebRTC |

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

## System Architecture

```
CLIENT A                [SIGNALING SERVER]                CLIENT B
   |                           |                              |
   |------- join-room -------->|<-------- join-room ----------|
   |                           |                              |
   |<------ offer/answer ------|------- offer/answer -------->|
   |                           |                              |
   |<----------------- ICE candidates ----------------------->|
   |                                                          |
   |<================ P2P WebRTC Connection =================>|
   |                    (media streams)                       |
```

---

## WebRTC Connection Flow

```
User A                  Server                  User B
  |                       |                       |
  |---- create offer ---->|                       |
  |                       |---- forward offer --->|
  |                       |                       |--- create answer
  |                       |<--- send answer -------|
  |<--- forward answer ----|                       |
  |                       |                       |
  |<----------- ICE candidates exchanged -------->|
  |                                               |
  |<======== P2P Connection Established =========>|
  |<============= Media Streams Flow ============>|
```

---

## How It Works

```
Step 1  ->  User joins a room via Room ID
Step 2  ->  Signaling server registers the user in that room
Step 3  ->  Offer / Answer messages exchanged via server
Step 4  ->  ICE candidates negotiated between peers
Step 5  ->  WebRTC peer-to-peer connection established
Step 6  ->  Video and audio stream directly between users
Step 7  ->  Chat messages broadcast via Socket.IO in real-time
```

---

## Installation

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

> App runs at `http://localhost:3000`

---

## Room Management

- Users join rooms using a unique Room ID
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

- [ ] Improve UI/UX design
- [ ] Add recording functionality
- [ ] Implement better error handling
- [ ] Add TURN server support for strict NAT networks
- [ ] Add screen sharing support
- [ ] Optimize performance for large rooms

---

## License

This project is open source. Feel free to use, modify, and distribute.

---

<div align="center">

Built with WebRTC and Socket.IO

**LoopTalk** — Where common ground is found.

</div>