const router = require("express").Router();
const db = require("../db");

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  await db.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)`,
    [name, email, password]
  );

  res.json({ message: "User registered successfully" });
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query(
    `SELECT id, name, role FROM users
     WHERE email=$1 AND password=$2`,
    [email, password]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: result.rows[0]
  });
});

module.exports = router;
