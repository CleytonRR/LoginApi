const { Router } = require('express')
const UserController = require('./controller/UserController')
const LoginController = require('./controller/LoginController')

const routes = Router()

routes.post('/user', UserController.create)
routes.post('/login', LoginController.authenticar)

module.exports = routes
