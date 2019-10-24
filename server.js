var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');
var config = require('./config');

// Setting express
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

// start express server 
var server = app.listen(8080, function(){
    console.log("Express server has started on port 8080");
});

var router = require('./router/router')(app, request, config);
var ServiceKey = config.ServiceKey;

// Make tour database using tour API
MakeTourDatabase();

function MakeTourDatabase(){
    
}