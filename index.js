require("dotenv").config();
const express = require("express");
const pool = require("./db/dbConnection.js");
const queryRunner = require("./db/queryRunner.js");
const db = new queryRunner(pool);
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.get("/test", async (req, res, next) => {
  try {
    const dbRes = await db.test();
    res.status(200).json({ response: dbRes.rows });
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => console.log("GOOD 2 GO on PORT: " + PORT));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`ERR: ` + err.message);
  // Close server & exit process
  server.close(() => process.exit(1)); //pass 1 to exit with failure
});
