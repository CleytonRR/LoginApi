/* eslint-env mocha */
const assert = require('assert')
const validatorEmail = require('../util/emailValidator')

describe('Suite tests for ensure correct sign up', function () {
  it('return True if provided correct email', () => {
    const response = validatorEmail.testEmail('cleyton@gmail.com')
    assert.ok(response === true)
  })

  it('Return False if provided incorrect email', () => {
    const response = validatorEmail.testEmail('cleyton@gm,ail.com')
    assert.ok(response === false)
  })
})
