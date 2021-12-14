const envVar = require('../config/index');
const pg = require('pg');
const pool = new pg.Pool({
  user: envVar.USER_POSTGRES,
  password: envVar.PASSWORD_POSTGRESS,
  host: envVar.HOST_POSTGRES,
  port: 5432,
  database: envVar.DATABASE_POSTGRES
});

module.exports = pool;