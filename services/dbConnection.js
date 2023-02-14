const mysql = require('mysql2');

const dbConnection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

// // const dbConnection = mysql.createConnection({
// //  host: "localhost" || process.env.ps_host,
// //  user: "root" || process.env.ps_name,
// //  password: "" || process.env.ps_pswd,
// //  database: "testapp" || process.env.ps_db,
// //  ssl: {}
// // });

// dbConnection.connect(err=> console.log(err) );

module.exports = dbConnection;