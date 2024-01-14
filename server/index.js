import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { log } from "console";

const PORT = 8000;
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://spiffy-kelpie-c1f3ae.netlify.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("join_room", (data) => socket.join(data));
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.message);
  });
});

app.get("/", (req, res) => {
  res.send("QR login server 💗 ");
});

server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
