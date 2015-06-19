'use strict';

var path = require('path');


module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            options: {
                force: true
            },
            all: [path.resolve(__dirname, 'fail.js')]
        }
    });

    grunt.loadTasks(path.resolve(__dirname, '../../tasks'));

    grunt.registerTask('default', 'mochacli');
};
