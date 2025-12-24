const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});
