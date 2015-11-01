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

describe('Requests to the /logs/notFound.log path', function() {

    it('Returns a 404 status code', function (done) {

        request(app)
            .get('/logs/notFound.log')
            .expect(404, done);

    });
});

describe('Requests to the /logs/app.log path', function() {

    it('Returns a 200 status code', function (done) {

        request(app)
            .get('/logs/app.log')
            .expect(200, done);

    });

    it('Returns text format', function(done) {

        request(app)
            .get('/logs/app.log')
            .expect('Content-Type', /text/, done);
    });

    it('Returns last 10 log entries (default)', function(done) {

        request(app)
            .get('/logs/app.log')
            .expect(
                "app log line 6\n" +
                "app log line 7\n" +
                "app log line 8\n" +
                "app log line 9\n" +
                "app log line 10\n" +
                "app log line 11\n" +
                "app log line 12\n" +
                "app log line 13\n" +
                "app log line 14\n" +
                "app log line 15",
            done);

    });

    it('Returns last 2 log entries', function(done) {

        request(app)
            .get('/logs/app.log?n=2')
            .expect(
                "app log line 14\n" +
                "app log line 15",
            done);
    });
});