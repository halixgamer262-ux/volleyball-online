const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

let score = { left: 0, right: 0 };

io.on("connection", (socket) => {

  socket.on("move", data => {
    socket.broadcast.emit("enemyMove", data);
  });

  socket.on("ball", data => {
    socket.broadcast.emit("ballUpdate", data);
  });

  socket.on("pointLeft", () => {
    score.left++;
    io.emit("scoreUpdate", score);
  });

  socket.on("pointRight", () => {
    score.right++;
    io.emit("scoreUpdate", score);
  });

});

http.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});
