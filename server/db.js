const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

const pool = new Pool(process.env.DATABASE_URL ? poolConfig : {});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};