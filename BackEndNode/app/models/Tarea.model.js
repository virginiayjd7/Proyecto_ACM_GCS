'use strict'

const connection = require('../../config/connection')

var dataModels = {
    AgregarTarea : (data, callback) => {
        if(connection) {
            let sql = `INSERT INTO tarea_ecs (verionID,miembroresponsableID,fecha_inicio,fecha_termino,descripcion,porcentajeavance,urlevidencia,estado,estado1) 
             values (${connection.escape(data.verionID)}, ${connection.escape(data.miembroresponsableID)},${connection.escape(data.fecha_inicio)},${connection.escape(data.fecha_termino)},
             ${connection.escape(data.descripcion)},${connection.escape(data.porcentajeavance)},${connection.escape(data.urlevidencia)},${connection.escape(data.estado)},${connection.escape(data.estado1)})`
             connection.query(sql, (error,result, rows) => {
                if(error) throw error           
                callback({message : ' insertado tarea :'})
            })
        }
    },
    Listar : (data,callback) => {
        if(connection) {
            let sql = `SELECT t.id_tarea,t.verionID, t.miembroresponsableID,usu.nombre, t.fecha_inicio,t.fecha_termino,t.descripcion,t.porcentajeavance,t.urlevidencia,t.estado ,t.estado1,t.estado2 FROM tarea_ecs AS t
            INNER JOIN miembroproyecto AS  mi 
            ON t.miembroresponsableID=mi.id
            INNER  JOIN usuario AS usu
            ON mi.usuario_miembroid= usu.id_usuario
            WHERE t.verionID=${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    }, 
    editar : (data, callback) => {
        if(connection) {
            let sql = `update tarea_ecs  set porcentajeavance = ${connection.escape(data.porcentajeavance)}, urlevidencia = ${connection.escape(data.urlevidencia)} ,
            estado = ${connection.escape(data.estado)},  estado1 = ${connection.escape(data.estado1)} where id_tarea = ${connection.escape(data.id_tarea)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback({message: 'tarea actualizado'})
            })
        }
    },
    AprobarRechazarTarea:(data,callback)=>{
        if(connection) {
            if (data.estado2=="Aprobado") {
                let sql = `update tarea_ecs  set estado = ${connection.escape(data.estado)}, estado1 = ${connection.escape(data.estado1)} ,
                estado2 = ${connection.escape(data.estado2)},  respuesta = ${connection.escape(data.respuesta)} where id_tarea = ${connection.escape(data.id_tarea)}`
                connection.query(sql, (error, rows) => {
                    if(error) throw error
                    callback({message: 'tarea actualizado'})
                })
            }else{
                let sql = `update tarea_ecs  set estado = ${connection.escape(data.estado)} ,
                estado2 = ${connection.escape(data.estado2)},  respuesta = ${connection.escape(data.respuesta)} where id_tarea = ${connection.escape(data.id_tarea)}`
                connection.query(sql, (error, rows) => {
                    if(error) throw error
                    callback({message: 'tarea actualizado'})
                })
            }
           
        }
    },
    ObtenerTarea : (data,callback) => {
        if(connection) {
            let sql = `SELECT t.id_tarea,t.verionID, t.miembroresponsableID,usu.nombre, t.fecha_inicio,t.fecha_termino,t.descripcion,t.porcentajeavance,t.urlevidencia,t.estado,t.estado1,t.estado2, t.respuesta  FROM tarea_ecs AS t
            INNER JOIN miembroproyecto AS  mi 
            ON t.miembroresponsableID=mi.id
            INNER  JOIN usuario AS usu
            ON mi.usuario_miembroid= usu.id_usuario
            WHERE t.id_tarea= ${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows[0])
            })
        }
    }, 
    ListaTotalTarea : (callback) => {
        if(connection) {
            let sql = `SELECT pro.id_proyecto, pro.nombre_proyecto,  ta.estado ,COUNT(ta.estado) AS cantidad FROM tarea_ecs AS ta
            INNER JOIN version AS ve
            ON ta.verionID =ve.id_version
            INNER JOIN cronograma_elemento AS cro
            ON ve.elemntoconfiguracionID=cro.id_cronograma_elemento
            INNER JOIN cronogramafase AS cro1
            ON cro.id_cronograma_fase =cro1.id_cronograma_fase
            INNER JOIN cronograma AS cro2 
            ON cro1.coronogramaId=cro2.id_cronograma          
            INNER JOIN proyecto AS pro
            on cro2.id_proyecto=pro.id_proyecto
            GROUP BY pro.id_proyecto ,ta.estado
            ORDER BY ta.estado`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    }, 
    VerMensaje: (data,callback) => {
        if(connection) {
            let sql = `SELECT  t.id_tarea,t.estado ,t.estado1,t.estado2,t.respuesta from  tarea_ecs AS t
            WHERE t.id_tarea =${connection.escape(data)}`
             connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows[0])
            })
        }
    }
}

module.exports = dataModels
