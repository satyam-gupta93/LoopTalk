// import express from "express";
// import {createServer} from "http"
// import dotenv from "dotenv"
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import cors from "cors";
// import connectTosocket from "./controllers/socketManger.js";
// import UserRouter from "./routes/userRoutes.js";

// // load env
// dotenv.config();

// //Initialize
// const app = express();

// // middleware
// app.use(cors());
// app.use(express.json({limit:"40kb"}));
// app.use(express.urlencoded({limit:"40kb",extended:"true"}));

// //attach Socket.IO
// const server = createServer(app);
// const io = connectTosocket(server);



// app.get("/home",(req,res)=>{
//     return res.json({"hello":"world"})
// })
// app.use("/api/user",UserRouter)

// const start = async() =>{

//     const connectionDB = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`connection db Host :${connectionDB.connection.host}`);
    
//     const PORT = process.env.PORT || 8000;
//     server.listen(PORT,()=>{
//         console.log("Running on Port 8000")
//     })
// }

// start();


import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import connectTosocket from "./controllers/socketManger.js";
import UserRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// middleware
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// serve frontend
app.use(express.static(path.join(__dirname, "frontend/dist")));

// attach socket
const server = createServer(app);
connectTosocket(server);

// routes
app.get("/home", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/user", UserRouter);

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  const PORT = process.env.PORT || 8000;
  server.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
  });
};

start();
