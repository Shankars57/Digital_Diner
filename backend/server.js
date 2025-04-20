const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const pool = require("./config/postgres"); // your PostgreSQL connection pool

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/orders", async (req, res) => {
  const { customerName, phoneNumber, email, address, items, total } = req.body;

  console.log("Incoming Order:", req.body);

  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");

    const query = `
      INSERT INTO orders (customer_name, phone_number, email, address, items, total)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      customerName,
      phoneNumber,
      email,
      JSON.stringify(address),
      JSON.stringify(items),
      total,
    ];

    const result = await client.query(query, values);
    console.log("✅ Order inserted:", result.rows[0]);

    client.release();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("❌ PostgreSQL insert error:", err);
    res
      .status(500)
      .json({ error: "Failed to place order", detail: err.message });
  }
});

app.get("/api/orders/:phone", async (req, res) => {
  const { phone } = req.params;
  console.log("📞 Fetching orders for phone number:", phone);

  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");

    const result = await client.query(
      "SELECT * FROM orders WHERE phone_number = $1",
      [phone]
    );

    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json([]);
    }

    const orders = result.rows.map((order) => ({
      ...order,
      items:
        typeof order.items === "string" ? JSON.parse(order.items) : order.items,
    }));

    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch orders", detail: err.message });
  }
});

mongoose
  .connect("mongodb://localhost:27017/digital-diner")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api", apiRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
