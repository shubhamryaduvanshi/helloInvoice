const mysql = require("mysql");

const dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "helloinvoice"
})

dbConn.connect(err => {
    if (err) throw new Error("Error while connecting database.");
    console.log("Connection established.");
})

module.exports = dbConn;
