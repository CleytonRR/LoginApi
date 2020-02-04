/* eslint-env mocha */
const assert = require('assert')
const validatorEmail = require('../util/emailValidator')
const validatorPassword = require('../util/passwordValidator')

describe('Suite tests for ensure correct sign up', function () {
  it('return True if provided correct email', () => {
    const response = validatorEmail.testEmail('any_email_correct@gmail.com')
    assert.ok(response === true)
  })

  it('Return False if provided incorrect email', () => {
    const response = validatorEmail.testEmail('any_email_incorrect@gm,ail.com')
    assert.ok(response === false)
  })

  it('Return true if password provided have length 6 and minimal a letter and one number', () => {
    const response = validatorPassword.testePass('asdq11')
    assert.ok(response === true)
  })

  it('Return false if password provided no have length 6', () => {
    const response = validatorPassword.testePass('asd')
    assert.ok(response === false)
  })

  it('Return false if password provided no have a letter', () => {
    const response = validatorPassword.testePass('123456')
    assert.ok(response === false)
  })

  it('Return false if password provided no have a number', () => {
    const response = validatorPassword.testePass('asdqwe')
    assert.ok(response === false)
  })
})
