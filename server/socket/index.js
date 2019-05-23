// server

module.exports = io => {
  let userCount = 0;
  let players = {};
  io.on("connection", socket => {
    userCount++;
    console.log("a new connection");
    console.log(userCount);
    players[socket.id] = {
      x: Math.floor(Math.random() * (500 - 150)) + 150,
      y: 0,
      playerId: socket.id,
      team: Math.floor(Math.random() * 2) == 0 ? "red" : "blue"
    };

    io.emit("currentPlayers", players, userCount);

    socket.broadcast.emit("newPlayer", players[socket.id]);

    socket.on("disconnect", () => {
      userCount--;
      console.log("user disconnected");
      console.log(userCount);
      delete players[socket.id];
      io.emit("disconnect", socket.id, userCount);
    });
  });
};
