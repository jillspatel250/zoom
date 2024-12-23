import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";

import cors from "cors";
import connectToSocket from "./src/controller/socketmanager.js";
import userRoutes from "./src/routes/users.routes.js";
const app=express();
const server=createServer(app);//app ne server thi connect kayru 
const io=connectToSocket(server);//server chalavsu tyare app and io banne hase server jode 
//venn diagram sauthi pehla createserver->eni under io->eni under app


app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);


const start=async()=>{
    const connectionDB=await mongoose.connect("mongodb+srv://jillspatel250:jills%402022@cluster0.puiqu.mongodb.net/");
    console.log(`mongo connected db host:${connectionDB.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("listing on port no 8000");
    })
};

start();
