'use strict';

var mocha = require('../lib/mocha');

var _filesExist = function(files) {
    return (
        (files instanceof Array && files.length > 0) ||
        (files instanceof String && files.length > 0)
    );
};

module.exports = function (grunt) {
    grunt.registerMultiTask('mochacli', 'Run Mocha server-side tests.', function () {
        var done = this.async();
        var options = this.options();

        // Use the Grunt files format if the `files` option isn't set
        if (Array.isArray(options.files)) {
            options.files = grunt.file.expand(options.files);
        } else {
            options.files = this.filesSrc;
        }

        // Don't run mocha if there isn't any file specified
        if (_filesExist(options.files)) {
            mocha(options, function (error) {
                done(options.force ? true : error);
            });
        } else {
            done(true);
        }
    });
};
