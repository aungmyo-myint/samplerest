const mysql = require('mysql');


const dbConnection = mysql.createConnection({
 host: "localhost" || process.env.CLEARDB_DATABASE_URL,
 user: "root" || process.env.db_name,
 password: "" || process.env.db_pswd,
 database: "testapp",
});



dbConnection.connect();

module.exports = dbConnection;