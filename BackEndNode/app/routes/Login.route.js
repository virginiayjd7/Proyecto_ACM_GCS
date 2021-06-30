'use strict'

const route = require('express').Router()
const { Login} = require('../controllers/Login.controller')

route.route('/Login/Loguear').post(Login)

module.exports = route