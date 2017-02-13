var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require("mongoose");
var Promise = require("bluebird");

mongoose.Promise = Promise;

var app = express();

// Use morgan and body parser with our app
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, '/public')));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/scraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


require("./routes/routes.js")(app);

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
