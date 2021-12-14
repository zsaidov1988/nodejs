const Pool = require('pg');
const pool = new Pool({
  user: "postgres",
  password: "zuamfiadra",
  host: "localhost",
  port: 5432,
  database: "library"
});

module.exports = pool;