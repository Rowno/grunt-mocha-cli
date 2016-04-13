'use strict';

var mocha = require('../lib/mocha');


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

        // Don't run mocha if there are no test files
        if (options.files.length === 0 &&
            // Check for files matched by filesRaw or the mocha default
            grunt.file.expand(options.filesRaw || 'test/*.js').length === 0) {

            done();
            return;
        }

        mocha(options, function (error) {
            done(options.force ? true : error);
        });

        return;
    });
};
