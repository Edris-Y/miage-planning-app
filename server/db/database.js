const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
require("dotenv").config();

async function getDbConnection() {
  const dbPath = path.join(process.cwd(), process.env.DB_NAME || "planning.db");

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec("PRAGMA foreign_keys = ON;");

  return db;
}

module.exports = { getDbConnection };