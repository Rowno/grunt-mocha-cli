'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            all: {
                src: [__dirname + '/pass*.js'],
                filter: function (file) {
                    console.log('filter called with: ' + file);
                    return (/pass2.js/).test(file);
                }
            }
        }
    });

    grunt.loadTasks(__dirname + '/../../tasks');

    grunt.registerTask('default', 'mochacli');
};
