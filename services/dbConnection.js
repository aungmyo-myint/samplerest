const mysql = require('mysql');


const dbConnection = mysql.createConnection({
 host: "localhost" || process.env.host,
 user: "root" || process.env.db_name,
 password: "" || process.env.db_pswd,
 database: "testapp" || process.env.db,
});



dbConnection.connect();

module.exports = dbConnection;