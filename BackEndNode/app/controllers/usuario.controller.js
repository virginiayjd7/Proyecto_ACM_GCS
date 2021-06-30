'use strict'
//metodologia
const dataModels = require('../models/usuario.model')
const connection = require('../../config/connection')

async function Listar(req, res) {
    dataModels.Listar((data, error) => {        
        res.json(data)
    })
}


function ListaProyectoMiembro(req, res) {   
    const { id } = req.params
    dataModels.ListaProyectoMiembro(id, (data, error) => {
        res.json(data)
    })
}
function ListaProyectoJefe(req, res) {   
    const { id } = req.params
    ///console.log("llega: "+id);
    dataModels.ListaProyectoJefe(id, (data, error) => {
        res.json(data)
    })
}

function RegistrarUsuario (req, res) {
    const {nombre,apellido,correo,password,tiposusuarioId} =  req.body   
    dataModels.RegistrarUsuario({nombre,apellido,correo,password,tiposusuarioId}, (data, error) => {
        res.json(data)
    })
}

module.exports = {
    Listar, 
    RegistrarUsuario,   
    ListaProyectoJefe,
    ListaProyectoMiembro,
   
}