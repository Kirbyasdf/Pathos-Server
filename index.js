require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const hpp = require("hpp")
const xss = require("xss-clean")
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const chatroomRoutes = require("./routes/chatroom.routes.js");

const socketio = require("socket.io");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"))
app.use(xss())
app.use(hpp())
app.use(express.json());
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/chatrooms", chatroomRoutes);
const server = app.listen(PORT, () =>
  console.log("GOOD 2 GO on PORT: " + PORT)
);

const io = socketio(server);
const chatroomSockets = require("./sockets/chatroom.sockets.js")(io);

app.get("*", ({res}) => {
  res.status(404).send({ message: "u lost son?" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ type: "error", message: err.message });
});
process.on("unhandledRejection", (err, promise) => {
  console.error(`ERR: ` + err.message);
  server.close(() => process.exit(1));
});
