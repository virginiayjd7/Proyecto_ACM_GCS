'use strict'

const route = require('express').Router()
const { AgregarCronogramaElemento} = require('../controllers/CronogramaElemento.controller')

route.route('/CronogramaElemento/Agregar').post(AgregarCronogramaElemento)

module.exports = route