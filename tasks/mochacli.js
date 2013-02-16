'use strict';

var mocha = require('../lib/mocha');


module.exports = function (grunt) {
    grunt.registerMultiTask('mochacli', 'Run Mocha server-side tests', function () {
        mocha(this.options(), this.async());
    });
};
