const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "digital_diner",
  password: "Shankarcricket@7", // ← must be a string!
  port: 5432,
});

module.exports = pool;
