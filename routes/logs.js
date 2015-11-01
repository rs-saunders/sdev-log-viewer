'use strict';

var express = require('express');
var router = express.Router();

var logs = require('../models/logs');
var logger = require('../lib/logger');

router.route('/')
    .get(function(request, response){
        logs.getLogFolderList(function(error, files) {

            if(error) {
                logger.error(error);
                response.sendStatus(500);
            }

            response.json(files);
        });
    });

module.exports = router;