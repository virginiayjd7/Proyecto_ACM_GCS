'use strict'
//metodologia
const dataModels = require('../models/Proyecto.model')
const connection = require('../../config/connection')

function AgregarProyecto (req, res) {

    //nombre_proyecto,fecha_inicio,fecha_termino,descripcion,estado,metodologiaId,usuariojefeId,porcentaje
    const {nombre_proyecto,fecha_inicio,fecha_termino,descripcion,estado,metodologiaId,usuariojefeId,porcentaje,ListaFases} =  req.body   
    dataModels.AgregarProyecto({nombre_proyecto,fecha_inicio,fecha_termino,descripcion,estado,metodologiaId,usuariojefeId,porcentaje,ListaFases}, (data, error) => {
        res.json(data)
    })
}
async function Listar(req, res) {
    dataModels.Listar((data, error) => {    
        res.json(data)
    })
}

function ListarFasesProyecto(req, res) {   
    const { id } = req.params
    dataModels.ListarFasesProyecto(id, (data, error) => {
        res.json(data)
    })
}

function ProyectoDetail(req, res) {  
     const { id } = req.params
     dataModels.ProyectoDetail(id, (data, error) => {
         res.json(data)
     })
 }
function ListaElementosFaseProyecto(req, res){
    const { id_proyecto,id_fase } = req.body
    dataModels.ListaElementosFaseProyecto({id_proyecto,id_fase}, (data, error) => {
        res.json(data)
    })
}
 
function UpdatatePorcentaje(req, res) {
    const { id } = req.params    
    const { porcentaje} = req.body
    dataModels.UpdatatePorcentaje({id, porcentaje}, (data, error) => {
        res.json(data)
    })
}


function TotalTareasProyecto(req, res) {  
     const { id } = req.params
     dataModels.TotalTareasProyecto(id, (data, error) => {
         res.json(data)
     })
 }


module.exports = {
    Listar, 
    ProyectoDetail,
    AgregarProyecto,
    UpdatatePorcentaje,
    TotalTareasProyecto,   
    ListarFasesProyecto,   
    ListaElementosFaseProyecto,
   
}