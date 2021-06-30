'use strict'

const route = require('express').Router()
const { AgregarSolicitud,ListarSolicitud} = require('../controllers/Solicitud.controller')

route.route('/Solicitud/ListarSolicitud').get(ListarSolicitud)
route.route('/Solicitud/AgregarSolicitud').post(AgregarSolicitud)


module.exports = route