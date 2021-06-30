'use strict'

const connection = require('../../config/connection')

var dataModels = {
    AgregarCronogramaFase : (data, callback) => {
        if(connection) {
            let sql = `insert into cronogramafase(coronogramaId,nombre,id_fase,porcentaje,porcentaje_avance) values 
            (${connection.escape(data.coronogramaId)}, ${connection.escape(data.nombre)},${connection.escape(data.id_fase)},${connection.escape(data.porcentaje)},${connection.escape(data.porcentaje_avance)})`
            connection.query(sql, (error,result, rows) => {
                if(error) throw error             
                callback({idCronograma_fase : result.insertId})
            })
        }
    },
    ObtenerCronogramaFase : (data,callback) => {
        if(connection) {
            let sql = `SELECT id_cronograma_fase, porcentaje, porcentaje_avance from  cronogramafase    WHERE id_cronograma_fase= ${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows[0])
            })
        }
    }, 


    UpdatateCronogramaFase : (data,callback) => {
        if(connection) {
            let sql = `UPDATE cronogramafase SET porcentaje_avance= ${connection.escape(data.porcentaje)}  WHERE id_cronograma_fase= ${connection.escape(data.id)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback({message: ' actualizado'})
            })
        }
    }, 

}


module.exports = dataModels
