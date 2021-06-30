'use strict'

const connection = require('../../config/connection')

var dataModels = {
   
    Listar : (callback) => {
        if(connection) {
            let sql = `SELECT usu.id_usuario,usu.nombre,usu.apellido,usu.correo,tipo.nombre as tipousuario  FROM  usuario AS usu 
            INNER  JOIN tipousuario AS tipo
            ON usu.tiposusuarioId =tipo.id_tipo`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },   
    ListaProyectoMiembro: (data, callback) => {      
           if(connection) {
               let sql = `SELECT  mi.id ,ro.nombre,pro.id_proyecto, pro.nombre_proyecto,pro.estado, pro.fecha_inicio,pro.fecha_termino FROM miembroproyecto AS mi 
               INNER JOIN rol AS ro
               ON ro.id_rol =mi.rolId 
               INNER JOIN proyecto AS pro
               ON mi.proyectoId=pro.id_proyecto
               WHERE mi.usuario_miembroid= ${connection.escape(data)}`   
               connection.query(sql, (error, rows) => {
                   if(error) throw error
                   callback(rows)
               })
           }
       }, 
       
       ListaProyectoJefe: (data, callback) => {             
        var series=[];       
        var listaMiembro=[];
        var contador=0;
        var datos= [];    

        if(data==null || data=="")  {
            console.log("llega vacio we")
        }  
        if(connection) {
            let sql = `SELECT  mi.id ,ro.nombre,pro.id_proyecto, pro.nombre_proyecto,pro.estado, pro.fecha_inicio,pro.fecha_termino FROM miembroproyecto AS mi 
            INNER JOIN rol AS ro 
            ON ro.id_rol =mi.rolId 
            INNER JOIN proyecto AS pro 
            ON mi.proyectoId=pro.id_proyecto 
            WHERE mi.usuario_miembroid = ${connection.escape(data)}`   
            connection.query(sql, (error, rows) => {
                if(error) throw error
                     rows.forEach( (row) => {                                     
                        datos.push({
                                id:              row.id,
                                nombre:          row.nombre,
                                id_proyecto:     row.id_proyecto,
                                nombre_proyecto: row.nombre_proyecto,
                                fecha_inicio:    row.fecha_inicio,                              
                                estado:          row.estado,                             
                                listaMiembro:    listaMiembro,
                                fecha_termino:   row.fecha_termino,
                                index:             contador});
                            contador++;    
                        });                                 
                  callback(datos)
            })
        }
    }, 

    RegistrarUsuario : (data, callback) => {
        if(connection) {

            let sqle= `select *  from  usuario where correo=${connection.escape(data.correo)}  `  
            connection.query(sqle, (error,result, rows) => {
                if(error) throw error
                var count =result.length;
                if(count==0){   
                    let sql = `insert into usuario(nombre, apellido,correo,password,tiposusuarioId) values (${connection.escape(data.nombre)}, ${connection.escape(data.apellido)},${connection.escape(data.correo)},
                    ${connection.escape(data.password)},${connection.escape(data.tiposusuarioId)})`
                        connection.query(sql, (error, rows) => {
                            if(error) throw error
                            callback({message : 'Exito, :',estado:'NoExiste'})
                        })
                }else{
                    callback({message : 'Alerta, :',estado:'Existe'})
                }               
            })         
        }
    },
}

module.exports = dataModels
