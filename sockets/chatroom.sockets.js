const chatRoomSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("new connection");
    socket.on("disconnect", () => {
      console.log("connection terminated");
    });

    socket.on("sendMessage", async (message, callback) => {
      console.log(message);

      socket.emit("message", message);
      callback();
    });
  });
};

module.exports = chatRoomSockets;
