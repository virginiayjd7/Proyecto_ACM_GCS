'use strict'

const route = require('express').Router()
const { ListarCommit,AgregarCommit} = require('../controllers/Commit.controller')
route.route('/Commit/Agregar').post(AgregarCommit)
route.route('/Commit/ListarCommit/:id_tarea').get(ListarCommit)


module.exports = route