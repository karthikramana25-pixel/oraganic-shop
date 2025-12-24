const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  let total = 0;

  for (const item of items) {
    const product = await db.query(
      "SELECT price FROM products WHERE id=$1",
      [item.product_id]
    );
    total += product.rows[0].price * item.quantity;
  }

  const order = await db.query(
    "INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING id",
    [userId, total]
  );

  res.json({
    message: "Order placed",
    orderId: order.rows[0].id
  });
});

module.exports = router;
