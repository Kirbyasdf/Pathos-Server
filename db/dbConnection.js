const { Pool } = require("pg");

const DBpool = new Pool({
  user: process.env.DB_POOL_USER,
  password: process.env.DB_POOL_PASS,
  host: process.env.DB_POOl_HOST,
  port: process.env.DB_POOL_PORT,
  database: process.env.DB_POOL_DB,
  ssl: {
    rejectUnauthorized: false,
    mode: "require",
  },
});

module.exports = DBpool;
