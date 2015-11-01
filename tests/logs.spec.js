'use strict';

var request = require('supertest');
var app = require('../app');

describe('Requests to the /log path', function() {

    it('Returns a 200 status code', function (done) {

        request(app)
            .get('/logs')
            .expect(200, done);

    });

    it('Returns a JSON format', function(done) {

        request(app)
            .get('/logs')
            .expect('Content-Type', /json/, done);
    });

    it('Returns an array of log files', function(done) {

        request(app)
            .get('/logs')
            .expect([
                'access.log',
                'app.log'
            ], done);

    });
});