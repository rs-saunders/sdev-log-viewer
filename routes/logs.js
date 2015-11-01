'use strict';

var express = require('express');
var router = express.Router();

var logs = require('../models/logs');
var logger = require('../lib/logger');

router.route('/')
    .get(function(request, response){
        logs.getLogFolderList()
            .then(function(files) {
                response.json(files);
            })
            .catch(function(error) {
                logger.error(error);
                response.sendStatus(500);
            });
    });

router.route('/:file')
    .get(function(request, response){

        var file = request.params.file;
        var nLines = request.query.n || 10;

        logs.getLogFolderList()
            .then(function(files) {

                if(files.indexOf(file) === -1) {
                    response.sendStatus(404);

                } else {
                    response.setHeader('Content-Type', 'text/plain');
                    logs.tailFile(file, nLines, response);
                }
            })
            .catch(function(error) {
                logger.error(error);
                response.sendStatus(500);
            });
    });

module.exports = router;