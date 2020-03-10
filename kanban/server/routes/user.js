const routes = require('express').Router()
const ControllerUser = require('../controllers/user')


routes.post('/register', ControllerUser.register)
routes.post('/login', ControllerUser.login)

module.exports = routes

