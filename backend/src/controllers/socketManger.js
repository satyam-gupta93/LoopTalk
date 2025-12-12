// import { Server } from "socket.io";

// let connections = {};
// let messages = {};
// let timeOnline = {};


// const connectToSocket = (server) => {
//    const io = new Server(server, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"],
//             allowedHeaders: ["*"],
//             credentials: true
//         }
//     });


//     io.on("connection", (socket) => {

//         console.log("SOMETHING CONNECTED")

//         socket.on("join-call", (path) => {

//             if (connections[path] === undefined) {
//                 connections[path] = []
//             }
//             connections[path].push(socket.id)

//             timeOnline[socket.id] = new Date();

//             for (let a = 0; a < connections[path].length; a++) {
//                 io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
//             }

//             if (messages[path] !== undefined) {
//                 for (let a = 0; a < messages[path].length; ++a) {
//                     io.to(socket.id).emit("chat-message", messages[path][a]['data'],
//                         messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
//                 }
//             }

//         })

//         socket.on("signal", (toId, message) => {
//             io.to(toId).emit("signal", socket.id, message);
//         })

//         socket.on("chat-message", (data, sender) => {

//             const [matchingRoom, found] = Object.entries(connections)
//                 .reduce(([room, isFound], [roomKey, roomValue]) => {


//                     if (!isFound && roomValue.includes(socket.id)) {
//                         return [roomKey, true];
//                     }

//                     return [room, isFound];

//                 }, ['', false]);

//             if (found === true) {
//                 if (messages[matchingRoom] === undefined) {
//                     messages[matchingRoom] = []
//                 }

//                 messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
//                 console.log("message", matchingRoom, ":", sender, data)

//                 connections[matchingRoom].forEach((elem) => {
//                     io.to(elem).emit("chat-message", data, sender, socket.id)
//                 })
//             }

//         })

//         socket.on("disconnect", () => {

//             var diffTime = Math.abs(timeOnline[socket.id] - new Date())

//             var key

//             for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

//                 for (let a = 0; a < v.length; ++a) {
//                     if (v[a] === socket.id) {
//                         key = k

//                         for (let a = 0; a < connections[key].length; ++a) {
//                             io.to(connections[key][a]).emit('user-left', socket.id)
//                         }

//                         var index = connections[key].indexOf(socket.id)

//                         connections[key].splice(index, 1)


//                         if (connections[key].length === 0) {
//                             delete connections[key]
//                         }
//                     }
//                 }

//             }


//         })


//     })


//     return io;
// };

// export default connectToSocket;

























import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};
// Store participant names
let participants = {};

const connectToSocket = (server) => {
   const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("SOMETHING CONNECTED")

        socket.on("join-call", (path, username) => {
            console.log(`User ${username} joining call at ${path}`);
            
            if (connections[path] === undefined) {
                connections[path] = []
            }
            connections[path].push(socket.id)

            // Store participant name
            if (participants[path] === undefined) {
                participants[path] = {}
            }
            participants[path][socket.id] = username || 'Anonymous'
            
            console.log(`Current participants in ${path}:`, participants[path]);

            timeOnline[socket.id] = new Date();

            // Send participant info to all users in the room
            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path], participants[path])
            }

            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }
        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }
        })

        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected`);
            var diffTime = Math.abs(timeOnline[socket.id] - new Date())
            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)
                        connections[key].splice(index, 1)

                        // Remove participant name
                        if (participants[key]) {
                            delete participants[key][socket.id]
                            console.log(`Remaining participants in ${key}:`, participants[key]);
                        }

                        if (connections[key].length === 0) {
                            delete connections[key]
                            delete participants[key]
                            console.log(`Room ${key} is now empty`);
                        }
                    }
                }
            }
        })
    })

    return io;
};

export default connectToSocket;
