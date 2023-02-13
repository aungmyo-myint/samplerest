const mysql = require('mysql');
const dbConnection = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "",
 database: "testapp",
});

dbConnection.connect();

module.exports = dbConnection;