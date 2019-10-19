/* eslint-env mocha */
'use strict'
require('should')

describe('fixture', () => {
  it('should execute with the "--harmony" flag', () => {
    process.execArgv.should.containEql('--harmony')
  })
})
