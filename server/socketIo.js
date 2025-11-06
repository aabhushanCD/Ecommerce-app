import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*", credentials: true } });

export { io, server, app };
