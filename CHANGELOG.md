# Changelog
All notable changes to this project will be documented in this file.
This project follows [Semantic Versioning](http://semver.org).

## 3.0.0 / 2016-11-07
 - change: drop support for node 0.10 and 0.12.
 - change: upgrade to mocha 3.1.2.

## 2.1.0 / 2016-04-14
 - change: update mocha and switch to caret semver range.

## 2.0.0 / 2015-10-20
 - add: flags option for setting arbitrary node/mocha flags.
 - remove: all node flag options except for the debug ones (use the flags option instead).
 - change: upgrade to Mocha 2.3.3.
 - change: exclude unneeded files from the npm package.
 - add: node 4 support.
 - remove: iojs support.
 - add: windows testing via appveyor.

## 1.14.0 / 2015-07-26
 - add: support for Mocha reporter-options.

## 1.13.1 / 2015-07-01
 - change: don't run mocha if there aren't any files.
 - change: upgrade the devDependencies.
 - remove: peerDependencies.
 - change: switch to eslint.

## 1.13.0 / 2015-04-01
 - change: upgrade to Mocha 2.2.1.
 - change: upgrade the devDependencies.

## 1.12.0 / 2015-01-09
 - change: upgrade to Mocha 2.1.0.
 - change: upgrade the devDependencies.

## 1.11.0 / 2014-11-09
 - change: upgrade to Mocha 2.0.1.
 - change: upgrade the devDependencies.

## 1.10.0 / 2014-08-24
 - change: upgrade to Mocha 1.21.4.
 - change: upgrade the devDependencies.

## 1.9.0 / 2014-06-14
 - change: upgrade to Mocha 1.20.1.
 - remove: Node 0.8 support.
 - add: Node 0.11 support.
 - add: `ndebug` option to use node's debugger (`node debug`).

## 1.8.0 / 2014-03-29
 - change: upgrade to Mocha 1.18.2.

## 1.7.0 / 2014-03-09
 - add: `filesRaw` option which passes globs directly to Mocha.
 - change: improve the unit tests.

## 1.6.0 / 2014-02-16
 - change: upgrade to Mocha 1.17.1.

## 1.5.0 / 2014-01-04
 - change: upgrade to Mocha 1.16.2.
 - add: support for specifying node options.

## 1.4.0 / 2013-12-08
 - change: upgrade to Mocha 1.15.0.
 - add: `save` option which writes the Mocha output to a file.
 - fix: use `this.filesSrc` so that Grunt filters can be used.

## 1.3.0 / 2013-09-29
 - change: update Mocha to version 1.13.0.
 - add: Mocha `sort` option.

## 1.2.1 / 2013-09-15
 - fix: always pass `process.env` to the child Mocha process.

## 1.2.0 / 2013-09-15
 - add: environment variable option.

## 1.1.0 / 2013-08-30
 - add: `force` option to continue running Grunt tasks even if tests fail.

## 1.0.7 / 2013-08-17
 - change: update Mocha.

## 1.0.6 / 2013-05-22
 - change: update Mocha.
 - change: switch to tilde version numbers.

## 1.0.5 / 2013-05-03
 - fix: improve the Mocha binary path resolution again (add Windows support).

## 1.0.4 / 2013-05-01
 - fix: improve the Mocha binary path resolution.

## 1.0.3 / 2013-04-11
 - fix: engine warning when installing.
 - change: dependencies.

## 1.0.2 / 2013-03-22
 - add: Node 0.10 support.

## 1.0.1 / 2013-03-07
 - fix: use `.bin/mocha.cmd` instead of `.bin/mocha` on Windows.

## 1.0.0 / 2013-02-19
 - add: initial release.
