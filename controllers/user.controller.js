const bcrypt = require("bcrypt");
const pool = require("../db/dbConnection.js");
const queryRunner = require("../db/queryRunner.js");
const User = require("../models/user.js");
const db = new queryRunner(pool);

const sendTokenResponse = async (user, statusCode, res) => {
  const token = await user.getSignedToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  if (user.password) {
    delete user.password;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ sucess: true, token, user });
};

register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ sucess: false, message: "Please Provide email/password" });
  }
  try {
    const user = await new User(username);
    await user.create(password);
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err);
  }
};

login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res
        .status(400)
        .json({ sucess: false, message: "Invalid Login no name or password" });
    }

    const user = new User(username);
    await user.load();

    if (!user.validate(password)) {
      res
        .status(400)
        .json({ sucess: false, message: "Invalid Login no name or password" });
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err);
  }
};

///testing

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

module.exports = { test, defaultUser, login, register };
