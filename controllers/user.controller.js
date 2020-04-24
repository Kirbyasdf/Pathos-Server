const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("../db/dbConnection.js");
const queryRunner = require("../db/queryRunner.js");
const User = require("../models/user.js");
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
  const { username, password } = req.body;

  try {
    const dbRes = await db.loadUserByUsername(username)
    const user = dbRes.rows[0]
    const isCorrect = await bcrypt.compare(password, user.password)

    if (isCorrect) {
      res.status(200).json(user);

    } else {
      res.status(401).json({ user: user.username, error: 'Wrong username/password' })
    }
  } catch (err) {
    console.error(err);
  }
}

userSignup = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const newUser = new User(username, password);
    newUser.save();

    console.log(newUser);

    res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { test, defaultUser, userLogin, userSignup };
