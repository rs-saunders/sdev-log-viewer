'use strict';

var express = require('express');

var router = express.Router();

router.route('/')
    .get(function(request, response){
        response.json(['app.log', 'access.log', 'error.log']);
    });

module.exports = router;