const User = require("../models/User.js");
const query = require("../db/query.js");

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
    if (!user.id) {
      res
        .status(400)
        .json({ sucess: false, message: "Username already exists" });
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err);
  }
};

login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ sucess: false, message: "Invalid Login " });
    }

    const user = new User(username);
    if (!(await user.load())) {
      return res.status(400).json({ sucess: false, message: "Invalid Login" });
    }

    if (!(await user.validate(password))) {
      res.status(400).json({ sucess: false, message: "Invalid Login " });
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err);
  }
};

///testing

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

test = async (req, res, next) => {
  try {
    const dbRes = await new query().test();
    res.json({ message: "user controller working", db: dbRes.rows });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { test, defaultUser, login, register };
