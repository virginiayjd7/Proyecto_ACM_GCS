'use strict'

const route = require('express').Router()
const { ListarPlantillaElemento,ListaElementosFase,AgregarPlantillaElemento} = require('../controllers/PlantillaElemento.controller')

route.route('/PlantillaElemento/Elementos/:id').get(ListaElementosFase)
route.route('/PlantillaElemento/Agregar').post(AgregarPlantillaElemento)
route.route('/PlantillaElemento/ListarPlantilla').get(ListarPlantillaElemento)

module.exports = route