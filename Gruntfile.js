'use strict';
var LoadGruntTasks = require('load-grunt-tasks');


module.exports = function (grunt) {
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

    LoadGruntTasks(grunt);
    grunt.registerTask('test', ['nodeunit', 'eslint']);
    grunt.registerTask('default', 'test');
};
