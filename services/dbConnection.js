const mysql = require('mysql2');

const dev_dbURL = 'mysql://root:@localhost:3306/testapp'

const dbConnection = mysql.createConnection(process.env.DATABASE_URL || dev_dbURL)
console.log('Connected to db!')

dbConnection.connect(err => {  if(err) console.log(err) } );

module.exports = dbConnection;