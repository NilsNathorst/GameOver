require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = 3000;

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

const socketEvents = require("./socket");
socketEvents(io);

server.listen(PORT, console.log(`Socket server litening on ${PORT}`));
