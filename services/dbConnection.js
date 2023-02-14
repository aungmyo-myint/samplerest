const mysql = require('mysql2');

const dbURL = 'mysql://root:@localhost:3306/testapp'
const dbConnection = mysql.createConnection(dbURL || process.env.DATABASE_URL)
console.log('Connected to db!')

dbConnection.connect(err => {  if(err) console.log(err) } );

module.exports = dbConnection;