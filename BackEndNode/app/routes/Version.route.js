'use strict'

const route = require('express').Router()
const { Listar,AgregarVersion} = require('../controllers/Version.controller')

route.route('/Version/Listar/:id').get(Listar)
route.route('/Version/AgregarVersion').post(AgregarVersion)

module.exports = route