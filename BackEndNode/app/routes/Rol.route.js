'use strict'

const route = require('express').Router()
const { Listar} = require('../controllers/Rol.controller')

route.route('/Rol/Listar').get(Listar)

//route.route('/metodologia/Fases/:id').get(FasesMetodologia)
module.exports = route