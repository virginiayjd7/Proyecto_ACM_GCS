'use strict'
//metodologia
const dataModels = require('../models/metodologia.model')
const connection = require('../../config/connection')

async function Listar(req, res) {
    dataModels.Listar((data, error) => {        
        res.json(data)
    })
}

function FasesMetodologia(req, res) {   
    const { id } = req.params
    dataModels.FasesMetodologia(id, (data, error) => {
        res.json(data)
    })
}

 function ListarTodas(req, res) {
    dataModels.ListarTodas((data, error) => {     
        res.json(data)
    })
}


function AgregarMetodologia (req, res) {
    const {nombre} =  req.body   
    dataModels.AgregarMetodologia( {nombre}, (data, error) => {
        res.json(data)
    })
}

module.exports = {
    Listar,
    ListarTodas,
    FasesMetodologia,    
    AgregarMetodologia

}