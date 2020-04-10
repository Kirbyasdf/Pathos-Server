const chatRoomSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("new connection");

    socket.on("disconnect", () => {
      console.log("connection terminated");
    });
    socket.on("yo", () => {
      console.log("this is atest");
    });
  });
};

module.exports = chatRoomSockets;
