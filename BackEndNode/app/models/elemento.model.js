'use strict'

const connection = require('../../config/connection')

var dataModels = {
    AgregarElemento : (data, callback) => {
        if(connection) {

            let sqle= `select *  from  elementoconfiguracion where codigo_elemento=${connection.escape(data.codigo_elemento)} and  nombre= ${connection.escape(data.nombre)} `  
            connection.query(sqle, (error,result, rows) => {
                if(error) throw error
                var count =result.length;
                if(count==0){   
                    let sql = `insert into elementoconfiguracion(codigo_elemento, nombre) values (${connection.escape(data.codigo_elemento)}, ${connection.escape(data.nombre)})`
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
    Listar : (callback) => {
        if(connection) {
            let sql = `select * from elementoconfiguracion`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    }, 
      
}

module.exports = dataModels
