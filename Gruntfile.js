'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        eslint: {
            all: [
                '**/*.js',
                '!node_modules/**/*'
            ]
        },
        nodeunit: {
            all: ['test/*.js']
        }
    });


    grunt.registerTask('test', ['nodeunit', 'eslint']);
    grunt.registerTask('default', 'test');
};
