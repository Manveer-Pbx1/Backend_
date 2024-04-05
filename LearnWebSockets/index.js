const express = require("express");

const app = express();

const path = require("path"); // we need path to join paths to our HTML files.
const http = require("http"); // we want http for web sockets
const server = http.createServer(app); // we create a server using the express app as base

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//socket io imports
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  return res.render("home");
});

const users = {};
//handling socket.io
io.on("connection", (socket) => {
  //socket is the client that is connected to the server
  // console.log("new user connected.", socket.id); //socket.id is the unique id of the client
  //nickname handling
  socket.on("nickname", (nickname) => {
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ff00ff",
      "#ffff00",
      "#00ffff",
    ];
    const colorIndex = Object.keys(users).length % colors.length;
    const userColor = colors[colorIndex];
    const otherColor = colors[(colorIndex + 1) % colors.length];
    users[socket.id] = { nickname: nickname, color: userColor };
    socket.broadcast.emit("message", {
      text: `${nickname} has joined the chat`,
      color: "green",
    });
    socket.emit("nickname", { userColor, otherColor });
    socket.emit(
      "online_users",
      Object.values(users).map((user) => user.nickname)
    );
    //typing
    socket.on("typing", () => {
      const nickname = users[socket.id].nickname;
      socket.broadcast.emit("message", {
        text: `${nickname} is typing...`,
        color: "grey",
      });
    });
    io.emit("user_connected", nickname);
  });
  socket.on("message", (message) => {
    // 'message' is derived from the client side emit event
    // console.log("A new message: ", message);
    const { text, nickname, color } = message;
    io.emit("message", { text, nickname, color });
  });

  //diconnect
  socket.on("disconnect", () => {
    if (users[socket.id]) {
      io.emit("message", {
        text: `${users[socket.id]} has left the chat`,
        color: "red",
      });
      io.emit("user_disconnected", users[socket.id].nickname);
      delete users[socket.id];
    }
  });
});
server.listen(8000, () => console.log("Server started on port 8000"));

//ASSIGNMENT:
//Go to socket.io/get-started/chat and follow the instructions to create a chat application using socket.io
