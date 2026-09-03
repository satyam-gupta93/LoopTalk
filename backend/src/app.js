import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket, { initMediasoupWorkers } from "./controllers/mediasoupController.js";
import UserRouter from "./routes/userRoutes.js";

// load env
dotenv.config();

// Initialize
const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// attach Socket.IO with Mediasoup SFU
const server = createServer(app);
const io = connectToSocket(server);

app.get("/home", (req, res) => {
    return res.json({ "hello": "world" });
});
app.use("/api/user", UserRouter);

const start = async () => {
    try {
        const connectionDB = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connection db Host :${connectionDB.connection.host}`);

        // Initialize Mediasoup SFU Workers
        await initMediasoupWorkers();

        const PORT = process.env.PORT || 8000;
        server.listen(PORT, () => {
            console.log(`LoopTalk SFU Server running on Port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

start();


