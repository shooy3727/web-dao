const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.P_HOST,
    port: process.env.P_PORT,
    user: process.env.P_USER,
    password: process.env.P_PASSW,
    database: process.env.P_DBASE
});

module.exports = pool;