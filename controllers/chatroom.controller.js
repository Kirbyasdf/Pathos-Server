const pool = require("../db/dbConnection.js");
const queryRunner = require("../db/queryRunner.js");
const db = new queryRunner(pool);

test = async (req, res, next) => {
  try {
    const dbRes = await db.test();
    res.json({ message: "chatrooms controller working", db: dbRes.rows });
  } catch (err) {
    console.error(err);
  }
};

loadDefaultChatroom = async (req, res, next) => {
  try {
    const dbRes = await db.loadDefaultChatroom();
    const chatroom = dbRes.rows[0];
    res.status(200).json(chatroom);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { test, loadDefaultChatroom };
