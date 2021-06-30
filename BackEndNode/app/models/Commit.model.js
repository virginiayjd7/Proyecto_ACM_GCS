'use strict'

const connection = require('../../config/connection')
const historial = require('./Historial.model')

var dataModels = {
    AgregarCommit : (data, callback) => {
        if(connection) {
            let sql = `INSERT  INTO timeline (miembroresponsableID,fecha,hora,estado,id_tarea)  values
             (${connection.escape(data.miembroresponsableID)}, ${connection.escape(data.fecha)},${connection.escape(data.hora)},${connection.escape(data.estado)},
             ${connection.escape(data.id_tarea)})`
             connection.query(sql, (error,result, rows) => {
                if(error) throw error
               //console.log(result.insertId);
                var datahisto={idtemiline:result.insertId,miembroresponsableID:data.miembroresponsableID,id_tarea:data.id_tarea,fecha:data.fecha,porcentajeavance:data.porcentajeavance,urlevidencia:data.urlevidencia,descripcion_avance:data.descripcion_avance}
                historial.AgregarHistorial(datahisto, (dato, error)=>{
                    callback({message : ' insertado hisotrial we , :'})
                 });                  
            })
        }
    },
    ListarCommit : (data,callback) => {
        if(connection) {
            let sql = `SELECT   timel.id_timeline ,timel.id_tarea, timel.fecha ,timel.hora,usu.nombre,tarea.descripcion FROM timeline AS timel
            INNER JOIN miembroproyecto AS miem
            ON timel.miembroresponsableID = miem.id
            INNER JOIN usuario AS usu 
            ON miem.usuario_miembroid =usu.id_usuario
            INNER JOIN tarea_ecs AS tarea
            ON tarea.id_tarea = timel.id_tarea
            WHERE timel.id_tarea=${connection.escape(data)} ORDER BY  timel.id_timeline DESC`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    }, 
      
}

module.exports = dataModels
