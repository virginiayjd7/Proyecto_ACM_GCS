'use strict'

const connection = require('../../config/connection')

var dataModels = {
    AgregarSolicitud : (data, callback) => {
        if(connection) {
                var codigo ="1";
            let sql = `INSERT INTO solicitudcambio (codigo,id_proyecto,miembrojefeId,miembrosolicitanteId,fecha,objetivo,descripcion,respuesta,estado,documento,elemento) 
             values ('1', ${connection.escape(data.id_proyecto)},${connection.escape(data.miembrojefeId)},${connection.escape(data.miembrosolicitanteId)},
             ${connection.escape(data.fecha)},${connection.escape(data.objetivo)},${connection.escape(data.descripcion)},${connection.escape(data.respuesta)},${connection.escape(data.estado)},
             ${connection.escape(data.documento)},${connection.escape(data.elemento)})`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback({message : 'Exito, :',estado:'NoExiste'})
            })

        }
    },
    ListarSolicitud : (callback) => {
        if(connection) {
            let sql = `SELECT  soli.id_solicitud, soli.codigo,pro.id_proyecto, pro.nombre_proyecto, usu.nombre ,soli.estado,soli.fecha,soli.documento,soli.elemento FROM solicitudcambio AS soli
            INNER JOIN proyecto AS pro
            on soli.id_proyecto=pro.id_proyecto
            INNER JOIN miembroproyecto AS mi  
            ON soli.miembrosolicitanteId=mi.id
            INNER JOIN usuario  AS usu
            on mi.usuario_miembroid=usu.id_usuario`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },     
      
}

module.exports = dataModels
