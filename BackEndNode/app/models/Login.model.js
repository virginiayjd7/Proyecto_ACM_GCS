'use strict'

const connection = require('../../config/connection')

var dataModels = {
   
    Login : (data, callback) => {
     //   console.log("el id : ", data)
        if(connection) {
            let sql = `SELECT usu.id_usuario, usu.nombre,usu.apellido,usu.tiposusuarioId,usu.correo,ti.id_tipo,ti.nombre as tiposusuario  from usuario  as usu
            INNER JOIN  tipousuario AS ti
            ON usu.tiposusuarioId =ti.id_tipo
            where usu.correo = ${connection.escape(data.correo_usuario)} and  usu.password= ${connection.escape(data.password)}`

            connection.query(sql, (error,result, rows) => {
                if(error) throw error
                if (result.length>0) {
                    callback({estado:true,data:result[0]})
                }else{
                    callback({estado:false})
                }
               
            })
        }
    },

   
  
}

module.exports = dataModels
