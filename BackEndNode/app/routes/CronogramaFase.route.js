'use strict'

const route = require('express').Router()
const { ObtenerCronogramaFase,UpdatateCronogramaFase} = require('../controllers/CronogramaFase.controller')

route.route('/CronogramaFase/ObtenerCronogramaFase/:id').get(ObtenerCronogramaFase)
route.route('/CronogramaFase/UpdatateCronogramaFase/:id').put(UpdatateCronogramaFase)
//UpdatateCronogramaFase
module.exports = route