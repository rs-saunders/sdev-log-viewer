'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var logger = require('./lib/logger');

var morgan = require('morgan');
app.use(morgan('combined', {stream: fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'})}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
    response.sendfile('public/index.html');
});

var logs = require('./routes/logs');
app.use('/logs', logs);

module.exports = app;
