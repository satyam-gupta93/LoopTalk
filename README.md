# LoopTalk - Real-Time Video and Chat Application

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
npm start
