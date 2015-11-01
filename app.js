'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
    response.sendfile('public/index.html');
});

var logRoute = require('./routes/log');
app.use('/log', logRoute);

module.exports = app;
