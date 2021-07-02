const Pool = require("pg").Pool;

let connString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString : connString,
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;
