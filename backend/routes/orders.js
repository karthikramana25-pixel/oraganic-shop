const router = require("express").Router();
const db = require("../db");

/*
Expected payload:
{
  "user_id": 1,
  "items": [
    { "product_id": 1, "quantity": 2 },
    { "product_id": 2, "quantity": 1 }
  ]
}
*/

router.post("/", async (req, res) => {
  const { user_id, items } = req.body;

  try {
    let total = 0;

    // Calculate total
    for (const item of items) {
      const product = await db.query(
        "SELECT price FROM products WHERE id=$1",
        [item.product_id]
      );
      total += product.rows[0].price * item.quantity;
    }

    // Create order
    const order = await db.query(
      "INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING id",
      [user_id, total]
    );

    const orderId = order.rows[0].id;

    // Insert order items
    for (const item of items) {
      const product = await db.query(
        "SELECT price FROM products WHERE id=$1",
        [item.product_id]
      );

      await db.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, product.rows[0].price]
      );
    }

    res.json({
      message: "Order placed successfully",
      order_id: orderId,
      total_amount: total
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

module.exports = router;
