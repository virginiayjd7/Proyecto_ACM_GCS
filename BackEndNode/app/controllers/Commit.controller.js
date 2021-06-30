'use strict'
//metodologia
const dataModels = require('../models/Commit.model')
const connection = require('../../config/connection')

function AgregarCommit (req, res) {
    const {miembroresponsableID,fecha,hora,estado,id_tarea,porcentajeavance,urlevidencia,descripcion_avance} =  req.body   
    dataModels.AgregarCommit({miembroresponsableID,fecha,hora,estado,id_tarea,porcentajeavance,urlevidencia,descripcion_avance}, (data, error) => {
        res.json(data)
    })
}
async function ListarCommit(req, res) {
    const { id_tarea } = req.params
    dataModels.ListarCommit(id_tarea,(data, error) => {        
        res.json(data)
    })
}


module.exports = {
    ListarCommit, 
    AgregarCommit
}