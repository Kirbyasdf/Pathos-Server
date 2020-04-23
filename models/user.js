const pool = require("../db/dbConnection.js");
const queryRunner = require("../db/queryRunner.js");
const db = new queryRunner(pool);
var bcrypt = require('bcrypt-nodejs');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.save();
    }

    static async hashPassword(passwordText) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(plaintextPassword, salt);
    }

    async save() {
        //save to db
        db.createNewUser()
    }
}