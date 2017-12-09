/* eslint-env mocha */
'use strict'
const should = require('should')

describe('fixture', () => {
  it('should have environment variable "FOO"', () => {
    should.strictEqual(process.env.FOO, 'bar') // eslint-disable-line no-process-env
  })
})
