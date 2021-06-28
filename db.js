const Pool = require("pg").Pool;

const pool = new Pool({
    user: "cjddhmbzgvpwaz",
    password: "22e0218f375d52fd5292f811793fdb147b798c79f992ec3540b874e16a54c01c",
    database: "ddd8oh051v39pn", 
    host: "ec2-54-224-120-186.compute-1.amazonaws.com",
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;
