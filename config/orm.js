// Import the MySQL connection.
var connection = require("../config/connection.js"); 
// Use the printQuestionMarks helper function to loop through and create an array of question marks and turn it into a string. For example, to pass 3 values into the mySQL query, 3 question marks are needed to write the query.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
// Use the objToSql helper function to convert object key/value pairs to SQL syntax.
function objToSql(ob) {
  var arr = [];
  // Loop through the keys and push the key/value as a string int array.
  for (var key in ob) {
    var value = ob[key];
    // Check to skip hidden properties.
    if (Object.hasOwnProperty.call(ob, key)) {
      // If the string with spaces, add quotations (Bacon Cheese Burger => 'Bacon Cheese Burger').
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // For example, {burger_name: 'Bacon Cheese Burger'} => ["burger_name='Bacon Cheese Burger'"]
      // For example, {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }
  // Translate the array of strings to a single comma-separated string.
  return arr.toString();
}
// Create the object for each of the SQL statement functions.
var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    console.log("insertOne:", queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // An example of objColVals is {burger_name: Bacon Cheese Burger, devoured: true}
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    console.log("updateOne:", queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};
// Export the orm object for the model (burger.js).
module.exports = orm;