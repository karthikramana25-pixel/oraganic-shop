const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { user_id, total_amount } = req.body;
  const order = await db.query(
    "INSERT INTO orders (user_id, total_amount) VALUES ($1,$2) RETURNING id",
    [user_id, total_amount]
  );
  res.json({ orderId: order.rows[0].id });
});

module.exports = router;
