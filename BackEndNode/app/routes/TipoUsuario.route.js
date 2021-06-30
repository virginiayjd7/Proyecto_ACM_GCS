'use strict'

const route = require('express').Router()
const { ListarTipoUsuario} = require('../controllers/TipoUsuario.controller')

route.route('/TipoUsuario/ListarTipoUsuario').get(ListarTipoUsuario)


module.exports = route