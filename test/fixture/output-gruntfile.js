'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            options: {
                reporter: 'tap',
                output: __dirname + '/../out.txt'
            },
            all: [__dirname + '/pass.js']
        }
    });

    grunt.loadTasks(__dirname + '/../../tasks');

    grunt.registerTask('default', 'mochacli');
};
