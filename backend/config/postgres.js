// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "digital_diner",
//   password: "Shankarcricket@7", // ← must be a string!
//   port: 5432,
// });

// module.exports = pool;

require("dotenv").config();
const { Pool } = require("pg");
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

module.exports = pool;
