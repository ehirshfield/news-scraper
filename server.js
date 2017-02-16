var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require("mongoose");
var Promise = require("bluebird");

mongoose.Promise = Promise;

var PORT = 3000;

var app = express();

// Use morgan and body parser with our app
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, '/public')));

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
               replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_6ql27mx9:fqo5abimhif9bdpf69qbeeov1k@ds153729.mlab.com:53729/heroku_6ql27mx9", options);
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

app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
