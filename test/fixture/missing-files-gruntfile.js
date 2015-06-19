'use strict';

var path = require('path');


module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            notfound: [path.resolve(__dirname, '__notfound.js')],
            filesraw: {
                options: {
                    filesRaw: [path.resolve(__dirname, 'pass.js')]
                }
            }
        }
    });

    grunt.loadTasks(path.resolve(__dirname, '../../tasks'));

    grunt.registerTask('default', 'mochacli');
};
