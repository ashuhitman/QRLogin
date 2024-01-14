import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 8000;
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("QR login server 💗 ");
});

server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
