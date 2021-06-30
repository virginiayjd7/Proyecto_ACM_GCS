'use strict'

const dataModels = require('../models/Fases.model')
const connection = require('../../config/connection')

function AgregarFase (req, res) {
    const {nombre_fase, metodologiaId} =  req.body   
    dataModels.AgregarFase({nombre_fase, metodologiaId}, (data, error) => {
        res.json(data)
    })
}

module.exports = {
   AgregarFase  
}