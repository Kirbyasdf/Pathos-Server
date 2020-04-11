///TO DO broadcasted messages to the front after they are persisted then  + auto send chat history when thec client hits the default useEffect

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
