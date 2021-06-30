'use strict'
//metodologia
const dataModels = require('../models/CronogramaFase.model')
const connection = require('../../config/connection')

function ObtenerCronogramaFase (req, res) {
    const {id} =  req.params   
    dataModels.ObtenerCronogramaFase(id, (data, error) => {
        res.json(data)
    })
}
function UpdatateCronogramaFase(req, res) {
    const { id } = req.params
    const { porcentaje} = req.body
    dataModels.UpdatateCronogramaFase({id, porcentaje}, (data, error) => {
        res.json(data)
    })
}


module.exports = {
    ObtenerCronogramaFase,    
    UpdatateCronogramaFase 
}