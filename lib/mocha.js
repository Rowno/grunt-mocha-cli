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
    function tryRequire(module) {
        try {
            return require(module);
        } catch (e) {
            return null;
        }
    }

    function binpath(module, executable) {
        var binext = (process.platform === 'win32' ? '.cmd' : '');
        var moddir;
        try {
            moddir = path.dirname(require.resolve(module));
        } catch (e) {
            return null;
        }
        var exepath = path.join(moddir, '..', '.bin', executable + binext);
        if (!grunt.file.exists(exepath) && which) {
            // Check global install location instead
            exepath = which.sync(executable);
        }
        return exepath;
    }

    var args = [];
    var spawnOptions = {
        opts: {
            env: process.env
        }
    };

    var which = tryRequire('which');
    var inspector = tryRequire('node-inspector');

    if (options.inspector) {
        spawnOptions.cmd = binpath('node-inspector', 'node-debug');
        if (!inspector || !spawnOptions.cmd) {
            grunt.fail.warn('Using the inspector option requires all optional dependencies to be installed');
        }
        args.push(binpath('mocha', '_mocha'));
    } else {
        spawnOptions.cmd = binpath('mocha', 'mocha');
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
