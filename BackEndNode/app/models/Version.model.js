'use strict'

const connection = require('../../config/connection')

var dataModels = {
    AgregarVersion : (data, callback) => {
        if(connection) {
            let sql = `INSERT INTO  version (elemntoconfiguracionID,version,fecha_inicio,fecha_termino,miembroresponsableID) values (${connection.escape(data.elemntoconfiguracionID)}, 
            ${connection.escape(data.version)},${connection.escape(data.fecha_inicio)},${connection.escape(data.fecha_termino)} ,${connection.escape(data.miembroresponsableID)} )`
            connection.query(sql, (error,result, rows) => {
                if(error) throw error
               // console.log(result.insertId);
                callback({message : ' insertado version, :'})
            })
        }
    },
    Listar : (data,callback) => {
        if(connection) {
            let sql = `SELECT v.miembroresponsableID, v.id_version,v.elemntoconfiguracionID,v.version,v.fecha_inicio,v.fecha_termino, usu.nombre FROM version AS v
            INNER JOIN miembroproyecto AS  mi 
            ON v.miembroresponsableID=mi.id
            INNER  JOIN usuario AS usu
            ON mi.usuario_miembroid= usu.id_usuario        
            WHERE v.elemntoconfiguracionID = ${connection.escape(data)}`           
            connection.query(sql, (error, rows) => {
                if(error) throw error                 
                callback(rows)
            })
        }
    }, 
      
}

module.exports = dataModels
