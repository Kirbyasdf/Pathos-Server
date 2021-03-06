const pool = require("./dbConnection.js");

class queryRunner {
  constructor() {
    this.db = pool;
  }

  test() {
    return this.db.query(`SELECT CURRENT_TIMESTAMP;`);
  }

  saveMessage({ content, user_id, chatroom_id }) {
    return this.db.query(
      "INSERT INTO message_table(content, user_id, chatroom_id) VALUES($1,$2,$3)",
      [content, user_id, chatroom_id]
    );
  }

  async selectById(table, id){
    const text = `select * from ${table} where id = $1`
    return this.db.query(text, [id])    
  }

  loadUserByUsername(user) {
    return this.db.query(
      "SELECT * FROM user_table WHERE user_table.username=$1",
      [user]
    );
  }

  loadMessageLog(chatroom_id) {
    return this.db.query("SELECT * FROM message_table WHERE chatroom_id=$1", [
      chatroom_id,
    ]);
  }

  loadDefaultChatroom() {
    return this.db.query(
      "SELECT * FROM chatroom_table WHERE chatroom_table.name='default chatroom'"
    );
  }

  createNewUser(username, passHash) {
    return this.db.query(
      "INSERT INTO user_table(username, password) VALUES($1, $2) RETURNING id, username",
      [username, passHash]
    );
  }
  getUserId(username) {
    return this.db.query(
      "SELECT id FROM user_table WHERE (user_table.username=$1)",
      [username]
    );
  }
}

module.exports = queryRunner;
