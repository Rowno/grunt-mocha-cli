'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '.jshintrc',
                'package.json',
                '**/*.js',
                '!node_modules/**/*'
            ]
        },
        nodeunit: {
            all: ['test/*.js']
        }
    });


    grunt.registerTask('test', ['jshint', 'nodeunit']);
    grunt.registerTask('default', 'test');
};
