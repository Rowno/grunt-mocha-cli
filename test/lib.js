'use strict';

var path = require('path');
var fs = require('fs');
var mocha = require('../lib/mocha');


exports['sanity check'] = function (test) {
    test.expect(2);

    mocha({
        files: [path.resolve(__dirname, 'fixture/pass.js')],
        quiet: true
    }, function (error, output) {
        test.ifError(error);
        test.notStrictEqual(output.indexOf('1 passing'), -1, '1 test should pass');
        test.done();
    });
};

exports['mocha pass'] = function (test) {
    test.expect(1);

    mocha({
        files: [path.resolve(__dirname, 'fixture/pass.js')],
        quiet: true
    }, function (error) {
        test.ok(!error, 'mocha should pass');
        test.done();
    });
};

exports['mocha fail'] = function (test) {
    test.expect(1);

    mocha({
        files: [path.resolve(__dirname, 'fixture/fail.js')],
        quiet: true
    }, function (error) {
        test.ok(error, 'mocha should fail');
        test.done();
    });
};

exports['set mocha option of type string'] = function (test) {
    test.expect(2);

    mocha({
        files: [path.resolve(__dirname, 'fixture/pass.js')],
        quiet: true,
        reporter: 'tap'
    }, function (error, output) {
        test.ifError(error);
        test.ok(output.match(/# pass 1/), 'expect 1 pass');
        test.done();
    });
};

exports['set mocha option of type bool'] = function (test) {
    test.expect(1);

    mocha({
        files: [path.resolve(__dirname, 'fixture/fail.js')],
        quiet: true,
        reporter: 'tap',
        bail: true
    }, function (error, output) {
        test.ok(output.match(/# fail 1/), 'expect 1 fail');
        test.done();
    });
};

exports['set mocha option of type array'] = function (test) {
    test.expect(2);

    mocha({
        files: [path.resolve(__dirname, 'fixture/coffeescript.coffee')],
        quiet: true,
        reporter: 'tap',
        compilers: ['coffee:coffee-script/register']
    }, function (error, output) {
        test.ifError(error, 'should compile the coffeescript');
        test.ok(output.match(/# pass 1/), 'expect 1 pass');
        test.done();
    });
};

exports['require modules'] = function (test) {
    test.expect(2);

    mocha({
        files: [path.resolve(__dirname, 'fixture/require.js')],
        quiet: true,
        reporter: 'tap',
        require: ['should']
    }, function (error, output) {
        test.ifError(error);
        test.ok(output.match(/# pass 1/), 'expect 1 pass');
        test.done();
    });
};

exports['env option'] = function (test) {
    test.expect(1);

    mocha({
        files: [path.resolve(__dirname, 'fixture/env.js')],
        quiet: true,
        require: ['should'],
        env: {
            FOO: 'bar'
        }
    }, function (error) {
        test.ifError(error);
        test.done();
    });
};

exports['save option'] = function (test) {
    test.expect(2);

    mocha({
        files: [path.resolve(__dirname, 'fixture/pass.js')],
        save: path.resolve(__dirname, 'output.txt'),
        reporter: 'tap'
    }, function (error) {
        try {
            test.ifError(error);
            var output = fs.readFileSync(path.resolve(__dirname, 'output.txt'), 'utf8');
            test.ok(output.match(/# pass 1/), 'expect 1 pass');
            test.done();
        } finally {
            fs.unlink(path.resolve(__dirname, 'output.txt'));
        }
    });
};

exports['filesRaw option'] = function (test) {
    test.expect(2);

    mocha({
        filesRaw: [path.resolve(__dirname, 'fixture/pass*.js')],
        quiet: true,
        reporter: 'tap'
    }, function (error, output) {
        test.ifError(error);
        test.ok(output.match(/# pass 2/), 'expect 2 pass');
        test.done();
    });
};

exports['combine files and filesRaw options'] = function (test) {
    test.expect(2);

    mocha({
        files: [path.resolve(__dirname, 'fixture/fail.js')],
        filesRaw: [path.resolve(__dirname, 'fixture/pass*.js')],
        quiet: true,
        reporter: 'tap'
    }, function (error, output) {
        test.ok(output.match(/# fail 1/), 'expect 1 fail');
        test.ok(output.match(/# pass 2/), 'expect 2 pass');
        test.done();
    });
};

exports['compose reporter options'] = function (test) {
    test.expect(4);

    mocha({
        files: [path.resolve(__dirname, 'fixture/pass.js')],
        quiet: true,
        reporter: 'xunit',
        'reporter-options': {
            output: path.resolve(__dirname, 'output.xml')
        }
    }, function (error) {
        try {
            test.ifError(error);
            var output = fs.readFileSync(path.resolve(__dirname, 'output.xml'), 'utf8');
            test.ok(output.match(/\<testsuite name\=/), 'expect testsuite start tag');
            test.ok(output.match(/\<\/testsuite\>/), 'expect testsuite end tag');
            test.ok(output.match(/\<testcase/), 'expect testcase tag');
            test.done();
        } finally {
            fs.unlink(path.resolve(__dirname, 'output.xml'));
        }
    });
};

exports['ignore blank reporter options'] = function (test) {
    test.expect(2);

    mocha({
        files: [path.resolve(__dirname, 'fixture/pass.js')],
        quiet: true,
        reporter: 'xunit',
        'reporter-options': {}
    }, function (error) {
        test.ifError(error);
        var outputFile = path.resolve(__dirname, 'output.xml');
        test.throws(function () {
            fs.readFileSync(outputFile, 'utf8');
        }, Error, 'Error: ENOENT, no such file or directory ' + outputFile);
        test.done();
    });
};


