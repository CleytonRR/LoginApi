/* eslint-env mocha */
require('dotenv').config()
const assert = require('assert')
const request = require('supertest')
const app = require('../index')
const jwt = require('jsonwebtoken')
const GeneratorToken = require('../util/generatorToken')
const VerifyToken = require('../util/verifyToken')
const PassHash = require('../util/passwordHash')
const CreatNewUser = require('../Crud/create')
const User = require('../model/UserModel')

const mockUser = {
  id: 1,
  email: 'any_email@gmail.com',
  password: 'asdqweAA_11'
}

var invalidToken = ''
var validtoken = ''

describe.only('Suite tests for ensure correct login', function () {
  this.beforeAll(async function () {
    await User.sync({ force: true })
  })

  this.beforeAll(async function () {
    var passwordHash = await PassHash.generatorHash(mockUser.password)
    await CreatNewUser.createUser(mockUser.email, passwordHash)
  })

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

  it('POST/Login -> If email and password provided is valid, return a token', async () => {
    const response = await request(app).post('/login').send(mockUser).set('Accept', 'application/json')
    var decoded = jwt.verify(response.body.token, process.env.JWT_KEY)
    assert.deepStrictEqual(mockUser.id, decoded.id)
    assert.deepStrictEqual(mockUser.email, decoded.email)
    assert.deepStrictEqual(200, response.status)
  })
})
