'use strict';

var path = require('path');


module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            options: {
                require: ['should']
            },
            all: [path.resolve(__dirname, 'require.js')]
        }
    });

    grunt.loadTasks(path.resolve(__dirname, '../../tasks'));

    grunt.registerTask('default', 'mochacli');
};
