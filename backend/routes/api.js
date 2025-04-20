const express = require('express');
const router = express.Router();
const pool = require('../config/postgres'); // your PostgreSQL connection pool
const MenuItem = require('../models/MenuItem'); // MongoDB menu model

// GET menu (MongoDB)
router.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menu', error: err.message });
  }
});

// POST order (PostgreSQL)
router.post('/orders', async (req, res) => {
  const client = await pool.connect();
  try {
    const { customerName, phoneNumber, email, address, items, total } = req.body;

    if (!customerName || !phoneNumber || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    await client.query('BEGIN');
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
    await client.query('COMMIT');

    res.status(201).json({ message: 'Order placed', orderId: result.rows[0].id });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Order submission failed', error: err.message });
  } finally {
    client.release();
  }
});

// GET order history (PostgreSQL)
router.get('/orders/:phone', async (req, res) => {
  const client = await pool.connect();
  try {
    const phone = req.params.phone;
    const result = await client.query(
      'SELECT * FROM orders WHERE phone_number = $1 ORDER BY id DESC',
      [phone]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order history', error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
