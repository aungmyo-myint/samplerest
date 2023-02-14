const mysql = require('mysql');


const dbConnection = mysql.createConnection({
 host: "localhost" || process.env.ps_host,
 user: "root" || process.env.ps_name,
 password: "" || process.env.ps_pswd,
 database: "testapp" || process.env.ps_db,
});

dbConnection.connect(err=> console.log(err) );

module.exports = dbConnection;