/* eslint-env mocha */
'use strict'
require('should') // eslint-disable-line import/no-unassigned-import

describe('fixture', () => {
  it('should execute with the "--harmony" flag', () => {
    process.execArgv.should.containEql('--harmony')
  })
})
