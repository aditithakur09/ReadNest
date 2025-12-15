const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("connection", () => {
    console.log("MySQL Pool Connected");
});

pool.on("error", (err) => {
    console.log("MySQL Pool Error:", err);
});

module.exports = pool;