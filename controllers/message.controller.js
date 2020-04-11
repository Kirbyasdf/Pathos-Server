const pool = require("../db/dbConnection.js");
const queryRunner = require("../db/queryRunner.js");
const db = new queryRunner(pool);

test = async (req, res, next) => {
  try {
    const dbRes = await db.test();
    res.json({ message: "message controller working", db: dbRes.rows });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { test };
