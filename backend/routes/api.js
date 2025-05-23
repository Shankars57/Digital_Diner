const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const { createOrder, getOrdersByPhone } = require("../models/Order");

// GET /menu (from MongoDB)
router.get("/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    console.error("❌ Menu fetch error:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch menu", error: err.message });
  }
});

// POST /orders
router.post("/orders", async (req, res) => {
  try {
    const { customerName, phoneNumber, email, address, items, total } =
      req.body;
    console.log("📦 Incoming order data:", req.body);

    // Basic validation
    if (
      !customerName ||
      !phoneNumber ||
      !Array.isArray(items) ||
      items.length === 0 ||
      isNaN(total)
    ) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const orderId = await createOrder({
      customerName,
      phoneNumber,
      email,
      address,
      items,
      total,
    });

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (err) {
    res.status(500).json({
      message: "Order submission failed",
      error: err.message,
      detail: err.detail || "No detail provided",
      stack: err.stack,
    });
  }
});

// GET /orders/:phone
router.get("/orders/:phone", async (req, res) => {
  const phone = req.params.phone;

  try {
    const orders = await getOrdersByPhone(phone);
    res.json({
      success: true,
      message: "Successfully Fetched",
      orders: orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order history",
      error: err.message,
      detail: err.detail || "No detail provided",
    });
  }
});

module.exports = router;
