'use strict'

const route = require('express').Router()
const { ObtenerHistorial} = require('../controllers/Historial.controller')

route.route('/Historial/ObtenerHistorial/:id').get(ObtenerHistorial)
//route.route('/Commit/Agregar').post(AgregarCommit)

module.exports = route