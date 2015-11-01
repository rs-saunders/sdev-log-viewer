'use strict';

var winston = require('winston');

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'debug',
            filename: __dirname + '/../logs/app.log',
            handleExceptions: true,
            json: false,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});