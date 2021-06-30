'use strict'
//metodologia
const route = require('express').Router()
const { Listar,FasesMetodologia,ListarTodas,AgregarMetodologia} = require('../controllers/metodologia.controller')

route.route('/metodologia/Listar').get(Listar)
route.route('/metodologia/ListarTodas').get(ListarTodas)
route.route('/metodologia/Fases/:id').get(FasesMetodologia)
route.route('/metodologia/AgregarMetodologia').post(AgregarMetodologia)


module.exports = route