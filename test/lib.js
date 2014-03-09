'use strict';

var fs = require('fs');
var mocha = require('../lib/mocha');


exports['sanity check'] = function (test) {
    test.expect(2);

    mocha({
        files: [__dirname + '/fixture/pass.js'],
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
        files: [__dirname + '/fixture/pass.js'],
        quiet: true
    }, function (error) {
        test.ok(!error, 'mocha should pass');
        test.done();
    });
};

exports['mocha fail'] = function (test) {
    test.expect(1);

    mocha({
        files: [__dirname + '/fixture/fail.js'],
        quiet: true
    }, function (error) {
        test.ok(error, 'mocha should fail');
        test.done();
    });
};

exports['set mocha option of type string'] = function (test) {
    test.expect(2);

    mocha({
        files: [__dirname + '/fixture/pass.js'],
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
        files: [__dirname + '/fixture/fail.js'],
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
        files: [__dirname + '/fixture/coffeescript.coffee'],
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
        files: [__dirname + '/fixture/require.js'],
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
        files: [__dirname + '/fixture/env.js'],
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
        files: [__dirname + '/fixture/pass.js'],
        save: __dirname + '/output.txt',
        reporter: 'tap'
    }, function (error) {
        try {
            test.ifError(error);
            var output = fs.readFileSync(__dirname + '/output.txt', 'utf8');
            test.ok(output.match(/# pass 1/), 'expect 1 pass');
            test.done();
        } finally {
            fs.unlink(__dirname + '/output.txt');
        }
    });
};

exports['filesRaw option'] = function (test) {
    test.expect(2);

    mocha({
        filesRaw: [__dirname + '/fixture/pass*.js'],
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
        files: [__dirname + '/fixture/fail.js'],
        filesRaw: [__dirname + '/fixture/pass*.js'],
        quiet: true,
        reporter: 'tap'
    }, function (error, output) {
        test.ok(output.match(/# fail 1/), 'expect 1 fail');
        test.ok(output.match(/# pass 2/), 'expect 2 pass');
        test.done();
    });
};
