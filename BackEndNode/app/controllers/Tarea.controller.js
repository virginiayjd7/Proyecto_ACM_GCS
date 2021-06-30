'use strict'
//metodologia
const dataModels = require('../models/Tarea.model')
const connection = require('../../config/connection')

function AgregarTarea (req, res) {
    const {verionID,miembroresponsableID,fecha_inicio,fecha_termino,descripcion, porcentajeavance, urlevidencia, estado, estado1} =  req.body   
    dataModels.AgregarTarea({verionID,miembroresponsableID,fecha_inicio,fecha_termino,descripcion, porcentajeavance, urlevidencia, estado, estado1}, (data, error) => {
        res.json(data)
    })
}
async function Listar(req, res) {
    const { id } = req.params   
    dataModels.Listar(id,(data, error) => {        
        res.json(data)
    })
}
function editar(req, res) {
    const { id_tarea } = req.params
    const { urlevidencia,porcentajeavance,estado,estado1} = req.body
    dataModels.editar({id_tarea,urlevidencia,porcentajeavance,estado,estado1}, (data, error) => {
        res.json(data)
    })
}

function AprobarRechazarTarea(req, res) {
    const { id_tarea } = req.params
    const {  estado, estado1, estado2, respuesta} = req.body
    dataModels.AprobarRechazarTarea({id_tarea, estado, estado1, estado2, respuesta}, (data, error) => {
        res.json(data)
    })
}

function ObtenerTarea (req, res) {
    const {id} =   req.params  
    dataModels.ObtenerTarea(id, (data, error) => {
        res.json(data)
    })
}

function VerMensaje (req, res) {
    const {id_tarea} =   req.params  
    dataModels.VerMensaje(id_tarea, (data, error) => {
        res.json(data)
    })
}


function ListaTotalTarea (req, res) {
    dataModels.ListaTotalTarea((data, error) => {
        res.json(data)
    })
}

module.exports = {
    Listar,    
    editar,   
    VerMensaje,
    AgregarTarea,
    ObtenerTarea,
    ListaTotalTarea,
    AprobarRechazarTarea
}