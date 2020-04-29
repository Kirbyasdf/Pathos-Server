const query = require("../db/query.js");

test = async (req, res, next) => {
  try {
    const dbRes = await new query().test();
    res.json({ message: "message controller working", db: dbRes.rows });
  } catch (err) {
    console.error(err);
  }
};

loadMessageLog = async (req, res, next) => {
  const { chatroom_id } = req.params;
  try {
    const dbRes = await new query().loadMessageLog(chatroom_id);
    res.status(200).json(dbRes.rows);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { test, loadMessageLog };
