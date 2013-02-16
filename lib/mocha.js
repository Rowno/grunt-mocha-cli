'use strict';

var grunt = require('grunt');

var BOOL_OPTIONS = [
    'invert',
    'watch',
    'colors',
    'no-colors',
    'growl',
    'debug',
    'bail',
    'recursive',
    'debug-brk',
    'ignore-leaks'
];
var VALUE_OPTIONS = [
    'reporter',
    'ui',
    'grep',
    'timeout',
    'slow'
];
var ARRAY_OPTIONS = [
    'globals',
    'compilers'
];


module.exports = function (options, callback) {
    var args = [];

    BOOL_OPTIONS.forEach(function (option) {
        if (options[option]) {
            args.push('--' + option);
        }
    });

    VALUE_OPTIONS.forEach(function (option) {
        if (options[option]) {
            args.push('--' + option);
            args.push(options[option]);
        }
    });

    ARRAY_OPTIONS.forEach(function (option) {
        if (Array.isArray(options[option])) {
            args.push('--' + option);
            args.push(options[option].join(','));
        }
    });

    if (Array.isArray(options.require)) {
        options.require.forEach(function (module) {
            args.push('--require');
            args.push(module);
        });
    }

    if (Array.isArray(options.files)) {
        options.files.forEach(function (glob) {
            args = args.concat(grunt.file.expand(glob));
        });
    }

    grunt.util.spawn({
        cmd: __dirname + '/../node_modules/.bin/mocha',
        args: args,
        opts: {stdio: 'inherit'}
    }, function (error, result, code) {
        callback(error, result, code);
    });
};
