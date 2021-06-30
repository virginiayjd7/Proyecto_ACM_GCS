'use strict'

const connection = require('../../config/connection')

var dataModels = {
   
    Listar : (callback) => {
        if(connection) {
            let sql = `SELECT * FROM  rol`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },  
      
}

module.exports = dataModels
