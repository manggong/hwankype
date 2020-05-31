const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const sio = require("socket.io");
const favicon = require("serve-favicon");
const compression = require("compression");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server =
  process.env.NODE_ENV === "production"
    ? https.createServer(app).listen(port)
    : http.createServer(app).listen(port);
const io = sio(server);

app.use(compression());
app.use(express.static(path.join(__dirname, "dist")));
app.use((req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});
//app.use(favicon("./dist/favicon.ico"));
app.disable("x-powered-by");
io.sockets.on("connection", (socket) => {
  let room = "";
  socket.on("message", (message) =>
    socket.broadcast.to(room).emit("message", message)
  );
  socket.on("find", () => {
    const url = socket.request.headers.referer.split("/");
    room = url[url.length - 1];
    const sr = io.sockets.adapter.rooms[room];
    if (sr === undefined) {
      socket.join(room);
      socket.emit("create");
    } else if (sr.length === 1) {
      socket.emit("join");
    }
  });
});
