'use strict'

const connection = require('../../config/connection')

var dataModels = {
    AgregarCronograma : (data, callback) => {
        if(connection) {
            let sql = `insert into cronograma(fecha_inicio,fecha_termino,id_proyecto) values 
            (${connection.escape(data.fecha_inicio)}, ${connection.escape(data.fecha_termino)},${connection.escape(data.id_proyecto)})`
            connection.query(sql, (error,result, rows) => {
                if(error) throw error             
                callback({idCronograma : result.insertId})
            })
        }
    }
}

module.exports = dataModels
