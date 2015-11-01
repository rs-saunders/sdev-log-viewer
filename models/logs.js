'use strict';

var fs = require('fs');
var sf = require('slice-file');
var q = require('q');
/**
 * returns the log folder to monitor
 *
 * @returns {string}
 */
var getLogFolder = function() {

    //tests environment
    if(process.env.NODE_ENV === 'test') {
        return __dirname + '/../tests/logs';
    }

    //folder passed in as a command argument
    //e.g. npm start -- /var/log/apache2
    if(process.argv[2]) {
        return process.argv[2];
    }

    //default to using own log directory
    return __dirname + '/../logs';
};

var logFolder = getLogFolder();

/**
 * Reads the log directory for list of log files
 * @return promise
 */
module.exports.getLogFolderList = function() {

    var deferred = q.defer();

    fs.readdir(logFolder, function (error, files) {
        if (error) {
            deferred.reject(error);
        }

        var fileList = files.map(function (file) {
            return file;
        }).filter(function (file) {
            return fs.statSync(logFolder + '/' + file).isFile() && file.split('.').pop() == 'log';
        });

        deferred.resolve(fileList);
    });

    return deferred.promise;
};

/**
 * Tails the last nLines of the specified file
 * piping them to the write stream
 *
 * @param {String} file, path of the file to tail
 * @param {number} nLines, number of lines to return
 * @param {stream} writeStream , stream to pipe the lines to e.g. response
 */
module.exports.tailFile = function(file, nLines, writeStream) {
    var fs = sf(logFolder + '/' + file);
    fs.slice(-Math.abs(nLines)).pipe(writeStream);
};