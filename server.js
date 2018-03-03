// Create variables for npm packages that provide the server with additional functionality.
var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;
var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// Parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json.
app.use(bodyParser.json());
// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Import routes and give the server access to them.
var routes = require("./controllers/burgers.js");
app.use(routes);
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});