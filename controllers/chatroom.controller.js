const query = require("../db/query.js");

test = async (req, res, next) => {
  try {
    const dbRes = await new query().test();
    res.json({ message: "chatrooms controller working", db: dbRes.rows });
  } catch (err) {
    console.error(err);
  }
};

loadDefaultChatroom = async (req, res, next) => {
  try {
    console.log("hit");
    const dbRes = await new query().loadDefaultChatroom();
    const chatroom = dbRes.rows[0];
    res.status(200).json(chatroom);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { test, loadDefaultChatroom };
