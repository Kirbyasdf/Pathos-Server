const pool = require("../db/dbConnection.js");
const queryRunner = require("../db/queryRunner.js");
const db = new queryRunner(pool);

///TO DO broadcasted messages to the front after they are persisted then  + auto send chat history when thec client hits the default useEffect

///NEED TO READ UP HERE
// https://socket.io/docs/emit-cheatsheet/

/// I HAVE NO IDEA IF THIS IS PROPER WITH THE Async try/catch

const chatRoomSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("new connection");
    socket.on("disconnect", () => {
      console.log("connection terminated");
    });
    socket.on("sendMessage", async (message, callback) => {
      try {
        //I am trying to make it so it saves the message then sends it back out to all the clients
        await db.saveMessage(message);
        socket.broadcast.emit("messageBack", message);
      } catch (err) {
        console.error(err);
      }
    });
  });
};

module.exports = chatRoomSockets;
