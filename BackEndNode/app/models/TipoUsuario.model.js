'use strict'

const connection = require('../../config/connection')

var dataModels = {
    
    ListarTipoUsuario : (callback) => {
        if(connection) {
            let sql = `select * from tipousuario`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    }, 
      
}

module.exports = dataModels
