'use strict'
//metodologia
const dataModels = require('../models/CronogramaElemento.model')
const connection = require('../../config/connection')

function AgregarCronogramaElemento (req, res) {
    const {listacronogramaelemento} =  req.body   
    listacronogramaelemento.forEach(item => {
        console.log(item.nombre+" "+item.id_cronograma_fase);
        var obje={id_elemento:item.id,nombre_elemento:item.nombre,coronogramaId:item.id_fase,id_cronograma_fase:item.id_cronograma_fase};
        dataModels.AgregarCronogramaElemento(obje, (data, error) => {                   
           // res.json(data)
        })
    });  
}

module.exports = {    
    AgregarCronogramaElemento
}