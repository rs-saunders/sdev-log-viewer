'use strict';

var fs = require('fs');

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
 * @param callback
 */
module.exports.getLogFolderList = function(callback) {

    fs.readdir(logFolder, function (error, files) {
        if (error) {
            callback(error, []);
        }

        var fileList = files.map(function (file) {
            return file;
        }).filter(function (file) {
            return fs.statSync(logFolder + '/' + file).isFile() && file.split('.').pop() == 'log';
        });

        callback(null, fileList);
    });
};

