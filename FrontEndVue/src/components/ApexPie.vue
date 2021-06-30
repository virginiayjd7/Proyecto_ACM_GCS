<template>
<div>

  <div class="row">
    <div  class="col-5" v-for="item in agrupados" :key="item.key">        
         <q-chip   dense color="orange" text-color="white" icon-right="star">
           
          {{item.nombre_proyecto}}
      </q-chip>
    
    <apexchart type="donut" height="211" :options="agrupados[item.index].charOptions"  :series="agrupados[item.index].series"  />
  </div>
      </div>

     
  </div>

  
</template>


<script>

import moment from 'moment'
import axios from  'axios';


export default {
  name: 'ApexPie',
  components: {   },  

  data() {
    return {
       fields: [           
                { label:"Fase", key: 'nombre', sortable: false }, 
                { label:"Descripcion", key: 'descripcion', sortable: false },   
                { label:"Estado", key: 'estado', sortable: false },
                ],
        DialogoDetalle:false,       
        indexproyecto:'',
        ArrayOptions:[],
        listaTareas:[], 
        agrupados2:[],
        agrupados:[],
        proyectos:[],       
        estadotarea:'',
        idpro:'',
    

        
        }
      },
      created(){ 
      //  this.Lista();
         this.ListarListaTareas();
         this.ListaDeProyectos2();      
         
      },     
       methods: { 
         Lista(){      
              this.$axios.get('Proyecto/Listar/').then(response => {  
                    response.data.forEach(item=>{
                         // this.series[0].data.push(parseInt(item.porcentaje));
                          this.chartOptions.xaxis.categories.push(item.nombre_proyecto); 
                    })

                    }).catch(function (error) {
                            console.log(error);
                  }) .finally(() => {                          
             })   
         },
          ListarListaTareas(){
                   let me=this;                     
                        this.$axios.get('Tarea/ListaTotalTarea').then(response => {                             
                              me.ArrayOptions=response.data; 
                           }).catch(function (error) {
                                console.log(error);
                        }) .finally(() => {                              
                   })
           },         

           ListaDeProyectos2(){
                  let me=this;   
                   this.$axios.get('Proyecto/Listar/').then(response => {   
                    // if ()  
                       me.agrupados = response.data;     
                       ///:options="agrupados[item.index].charOptions"  :series="agrupados[item.index].series" 
                       console.log(response.data);                
                       for(var i=0;i< me.ArrayOptions.length ;i++){
                            for  (var e=0;e< me.agrupados.length ;e++){
                                if(me.ArrayOptions[i].id_proyecto==me.agrupados[e].id_proyecto){   
                                      me.agrupados[e].series.push(parseInt(me.ArrayOptions[i].cantidad))
                                      me.agrupados[e].charOptions.labels.push(me.ArrayOptions[i].estado); 
                                 }                                
                               }                    
                           } 
                      ///   for (let index = 0; index <  me.agrupados.length; index++) {
                      ///      if ( me.agrupados[index].series.length==0) {                                                      
                       ///         me.agrupados.splice(index,1);                                  
                       ///     } 
                       ///   }                  
                        }).catch(function (error) {
                            console.log(error);
                      }) .finally(() => {                          
                })                      
              
           },
         
            datos(nombreEstado){           
               this.estadotarea=nombreEstado;
               this.idpro=this.indexproyecto;
               this.ListarTareasFase( this.idpro,nombreEstado);              
               this.DialogoDetalle=true;
            },
           dataPointSelectionHandler(e, chartContext, config) { 
              var nombreEstado = config.w.config.labels[config.dataPointIndex] 
              setTimeout(() => {
                 this.datos(nombreEstado);
                }, 3);                              
            },          
           DetalleDialogo(){  
             this.DialogoDetalle=true;
            },
           DetalleGrafico(id_proyecto){
               this.$router.push({name:"detallegrafico",params:{id_proyecto} });              
           },     
           ListarTareasFase(idpro,esta){
             let id_proyecto=idpro;
             let estado=esta;          
             const obj={id_proyecto,estado};
             axios.post('ApiWeb/Consulta.php/',obj).then(response => {                       
               //     console.log(response.data);
                     this.listaTareas=response.data.data;                      
                    }).catch(function (error) {
                          console.log(error);
                    }) .finally(() => {                     
                  })
              },
        
          }, 
    
  
};
</script>