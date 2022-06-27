const mysql = require("mysql2");
const connection = mysql.createConnection({
  host:'127.0.0.1', // Replace with your host name
  port:"3306",
  user: 'root',      // Replace with your database username
  password: 'password',      // Replace with your database password
  database: 'demo' // // Replace with your database Name
}); 
 
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
module.exports = connection;