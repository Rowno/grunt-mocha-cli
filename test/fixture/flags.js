/* eslint-env mocha */
'use strict';
require('should');


describe('fixture', function () {
    it('should execute with the "--harmony" flag', function () {
        process.execArgv.should.containEql('--harmony');
    });
});
