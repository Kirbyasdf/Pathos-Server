class queryRunner {
  constructor(db) {
    this.db = db;
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
}

module.exports = queryRunner;
