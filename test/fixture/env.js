'use strict';

describe('fixture', function () {
    it('has environment variable "FOO"', function () {
        (Object.keys(process.env)).should.include('FOO');
        process.env.FOO.should.equal('bar');
    });
});
