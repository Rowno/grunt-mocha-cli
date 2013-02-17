'use strict';

var grunt = require('grunt');

var BOOL_OPTIONS = [
    'invert',
    'colors',
    'no-colors',
    'growl',
    'debug',
    'bail',
    'recursive',
    'debug-brk',
    'ignore-leaks'
];
var STRING_OPTIONS = [
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
    var spawnOptions = {
        cmd: __dirname + '/../node_modules/.bin/mocha'
    };

    if (!options.quiet) {
        spawnOptions.opts = {stdio: 'inherit'};
    }

    BOOL_OPTIONS.forEach(function (option) {
        if (options[option]) {
            args.push('--' + option);
        }
    });

    STRING_OPTIONS.forEach(function (option) {
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

    if (options.files) {
        args = args.concat(grunt.file.expand(options.files));
    }

    spawnOptions.args = args;

    grunt.util.spawn(spawnOptions, function (error, result, code) {
        callback(error, result, code);
    });
};
