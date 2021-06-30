'use strict'

const connection = require('../../config/connection')

var dataModels = {
    Listar : (callback) => {
        if(connection) {
            let sql = `SELECT  pro.id_proyecto,  usu.nombre  FROM  miembroproyecto AS mi 
            INNER  JOIN  proyecto AS pro
            ON pro.id_proyecto=mi.proyectoId
            INNER JOIN usuario AS usu
            ON  usu.id_usuario=mi.usuario_miembroid`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },
    ListaMiembrosProyecto:(data, callback) => {
        if(connection) {
            let sql = `SELECT   mi.id,u.nombre,u.apellido,u.correo,r.nombre  as nombre_rol,mi.proyectoId,mi.usuario_miembroid FROM miembroproyecto  AS mi
            INNER JOIN proyecto AS p
            ON mi.proyectoId =p.id_proyecto
            INNER JOIN usuario AS u
            ON mi.usuario_miembroid=u.id_usuario
            INNER JOIN rol AS r
            ON mi.rolId =r.id_rol
            WHERE p.id_proyecto= ${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },
    AgregarMiembro : (data, callback) => {
        if(connection) {
            let sqle= `select *  from  miembroproyecto where usuario_miembroid=${connection.escape(data.usuario_miembroid)} and proyectoId=  ${connection.escape(data.proyectoId)}`           
            connection.query(sqle, (error,result, rows) => {
                if(error) throw error               
                 var count =result.length;
                  if(count==0){                     
                  let sql = `INSERT INTO  miembroproyecto (usuario_miembroid,rolId,proyectoId) VALUES (${connection.escape(data.usuario_miembroid)}, ${connection.escape(data.rolId)},${connection.escape(data.proyectoId)})`
                  connection.query(sql, (error,result, rows) => {
                    if(error) throw error            
                       callback({message : ' insertado miembro, :',estado:'NoExiste'})
                 })
               }else{
                      callback({message : ' miembro Existe, :',estado:'Existe'})
               }               
            })   
        }
    },
    ListaTareasMiembro:(data, callback) => {
        if(connection) {
            let sql = `SELECT  usu.nombre ,t.id_tarea,t.verionID, t.fecha_inicio,t.fecha_termino,t.descripcion,t.porcentajeavance,t.urlevidencia,t.estado ,t.estado1,t.estado2 ,t.respuesta FROM tarea_ecs AS t
            inner JOIN  miembroproyecto AS mi 
            ON t.miembroresponsableID =mi.id
            INNER JOIN usuario AS  usu
            on usu.id_usuario=mi.usuario_miembroid
            WHERE t.miembroresponsableID = ${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },   
    ObtenerJefeProyecto:(data, callback) => {
        if(connection) {
            let sql = `SELECT mi.id, usu.id_usuario, usu.nombre,usu.apellido,usu.tiposusuarioId,ti.id_tipo,ti.nombre as tiposusuario  from usuario  as usu
            INNER JOIN  tipousuario AS ti
            ON usu.tiposusuarioId =ti.id_tipo
            INNER JOIN miembroproyecto  mi 
            ON mi.usuario_miembroid =usu.id_usuario         
            WHERE  mi.usuario_miembroid =${connection.escape(data.usuario_miembroid)}  AND mi.proyectoId=${connection.escape(data.proyectoId)} `
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows[0])
            })
        }
    }, 

    ObtenerJefeProyecto2:(data, callback) => {
        if(connection) {
            let sql = `SELECT mi.id, usu.id_usuario, usu.nombre,usu.apellido,usu.tiposusuarioId,ti.id_tipo,ti.nombre as tiposusuario  from usuario  as usu
            INNER JOIN  tipousuario AS ti
            ON usu.tiposusuarioId =ti.id_tipo
            INNER JOIN miembroproyecto  mi 
            ON mi.usuario_miembroid =usu.id_usuario  
            WHERE ti.nombre='Jefe'    AND mi.proyectoId=${connection.escape(data.proyectoId)} `
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows[0])
            })
        }
    }, 

}
module.exports = dataModels
