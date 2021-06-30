'use strict'

const route = require('express').Router()
const { getCars, getOneCar, addCar, editCar, deleteCar} = require('../controllers/cars.controller')

route.route('/carro/').get(getCars)

route.route('/carro/:id').get(getOneCar)

route.route('/carros/').post(addCar)

route.route('/carro/editar/:id').put(editCar)

route.route('/carro/eliminar/:id').delete(deleteCar)


module.exports = route