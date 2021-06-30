'use strict'
//metodologia
const dataModels = require('../models/elemento.model')
const connection = require('../../config/connection')

function AgregarElemento (req, res) {
    const {codigo_elemento, nombre} =  req.body   
    dataModels.AgregarElemento({codigo_elemento, nombre}, (data, error) => {
        res.json(data)
    })
}
async function Listar(req, res) {
    dataModels.Listar((data, error) => {        
        res.json(data)
    })
}


module.exports = {
    Listar, 
    AgregarElemento
}