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
    'growl',
    'inline-diffs',
    'invert',
    'no-colors',
    'no-deprecation',
    'no-exit',
    'no-timeouts',
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
    'retries',
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
            env: process.env // eslint-disable-line no-process-env
        }
    };
    var reportOptionsAsString = [];
    var i;

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

    if (Array.isArray(options.flags)) {
        args = args.concat(options.flags);
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
        options.require.forEach(function (requireModule) {
            args.push('--require');
            args.push(requireModule);
        });
    }

    if (options.reporter && options['reporter-options']) {
        for (i in options['reporter-options']) {
            if (options['reporter-options'].hasOwnProperty(i)) {
                reportOptionsAsString.push(
                    i + '=' + options['reporter-options'][i]
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
