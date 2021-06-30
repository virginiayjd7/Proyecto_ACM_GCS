'use strict'

const connection = require('../../config/connection')

var dataModels = { 
    AgregarCronogramaElemento : (data, callback) => {
        if(connection) {
            let sql = `insert into cronograma_elemento (id_elemento,nombre_elemento,coronogramaId,id_cronograma_fase)
             values (${connection.escape(data.id_elemento)}, ${connection.escape(data.nombre_elemento)},${connection.escape(data.coronogramaId)},${connection.escape(data.id_cronograma_fase)})`

            connection.query(sql, (error, rows) => {
                if(error) throw error
                //callback({message : ' insertado'})
            })
        }
    },
    Registrar: (data, callback) => {
        if(connection) {
            let sql = `insert into cronograma_elemento (id_elemento,nombre_elemento,coronogramaId,id_cronograma_fase)
             values (${connection.escape(data.id_elemento)}, ${connection.escape(data.nombre_elemento)},${connection.escape(data.coronogramaId)},${connection.escape(data.id_cronograma_fase)})`

            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback({message : ' insertado'})
            })
        }
    },
     
}
module.exports = dataModels
