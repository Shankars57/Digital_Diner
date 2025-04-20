const pool = require("../config/postgres");

async function createOrder({
  customerName,
  phoneNumber,
  email,
  address,
  items,
  total,
}) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO orders (customer_name, phone_number, email, address, items, total)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        customerName,
        phoneNumber,
        email,
        JSON.stringify(address),
        JSON.stringify(items),
        total,
      ]
    );

    await client.query("COMMIT");
    return result.rows[0].id;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

const postOrder = async (req, res) => {
  try {
    console.log("📦 Incoming order data:", req.body); // log this!

    const { customerName, phoneNumber, email, address, items, total } =
      req.body;

    if (
      !customerName ||
      !phoneNumber ||
      !Array.isArray(items) ||
      items.length === 0
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
    console.error("❌ Order creation failed:", err);
    res
      .status(500)
      .json({ message: "Order submission failed", error: err.message });
  }
};

// Get orders by phone number (for order history)
async function getOrdersByPhone(phoneNumber) {
  const result = await pool.query(
    `SELECT * FROM orders WHERE phone_number = $1 ORDER BY created_at DESC`,
    [phoneNumber]
  );
  return result.rows;
}

module.exports = {
  createOrder,
  getOrdersByPhone,
  postOrder
};
