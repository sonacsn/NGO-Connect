var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var multer= require('multer');
var upload = multer(); // for parsing multipart/form-data
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');

var mysql = require('mysql');
var ipaddress = '127.0.0.1';
var port = 4000;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));


// Connection String
var pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : 'rahul',
    database        : 'ngo_connect'
});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var mySQL=require("./public/Project/server/app")(app,pool);

app.listen(port, ipaddress);


/*

var multer= require('multer');
var upload = multer(); // for parsing multipart/form-data

var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var passport      = require('passport');
var connectionString = 'mongodb://127.0.0.1:27017/cs5610';


//connect to the database
var db = mongoose.connect(connectionString);

//multer();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
*/
