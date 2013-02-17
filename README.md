# Grunt Mocha CLI [![Build Status](https://secure.travis-ci.org/Rowno/grunt-mocha-cli.png?branch=master)](http://travis-ci.org/Rowno/grunt-mocha-cli)

Run Mocha server-side tests in Grunt.


Usage
-----

### Options ###
All of the Mocha command line options are supported, plus some extras.

The list of test files to run can be specified using either the standard Grunt format or by using the `files` option. If neither is specified, the Mocha default will be used (`test/*.js`).

#### Mocha Options ####
 * `invert` (boolean) - inverts `grep` matches.
 * `colors` (boolean) - force enabling of colors.
 * `no-colors` (boolean) - force disabling of colors.
 * `growl` (boolean) - enable growl notification support.
 * `debug` (boolean) - enable node's debugger, synonym for node --debug.
 * `bail` (boolean) - bail after first test failure.
 * `recursive` (boolean) - include sub directories.
 * `debug-brk` (boolean) - enable node's debugger breaking on the first line.
 * `ignore-leaks` (boolean) - ignore global variable leaks.
 * `reporter` (string) - specify the reporter to use.
 * `ui` (string) - specify user-interface (bdd|tdd|exports).
 * `grep` (string) - only run tests matching pattern.
 * `timeout` (string) - set test-case timeout in milliseconds [2000].
 * `slow` (string) - "slow" test threshold in milliseconds [75].
 * `globals` (array) - allow the given comma-delimited global names.
 * `compilers` (array) - use the given module(s) to compile files.

#### Extras ####
 * `quiet` (boolean) - suppress printing of the Mocha output to the terminal.
 * `files` (string|array) - glob(s) of test files to run.

### Examples ###

```javascript
grunt.initConfig({
    mochacli: {
        all: {
            options: {
                require: ['should'],
                reporter: 'nyan',
                bail: true
            },
            src: 'test/*.js'
        }
    }
});

grunt.registerTask('test', ['mochacli']);
```

```javascript
grunt.initConfig({
    mochacli: {
        options: {
            require: ['should'],
            files: 'test/*.js'
        },
        spec: {
            options: {
                reporter: 'spec'
            }
        },
        nyan: {
            options: {
                reporter: 'nyan'
            }
        }
    }
});

grunt.registerTask('test', ['mochacli:spec']);
```


License
-------
Grunt Mocha CLI is released under the MIT license.

Copyright © 2013 Roland Warmerdam.
