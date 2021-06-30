'use strict'
//metodologia
const dataModels = require('../models/Version.model')
const connection = require('../../config/connection')

function AgregarVersion (req, res) {
  //  const {codigo_elemento, nombre} =  req.body   
    const {elemntoconfiguracionID,version,fecha_inicio,fecha_termino,miembroresponsableID}=  req.body
    dataModels.AgregarVersion({elemntoconfiguracionID,version,fecha_inicio,fecha_termino,miembroresponsableID}, (data, error) => {
        res.json(data)
    })
}
 function Listar(req, res) {
    const { id } = req.params       
    dataModels.Listar(id,(data, error) => {        
        res.json(data)
    })
}


module.exports = {
    Listar, 
    AgregarVersion
}