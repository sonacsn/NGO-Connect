var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var multer= require('multer');
var upload = multer(); // for parsing multipart/form-data


var ipaddress = '127.0.0.1';
var port = 3000;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));

var mySQL=require("./public/server/app")(app);

app.listen(port, ipaddress);