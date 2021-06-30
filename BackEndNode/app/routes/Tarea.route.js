'use strict'

const route = require('express').Router()
const { Listar,AgregarTarea,editar,ObtenerTarea,ListaTotalTarea,AprobarRechazarTarea,VerMensaje} = require('../controllers/Tarea.controller')

route.route('/Tarea/Listar/:id').get(Listar)
route.route('/Tarea/editar/:id_tarea').put(editar)
route.route('/Tarea/AgregarTarea').post(AgregarTarea)
route.route('/Tarea/ObtenerTarea/:id').get(ObtenerTarea)
route.route('/Tarea/VerMensaje/:id_tarea').get(VerMensaje)
route.route('/Tarea/ListaTotalTarea').get(ListaTotalTarea)
route.route('/Tarea/AprobarRechazarTarea/:id_tarea').put(AprobarRechazarTarea)

module.exports = route