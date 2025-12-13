const mysql = require("mysql2");
require("dotenv").config();

const urlDB = 
`mysql://${process.env.MYSQLUSER}:
${process.env.MYSQLPASSWORD}
@${process.envMYSQLHOST}:
${process.env.MYSQLPORT}/
${process.env.MYSQLDATABASE}`

const db = mysql.createConnection(urlDB);

db.connect((err) => {
    if (err) {
        console.log("DB Error:", err);
        return;
    }
    console.log("MySQL Connected!");
});

module.exports = db;