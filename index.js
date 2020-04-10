require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/user.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const socketio = require("socket.io");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
const server = app.listen(PORT, () =>
  console.log("GOOD 2 GO on PORT: " + PORT)
);

const io = socketio(server);
const chatroomSockets = require("./sockets/chatroom.sockets.js")(io);

process.on("unhandledRejection", (err, promise) => {
  console.error(`ERR: ` + err.message);
  server.close(() => process.exit(1));
});
