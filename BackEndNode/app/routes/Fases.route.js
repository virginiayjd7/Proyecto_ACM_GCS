'use strict'

const route = require('express').Router()
const {  AgregarFase} = require('../controllers/Fases.controller')

route.route('/Fases/AgregarFase').post(AgregarFase)
//route.route('/elemento/Listar').get(Listar)




module.exports = route