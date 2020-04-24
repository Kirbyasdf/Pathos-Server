require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const chatroomRoutes = require("./routes/chatroom.routes.js");

const socketio = require("socket.io");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/chatrooms", chatroomRoutes);
const server = app.listen(PORT, () =>
  console.log("GOOD 2 GO on PORT: " + PORT)
);

const io = socketio(server);
const chatroomSockets = require("./sockets/chatroom.sockets.js")(io);

process.on("unhandledRejection", (err, promise) => {
  console.error(`ERR: ` + err.message);
  server.close(() => process.exit(1));
});
