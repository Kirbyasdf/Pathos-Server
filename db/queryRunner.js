class queryRunner {
  constructor(db) {
    this.db = db;
  }
  test() {
    return this.db.query(`SELECT CURRENT_TIMESTAMP;`);
  }
}

module.exports = queryRunner;
