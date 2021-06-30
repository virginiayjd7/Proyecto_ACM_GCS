'use strict'

const route = require('express').Router()
const { Listar,ListaMiembrosProyecto,AgregarMiembro,ListaTareasMiembro,ObtenerJefeProyecto,ObtenerJefeProyecto2} = require('../controllers/Miembro.controller')

route.route('/Miembro/Listar').get(Listar)
route.route('/Miembro/Registrar').post(AgregarMiembro)
route.route('/Miembro/TareasMiembro/:id').get(ListaTareasMiembro)
route.route('/Miembro/ObtenerJefeProyecto').post(ObtenerJefeProyecto)
route.route('/Miembro/MiembroProyecto/:id').get(ListaMiembrosProyecto)
route.route('/Miembro/ObtenerJefeProyecto2').post(ObtenerJefeProyecto2)
module.exports = route