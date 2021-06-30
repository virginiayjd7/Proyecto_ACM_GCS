'use strict'

const connection = require('../../config/connection')

var dataModels = {
   
    AgregarPlantillaElemento : (data, callback) => {
        if(connection) {          
            let sqle= `select *  from  plantillaelementoconfiguracion where faseId=${connection.escape(data.faseId)} and  elementoId= ${connection.escape(data.elementoId)} and metodologiaId =${connection.escape(data.metodologiaId)} `  
            connection.query(sqle, (error,result, rows) => {
                if(error) throw error
                var count =result.length;
                if(count==0){   
                    let sql = `insert into plantillaelementoconfiguracion (faseId, elementoId,metodologiaId) values (${connection.escape(data.faseId)}, ${connection.escape(data.elementoId)},${connection.escape(data.metodologiaId)})`
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
    ListarPlantillaElemento: (callback) => {   
      
        if(connection) {
            let sql = `SELECT pla.id_plantilla, ele.id_elemento, ele.nombre,fa.id_fase,fa.nombre_fase  FROM plantillaelementoconfiguracion AS pla
            INNER JOIN elementoconfiguracion AS ele
            ON pla.elementoId=ele.id_elemento
            INNER JOIN fase AS fa
            ON pla.faseId=fa.id_fase`;
            connection.query(sql, (error, rows) => {
                if(error) throw error               
                callback(rows)
               
            })
        }
    },
    ListaElementosFase : (data, callback) => {
  
        if(connection) {
            let sql = `SELECT   pla.id_plantilla, fa.id_fase,fa.nombre_fase,el.id_elemento,el.nombre  FROM  plantillaelementoconfiguracion AS pla
            INNER JOIN fase AS fa 
            ON pla.faseId=fa.id_fase
            INNER JOIN elementoconfiguracion AS el
            ON pla.elementoId=el.id_elemento
            WHERE fa.id_fase= ${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },   
}

module.exports = dataModels
