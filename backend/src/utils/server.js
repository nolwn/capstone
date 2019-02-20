
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  socket.on("subscribe", gameId => {
    const room = `Game ${gameId}`;
    console.log("joining " + room);
    socket.join(room);
  });

  socket.on("Join Lobby", gameId => {
    socket.join("Lobby");
    console.log("Adding new client to Lobby");
  })
});


module.exports = { app, http, io };
