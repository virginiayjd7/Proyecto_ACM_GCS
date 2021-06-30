'use strict'//metodologia

const dataModels = require('../models/PlantillaElemento.model')
const connection = require('../../config/connection')

    function AgregarPlantillaElemento (req, res) {
        const {faseId, elementoId,metodologiaId} =  req.body   
        dataModels.AgregarPlantillaElemento({faseId, elementoId,metodologiaId}, (data, error) => {
            res.json(data)
        })
    }
    function ListarPlantillaElemento(req, res){    
        
        dataModels.ListarPlantillaElemento((data, error) => {
            res.json(data)
           
        })
    }
    function ListaElementosFase(req, res) {
        console.log("tbm entra aqui we")
        const { id } = req.params
        dataModels.ListaElementosFase(id, (data, error) => {
            res.json(data)
           
        })
    }
module.exports = {
    ListaElementosFase,   
    ListarPlantillaElemento,
    AgregarPlantillaElemento,
    
 
}