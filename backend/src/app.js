import express from "express";
import {createServer} from "http"
import dotenv from "dotenv"
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";


dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);



app.get("/home",(req,res)=>{
    return res.json({"hello":"world"})
})

const start = async() =>{

    const connectionDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connection db Host :${connectionDB.connection.host}`);
    
    const PORT = process.env.PORT || 8000;
    server.listen(app.get("port"),()=>{
        console.log("Running on Port 8000")
    })
}

start();