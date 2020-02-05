/* eslint-env mocha */
const assert = require('assert')
const request = require('supertest')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const GeneratorToken = require('../util/generatorToken')

const mockUser = {
  id: 1,
  email: 'any_email@gmail.com'
}

describe.only('Suite tests for ensure correct login', function () {
  it('Ensure return a token basead in email and id of user', () => {
    const response = GeneratorToken.token(mockUser.id, mockUser.email)
    var decoded = jwt.verify(response, process.env.JWT_KEY)
    assert.deepStrictEqual(mockUser.id, decoded.id)
    assert.deepStrictEqual(mockUser.email, decoded.email)
  })
})
