'use strict'

const route = require('express').Router()
const { Listar,AgregarElemento} = require('../controllers/elemento.controller')

route.route('/elemento/Listar').get(Listar)
route.route('/elemento/Agregar').post(AgregarElemento)

module.exports = route