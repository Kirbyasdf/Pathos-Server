const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/dbConnection.js");
const queryRunner = require("../db/queryRunner.js");
const db = new queryRunner(pool);

class User {
  constructor(username) {
    this.load(username);
  }

  async load(username) {
    const dbRes = await db.loadUserByUsername(username);
    this.id = dbRes.rows[0].id;
    this.username = dbRes.rows[0].username;
    this.password = dbRes.rows[0].password;
  }

  async create(username, password) {
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    try {
      const dbRes = await db.createNewUser(username, passHash);
      const user = dbRes.rows[0];
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async validate(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  async getSignedToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECERT, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  }
}

module.exports = User;
