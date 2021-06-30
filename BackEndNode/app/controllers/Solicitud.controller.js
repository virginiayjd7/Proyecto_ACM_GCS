'use strict'
//metodologia
const dataModels = require('../models/Solicitud.model')
const connection = require('../../config/connection')

function AgregarSolicitud (req, res) {
    const {id_proyecto,miembrojefeId, miembrosolicitanteId, fecha,objetivo,descripcion, respuesta,estado,documento,elemento} =  req.body   
    dataModels.AgregarSolicitud({id_proyecto,miembrojefeId, miembrosolicitanteId, fecha,objetivo,descripcion, respuesta,estado,documento,elemento}, (data, error) => {
        res.json(data)
    })
}
async function ListarSolicitud(req, res) {
    dataModels.ListarSolicitud((data, error) => {        
        res.json(data)
    })
}



module.exports = {  
    ListarSolicitud,
    AgregarSolicitud,
    
}