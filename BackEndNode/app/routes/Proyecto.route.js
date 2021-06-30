'use strict'

const route = require('express').Router()
const { Listar,AgregarProyecto,ListarFasesProyecto,ProyectoDetail,ListaElementosFaseProyecto,UpdatatePorcentaje,TotalTareasProyecto} = require('../controllers/Proyecto.controller')

route.route('/Proyecto/Listar').get(Listar)
route.route('/Proyecto/Agregar').post(AgregarProyecto)
route.route('/Proyecto/ProyectoDetail/:id').get(ProyectoDetail)
route.route('/Proyecto/UpdatatePorcentaje/:id').put(UpdatatePorcentaje)
route.route('/Proyecto/TotalTareasProyecto/:id').get(TotalTareasProyecto)
route.route('/Proyecto/ListarFasesProyecto/:id').get(ListarFasesProyecto)
route.route('/Proyecto/ProyectoFasesElemento').post(ListaElementosFaseProyecto)

//route.route('/metodologia/Fases/:id').get(FasesMetodologia)
module.exports = route