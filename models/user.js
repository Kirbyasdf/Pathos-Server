const bcrypt = require('bcrypt-nodejs');
const pool = require("../db/dbConnection.js");
const queryRunner = require("../db/queryRunner.js");
const db = new queryRunner(pool);

class User {
    passHash;
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static async hashPassword(passwordText) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(plaintextPassword, salt);
    }

    async save() {
        //save to db
        this.passHash = await hashPassword(this.password)
        return await db.createNewUser(this.username, this.passHash);
    }
}

module.exports = User;