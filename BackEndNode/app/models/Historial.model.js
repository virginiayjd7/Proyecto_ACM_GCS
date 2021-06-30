'use strict'

const connection = require('../../config/connection')

var dataModels = {
    AgregarHistorial : (data, callback) => {
        if(connection) {
            let sql = `INSERT INTO historial_tarea_ecs ( id_timeline,miembroresponsableID,id_tarea,fecha,porcentajeavance,urlevidencia,descripcion) values 
            (${connection.escape(data.idtemiline)}, ${connection.escape(data.miembroresponsableID)}, ${connection.escape(data.id_tarea)}, ${connection.escape(data.fecha)}
            , ${connection.escape(data.porcentajeavance)}, ${connection.escape(data.urlevidencia)}, ${connection.escape(data.descripcion_avance)})`
              connection.query(sql, (error,result, rows) => {
                if(error) throw error
               // console.log(result.insertId);
                callback({message : ' insertado historial, :'})
            })
        }
    },
    ObtenerHistorial : (data,callback) => {
        if(connection) {
            let sql = `SELECT * FROM historial_tarea_ecs AS his
            WHERE his.id_timeline= ${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows[0])
            })
        }
    }, 
      
}

module.exports = dataModels
