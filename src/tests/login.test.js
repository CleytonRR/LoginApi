/* eslint-env mocha */
const assert = require('assert')
const request = require('supertest')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const GeneratorToken = require('../util/generatorToken')
const VerifyToken = require('../util/verifyToken')

const mockUser = {
  id: 1,
  email: 'any_email@gmail.com'
}

var invalidToken = ''
var validtoken = ''

describe.only('Suite tests for ensure correct login', function () {
  it('Ensure return a token basead in email and id of user', () => {
    const response = GeneratorToken.token(mockUser.id, mockUser.email)
    validtoken = response
    invalidToken = 's' + response
    var decoded = jwt.verify(response, process.env.JWT_KEY)
    assert.deepStrictEqual(mockUser.id, decoded.id)
    assert.deepStrictEqual(mockUser.email, decoded.email)
  })

  it('Return error if token is provided is invalid', () => {
    const result = VerifyToken.verify(invalidToken)
    assert.deepStrictEqual(false, result)
  })

  it('Return true if token provided is valid', () => {
    const result = VerifyToken.verify(validtoken)
    assert.deepStrictEqual(true, result)
  })
})
