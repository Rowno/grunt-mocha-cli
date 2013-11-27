'use strict';

var grunt = require('grunt');
var fs = require('fs');


exports['grunt pass'] = function (test) {
    test.expect(1);

    grunt.util.spawn({
        grunt: true,
        args: ['--gruntfile', __dirname + '/fixture/pass-gruntfile.js']
    }, function (error, output, code) {
        test.strictEqual(code, 0, 'grunt should pass');
        test.done();
    });
};

exports['grunt fail'] = function (test) {
    test.expect(1);

    grunt.util.spawn({
        grunt: true,
        args: ['--gruntfile', __dirname + '/fixture/fail-gruntfile.js']
    }, function (error, output, code) {
        test.notStrictEqual(code, 0, 'grunt should fail');
        test.done();
    });
};

exports['grunt glob'] = function (test) {
    test.expect(2);

    grunt.util.spawn({
        grunt: true,
        args: ['--gruntfile', __dirname + '/fixture/glob-gruntfile.js']
    }, function (error, output, code) {
        test.notStrictEqual(output.stdout.indexOf('2 passing'), -1, 'should pass 2 tests');
        test.strictEqual(code, 0, 'grunt should pass');
        test.done();
    });
};

exports['grunt options'] = function (test) {
    test.expect(1);

    grunt.util.spawn({
        grunt: true,
        args: ['--gruntfile', __dirname + '/fixture/options-gruntfile.js']
    }, function (error, output, code) {
        test.strictEqual(code, 0, 'grunt should pass');
        test.done();
    });
};

exports['grunt force'] = function (test) {
    test.expect(1);

    grunt.util.spawn({
        grunt: true,
        args: ['--gruntfile', __dirname + '/fixture/force-gruntfile.js']
    }, function (error, output, code) {
        test.strictEqual(code, 0, 'grunt should pass');
        test.done();
    });
};

exports['output option'] = function (test) {
    test.expect(2);

    grunt.util.spawn({
        grunt: true,
        args: ['--gruntfile', __dirname + '/fixture/output-gruntfile.js']
    }, function (error, output, code) {
        try {
            test.strictEqual(code, 0, 'grunt should pass');
            var result = fs.readFileSync(__dirname + '/out.txt', 'utf8');
            test.ok(result.match(/ok 1 fixture pass/));
            test.done();
        } finally {
            fs.unlink(__dirname + '/out.txt');
        }
    });
};
