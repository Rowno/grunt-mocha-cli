'use strict';

var fs = require('fs');
var grunt = require('grunt');
var path = require('path');

var BOOL_OPTIONS = [
    'async-only',
    'bail',
    'check-leaks',
    'colors',
    'debug-brk',
    'debug',
    'delay',
    'expose-gc',
    'gc-global',
    'growl',
    'harmony_arrow_functions',
    'harmony_proxies',
    'harmony_shipping',
    'harmony-collections',
    'harmony-generators',
    'harmony-proxies',
    'harmony',
    'inline-diffs',
    'invert',
    'no-colors',
    'no-deprecation',
    'no-exit',
    'no-timeouts',
    'prof',
    'recursive',
    'sort',
    'throw-deprecation',
    'trace-deprecation',
    'trace'
];
var STRING_OPTIONS = [
    'fgrep',
    'grep',
    'opts',
    'reporter',
    'slow',
    'timeout',
    'ui'
];
var ARRAY_OPTIONS = [
    'compilers',
    'globals'
];


module.exports = function (options, callback) {
    var args = [];
    var spawnOptions = {
        opts: {
            env: process.env
        }
    };

    spawnOptions.cmd = require.resolve('mocha');
    spawnOptions.cmd = path.dirname(spawnOptions.cmd);
    spawnOptions.cmd += '/../.bin/mocha';

    if (process.platform === 'win32') {
        spawnOptions.cmd += '.cmd';
    }

    if (!options.quiet && !options.save) {
        // Redirect the Mocha output directly to the terminal to maintain colors
        spawnOptions.opts.stdio = 'inherit';
    }

    if (options.env) {
        Object.keys(options.env).forEach(function (property) {
            spawnOptions.opts.env[property] = options.env[property];
        });
    }

    if (options.ndebug) {
        args.push('debug');
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

    if (options.reporter && options['reporter-options']) {
        var reportOptionsAsString = [];
        for (var prop in options['reporter-options']) {
            if (options['reporter-options'].hasOwnProperty(prop)) {
                reportOptionsAsString.push(
                    prop + '=' + options['reporter-options'][prop]
                );
            }
        }
        if (reportOptionsAsString.length > 0) {
            args.push('--reporter-options');
            args.push(reportOptionsAsString.join(','));
        }
    }

    if (options.files) {
        args = args.concat(options.files);
    }

    if (options.filesRaw) {
        args = args.concat(options.filesRaw);
    }

    spawnOptions.args = args;

    grunt.util.spawn(spawnOptions, function (error, output) {
        if (options.save) {
            fs.writeFileSync(options.save, output.stdout);
        }

        callback(error, output.stdout + output.stderr);
    });
};
