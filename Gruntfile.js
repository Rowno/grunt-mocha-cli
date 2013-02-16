'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '.jshintrc',
                'package.json',
                '**/*.js',
                '!node_modules/**/*'
            ]
        },
        mochacli: {
            options: {
                require: ['should']
            },
            all: {
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint', 'mochacli']);
    grunt.registerTask('default', 'test');
};
