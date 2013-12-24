'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            options: {
                harmony: true
            },
            all: [__dirname + '/proxy.js']
        }
    });

    grunt.loadTasks(__dirname + '/../../tasks');

    grunt.registerTask('default', 'mochacli');
};

