//Pool is a class in pg(node-postgres module) that acts like a management hub
const { Pool } = require('pg');

const pool = new Pool({
  //Critical data is extracted via .env file
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;