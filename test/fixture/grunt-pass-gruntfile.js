'use strict';

var path = require('path');


module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            all: [path.resolve(__dirname, 'pass.js')]
        }
    });

    grunt.loadTasks(path.resolve(__dirname, '../../tasks'));

    grunt.registerTask('default', 'mochacli');
};
