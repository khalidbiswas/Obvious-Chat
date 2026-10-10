// backend/socket/socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// userId -> number of open sockets (one user can have several tabs / devices)
const onlineCount = new Map();

// Authenticate every socket with the same "jwt" cookie the REST API uses,
// so nobody can pretend to be another user by sending a fake userId.
io.use((socket, next) => {
  try {
    const rawCookies = socket.handshake.headers.cookie || "";
    const match = rawCookies.match(/(?:^|;\s*)jwt=([^;]+)/);
    if (!match) return next(new Error("Unauthorized: no token"));

    const decoded = jwt.verify(decodeURIComponent(match[1]), process.env.JWT_SECRET);
    if (!decoded?.userId) return next(new Error("Unauthorized: invalid token"));

    socket.userId = String(decoded.userId);
    next();
  } catch {
    next(new Error("Unauthorized: invalid token"));
  }
});

io.on("connection", (socket) => {
  const userId = socket.userId;

  // Every user gets a private "room" named after their id.
  // io.to(userId).emit(...) then reaches ALL of that user's tabs/devices.
  socket.join(userId);

  onlineCount.set(userId, (onlineCount.get(userId) || 0) + 1);
  io.emit("getOnlineUsers", [...onlineCount.keys()]);

  socket.on("disconnect", () => {
    const remaining = (onlineCount.get(userId) || 1) - 1;
    if (remaining <= 0) onlineCount.delete(userId);
    else onlineCount.set(userId, remaining);

    io.emit("getOnlineUsers", [...onlineCount.keys()]);
  });
});

export { app, server, io };