const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const pool = require("./config/postgres"); // PostgreSQL connection pool
require("dotenv").config(); // for environment variables

const app = express();

// CORS setup (can be customized)
app.use(cors());

app.use(
  cors({
    origin: "*", // or '*' for all origins (not recommended for production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false, // if you're using cookies/sessions
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Digital Diner API!");
});
// 🌐 POST /api/orders
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

// 🌐 GET /api/orders/:phone
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

// ✅ Connect to MongoDB (use local or from .env)
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://shankar:admin@cluster0.liimvo6.mongodb.net/";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
pool
  .connect()
  .then((client) => {
    console.log("🐘 PostgreSQL pool connected successfully!");
    client.release(); // always release after check
  })
  .catch((err) => {
    console.error("❌ PostgreSQL pool connection failed:", err.message);
  });
// 👇 Add other routes if needed
app.use("/api", apiRoutes);

// ✅ PORT handling for Render (default: 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
