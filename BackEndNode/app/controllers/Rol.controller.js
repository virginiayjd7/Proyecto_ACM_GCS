'use strict'
//Rol
const dataModels = require('../models/Rol.model')
const connection = require('../../config/connection')

async function Listar(req, res) {
    dataModels.Listar((data, error) => {        
        res.json(data)
    })
}


module.exports = {
    Listar, 

}