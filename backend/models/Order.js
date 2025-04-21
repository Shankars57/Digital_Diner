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

    const query = `
      INSERT INTO orders (customer_name, phone_number, email, address, items, total)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;

    const values = [
      customerName,
      phoneNumber,
      email || null,
      JSON.stringify(address || {}),
      JSON.stringify(items || []),
      total,
    ];

    console.log("📝 Executing INSERT with values:", values);

    const result = await client.query(query, values);
    await client.query("COMMIT");

    return result.rows[0].id;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error inserting order:", {
      message: err.message,
      detail: err.detail,
      hint: err.hint,
      stack: err.stack,
    });
    throw err;
  } finally {
    client.release();
  }
}

async function getOrdersByPhone(phoneNumber) {
  try {
    const result = await pool.query(
      `SELECT * FROM orders WHERE phone_number = $1 ORDER BY created_at DESC`,
      [phoneNumber]
    );
    return result.rows;
  } catch (err) {
    console.error("❌ Error fetching orders:", {
      message: err.message,
      detail: err.detail,
      stack: err.stack,
    });
    throw err;
  }
}

module.exports = {
  createOrder,
  getOrdersByPhone,
};
