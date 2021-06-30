'use strict'
//metodologia
const dataModels = require('../models/TipoUsuario.model')
const connection = require('../../config/connection')

async function ListarTipoUsuario(req, res) {
    dataModels.ListarTipoUsuario((data, error) => {        
        res.json(data)
    })
}

module.exports = {
    ListarTipoUsuario
   
}