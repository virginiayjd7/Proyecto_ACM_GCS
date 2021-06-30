'use strict'
//metodologia
const dataModels = require('../models/Historial.model')
const connection = require('../../config/connection')

function ObtenerHistorial (req, res) {
    const {id} =   req.params  
    dataModels.ObtenerHistorial(id, (data, error) => {
        res.json(data)
    })
}



module.exports = {    
    ObtenerHistorial
}