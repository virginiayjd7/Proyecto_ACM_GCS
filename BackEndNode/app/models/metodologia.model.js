'use strict'

const connection = require('../../config/connection')

var dataModels = {
    Listar : (callback) => {
        if(connection) {
            let sql = `	SELECT  pla.metodologiaId,me.nombre FROM plantillaelementoconfiguracion AS pla
            INNER JOIN metodologia AS me
            ON pla.metodologiaId=me.id_metodologia
            GROUP BY pla.metodologiaId`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },
    ListarTodas : (callback) => {
        if(connection) {
            let sql = `	SELECT  * FROM metodologia`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },
    FasesMetodologia : (data, callback) => {
    //    console.log("el id : ", data)
        var tabla=[];
        var Lista=[];
        var contador=0;
        if(connection) {
            let sql = `SELECT f.id_fase,f.nombre_fase,me.nombre,me.id_metodologia FROM fase AS f
            INNER JOIN metodologia AS me
            ON f.metodologiaId=me.id_metodologia
            WHERE me.id_metodologia= ${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                rows.forEach( (row) => {                                     
                    Lista.push({
                        id_fase:           row.id_fase,
                        nombre_fase:       row.nombre_fase,
                        nombre:            row.nombre,
                        id_metodologia:    row.id_metodologia,                        
                        index:             contador,
                        tabla :            tabla
                      });
                    contador++;    
                }); 
                callback(Lista)
            })
        }
    },
    AgregarMetodologia : (data, callback) => {
        if(connection) {
            let sqle= `select *  from  metodologia where nombre=${connection.escape(data.nombre)}`   
            
            connection.query(sqle, (error,result, rows) => {
                if(error) throw error     
                
                var count =result.length;
                if(count==0){  
                    let sql = `INSERT INTO metodologia (nombre) 
                    values (${connection.escape(data.nombre)})`
                    connection.query(sql, (error,result, rows) => {
                        if(error) throw error               
                        callback({message : ' insertado metodologia, :',estado:'NoExiste'})
                    })
                
                }else{
                    callback({message : 'Alto, :',estado:'Existe'})
                }
               
            })

           
        }
    },   
}

module.exports = dataModels
