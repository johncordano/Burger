// Set up the MySQL connection.
var mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "0673Cord",
  database: "burgers_db"
  });
};


// Make a connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
// Export the connection for the ORM to use.
module.exports = connection;