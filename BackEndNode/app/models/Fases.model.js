'use strict'

const connection = require('../../config/connection')

var dataModels = { 
    AgregarFase : (data, callback) => {
        if(connection) {

            let sqle= `select *  from  fase where nombre_fase=${connection.escape(data.nombre_fase)} and  metodologiaId= ${connection.escape(data.metodologiaId)}`  
            connection.query(sqle, (error,result, rows) => {
                if(error) throw error
                var count =result.length;
                if(count==0){   
                    let sql = `insert into fase(nombre_fase, metodologiaId) values (${connection.escape(data.nombre_fase)}, ${connection.escape(data.metodologiaId)})`

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
