# Grunt Mocha CLI

[![Build Status](https://api.travis-ci.org/Rowno/grunt-mocha-cli.svg?branch=master)](https://travis-ci.org/Rowno/grunt-mocha-cli)
[![Build Status](https://ci.appveyor.com/api/projects/status/d8owof7rmt7h3ka8/branch/master?svg=true)](https://ci.appveyor.com/project/Rowno/grunt-mocha-cli)
[![Dependency Status](https://david-dm.org/Rowno/grunt-mocha-cli.svg)](https://david-dm.org/Rowno/grunt-mocha-cli)

Run [Mocha][] server-side tests in [Grunt][].

## Getting Started

If you haven't used [Grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a Gruntfile as well as install and use Grunt plugins. You can install this plugin with this command:

```bash
npm install grunt-mocha-cli --save-dev
```

## Usage

### Options

All of the Mocha command line options are supported, plus some extras.

The list of test files to run can be specified using either the standard Grunt format or by using the `files` option. If neither is specified, the Mocha default will be used (`test/*.js`).

**Warning:** If you have a large number of test files, you should use the `filesRaw` option and _not_ the standard Grunt format or the `files` option. Otherwise you risk hitting the operating system command line length limit.

#### Mocha Options

- `allow-uncaught` (boolean) - enable uncaught errors to propagate.
- `async-only` (boolean) - force all tests to take a callback (async).
- `bail` (boolean) - bail after first test failure.
- `check-leaks` (boolean) - check for global variable leaks.
- `colors` (boolean) - force enabling of colors.
- `delay` (boolean) - wait for async suite definition.
- `exit` (boolean) - force shutdown of the event loop after test run: mocha will call process.exit.
- `fgrep` (string) - only run tests containing <string>.
- `forbid-only` (boolean) - causes test marked with only to fail the suite.
- `forbid-pending` (boolean) - causes pending tests and test marked with skip to fail the suite.
- `full-trace` (boolean) - display the full stack trace.
- `globals` (array) - allow the given comma-delimited global names.
- `grep` (string) - only run tests matching <pattern>.
- `growl` (boolean) - enable growl notification support.
- `inline-diffs` (boolean) - display actual/expected differences inline within each string.
- `invert` (boolean) - inverts `grep` and `fgrep` matches.
- `log-timer-events` (boolean) - time events including external callbacks.
- `no-colors` (boolean) - force disabling of colors.
- `no-deprecation` (boolean) - silence deprecation warnings.
- `no-diff` (boolean) - do not show a diff on failure.
- `no-timeouts` (boolean) - disables timeouts.
- `opts` (string) - specify opts path.
- `perf-basic-prof` (boolean) - enable perf linux profiler (basic support).
- `recursive` (boolean) - include sub directories.
- `reporter` (string) - specify the reporter to use.
- `reporter-options` (object) - specify the reporter options for some specific reporter, for example '{output: /tmp/out}' for 'xunit'.
- `require` (array) - require the given modules.
- `retries` (integer) - set number of times to retry a failed test case.
- `slow` (integer) - "slow" test threshold in milliseconds [75].
- `sort` (boolean) - sort test files.
- `throw-deprecation` (boolean) - throw an exception anytime a deprecated function is used.
- `timeout` (integer) - set test-case timeout in milliseconds [2000].
- `trace-deprecation` (boolean) - show stack traces on deprecations.
- `trace` (boolean) - trace function calls.
- `ui` (string) - specify user-interface (bdd|tdd|exports).
- `use_strict` (boolean) - enforce strict mode.

#### Extras

- `env` (object) - hash of additional environment variables to pass to the Mocha process.
- `files` (array) - globs of test files to run.
- `filesRaw` (array) - globs of test files to run. These globs are passed directly to Mocha and aren't expanded by Grunt first.
- `flags` (array) - set arbitrary node/mocha flags.
- `force` (boolean) - continue running Grunt tasks even if tests fail.
- `quiet` (boolean) - disable printing of Mocha's output to the terminal.
- `save` (string) - write the mocha output to a file.

### Examples

Define test files using the standard Grunt format:

```javascript
grunt.initConfig({
  mochacli: {
    options: {
      require: ['should'],
      reporter: 'nyan',
      bail: true
    },
    all: ['test/*.js']
  }
})
grunt.loadNpmTasks('grunt-mocha-cli')
grunt.registerTask('test', ['mochacli'])
```

Define test files and basic options once, then customise options per target:

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
})
grunt.loadNpmTasks('grunt-mocha-cli')
grunt.registerTask('test', ['mochacli:spec'])
```

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## License

Grunt Mocha CLI is released under the MIT license.

Copyright © 2013 Roland Warmerdam.

[mocha]: https://mochajs.org/
[grunt]: https://gruntjs.com/
[getting started]: https://gruntjs.com/getting-started
