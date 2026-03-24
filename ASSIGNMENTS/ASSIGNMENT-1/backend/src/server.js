const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.POSTGRES_USER || "admin",
  password: process.env.POSTGRES_PASSWORD || "password",
  database: process.env.POSTGRES_DB || "mydb",
  port: 5432,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name TEXT
    );
  `);
}

initDB();

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.post("/users", async (req, res) => {
  const { name } = req.body;

  const result = await pool.query(
    "INSERT INTO users(name) VALUES($1) RETURNING *",
    [name]
  );

  res.json(result.rows[0]);
});

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
