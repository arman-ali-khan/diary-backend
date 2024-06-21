const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'armanblog',
  password: '@Samrat726728',
  database: 'armanblog'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
