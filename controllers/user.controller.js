const bcrypt = require('bcrypt-nodejs');
const pool = require("../db/dbConnection.js");
const queryRunner = require("../db/queryRunner.js");
const db = new queryRunner(pool);

test = async (req, res, next) => {
  try {
    const dbRes = await db.test();
    res.json({ message: "user controller working", db: dbRes.rows });
  } catch (err) {
    console.error(err);
  }
};

defaultUser = async (req, res, next) => {
  const { userCall } = req.params;

  const userName = userCall === "1" ? "default user 1" : "default user 2";

  try {
    const dbRes = await db.loadUserByUsername(userName);
    const user = dbRes.rows[0];
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};

userLogin = async (req, res) => {
  const { userInfo } = req.body;

  try {
    const user = await db.loadUserByUsername(userInfo.username)
    const password = await bcrypt.compare(userInfo.password, user.password)

    if (password) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ user: user.username, error: 'Wrong password' })
    }

    const user = dbRes.rows[0];

  } catch (err) {
    console.error(err);
  }
}

userSignup = async (req, res) => {
  const { userInfo } = req.body;

  try {
    const dbRes = await db.createNewUser(userInfo.username)
    const user = dbRes.rows[0];
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { test, defaultUser, userLogin, userSignup };
