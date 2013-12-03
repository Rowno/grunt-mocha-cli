'use strict';

var mocha = require('../lib/mocha');


module.exports = function (grunt) {
    grunt.registerMultiTask('mochacli', 'Run Mocha server-side tests.', function () {
        var done = this.async();
        var options = this.options();

        // Use the Grunt files format if the `files` option isn't set
        if (!options.files) {
            options.files = this.filesSrc;
        }

        mocha(options, function (error) {
            done(options.force ? true : error);
        });
    });
};
