'use strict';

var mocha = require('../lib/mocha');


module.exports = function (grunt) {
    grunt.registerMultiTask('mochacli', 'Run Mocha server-side tests.', function () {
        var options = this.options();
        if (!options.files) {
            options.files = this.file.srcRaw;
        }

        mocha(options, this.async());
    });
};
