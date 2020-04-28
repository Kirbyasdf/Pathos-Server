const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const query = require("../db/query.js");

class User {
  constructor(username) {
    this.username = username;
  }
  async load() {
    try {
      const dbRes = await new query().loadUserByUsername(this.username);
      if (!dbRes.rows[0].username) {
        return false;
      }
      this.id = dbRes.rows[0].id;
      this.username = dbRes.rows[0].username;
      this.password = dbRes.rows[0].password;
      return true;
    } catch (err) {
      console.error(err);
    }
  }

  async create(password) {
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);
    try {
      const dbRes = await new query().createNewUser(this.username, passHash);
      this.id = dbRes.rows[0].id;
    } catch (err) {
      console.error(err);
    }
  }

  async validate(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  async getSignedToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  }
}

module.exports = User;
