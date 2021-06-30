<template>
  <q-page class="q-pa-md">   
    <div class="q-gutter-y-md">
      <q-card class="cardstyle">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="Tareas" label="Tareas" />
          <q-tab name="terminadas" label="terminadas" />
         
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="Tareas">
            <div class="text-h6">Tareas</div>

              <div class=" row">
                <div class=" q-pa-md col-4" v-for="item in tareas" :key="item.key">
                    <q-card class="my-card cardstyle" flat bordered>
                    <q-card-section horizontal>
                        <q-card-section class="q-pt-xs">
                     
                        <div class="text-h6 q-mt-sm q-mb-xs">{{ item.descripcion }}</div>
                        <div class="text-caption text-grey">
                           <q-badge outline color="primary" :label="item.estado1" />                         
                        </div>
                        </q-card-section>                     
                    </q-card-section>
                      <q-card-section>
                            <label style="float:right">{{item.porcentajeavance}} %</label>
                        <q-linear-progress :value="parseInt(item.porcentajeavance)/100" class="q-mt-md" />
                                          
                        </q-card-section>
                    <q-separator />
                    <q-card-actions>
                        <q-btn flat round icon="event" />
                        <q-btn flat  @click="EditarTarea(item.id_tarea,item.descripcion,item.porcentajeavance,item.estado1,item.estado2)">
                        Editar
                        </q-btn>                        
                    </q-card-actions>
                    </q-card>
                </div>
               </div>

            </q-tab-panel>
          <q-tab-panel name="terminadas">
            <div class="text-h6">Terminadas</div>
               <div class=" row">
                <div class=" q-pa-md col-4" v-for="item in tareasterminadas" :key="item.key">
                    <q-card class="my-card" flat bordered>
                    <q-card-section horizontal>
                        <q-card-section class="q-pt-xs">                     
                        <div class="text-h6 q-mt-sm q-mb-xs">{{ item.descripcion }}</div>
                        <div class="text-caption text-grey">
                           <q-badge outline color="primary" :label="item.estado1" />                         
                        </div>
                        </q-card-section>                     
                    </q-card-section>
                      <q-card-section>
                        <div v-if="item.estado2=='Aprobado'">
                              <q-chip  color="teal" text-color="white" icon="check">
                               {{item.estado2}}
                            </q-chip>
                        </div>
                       <div v-else-if="item.estado2=='Observado'">                            
                             <q-chip  color="orange" text-color="white" icon="directions">
                                   {{item.estado2}}
                              </q-chip>
                        </div>
                           <label style="float:right">{{item.porcentajeavance}} %</label>
                        <q-linear-progress :value="parseInt(item.porcentajeavance)/100" class="q-mt-md" />
                                          
                        </q-card-section>
                    <q-separator />
                    <q-card-actions>
                        <q-btn flat round icon="event" />
                        <q-btn flat  @click="openModal(item.id_tarea)">
                          Ver
                        </q-btn>    
                         <q-btn flat v-if="item.estado2=='Observado'"  @click="EditarTarea(item.id_tarea,item.descripcion,item.porcentajeavance,item.estado1,item.estado2)">
                          Editar
                        </q-btn>                      
                    </q-card-actions>
                    </q-card>
                </div>
               </div>
          </q-tab-panel>         
        </q-tab-panels>
      </q-card>
    </div>    

     <q-dialog v-model="showModal" >
      <q-card style="max-width: 500px;width:500px;height:150px">
        <q-card-section>
          <div class="text-h6">Mensaje</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>{{respuesta}}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


   <tarea-editar @CerrarModal="CerrarModal" :DialogoTareaEditar="DialogoTareaEditar" v-bind:id_tarea="id_tarea"  v-bind:id_responsable="id_responsable" v-bind:descripcion="descripcion"  v-bind:porcentaje="porcentaje" v-bind:estadotarea="estadotarea"  v-bind:estadotarea2="estado2"  @update-number="update"  v-on:ListarTareas-Emit="ListarTareas" ></tarea-editar>
   

 </q-page>
</template>

<script>


import axios from  'axios';

import TareaEditar from './TareaEditar';
export default {
    name: 'tarea-usuario',
     components: {  TareaEditar},
    data(){
        return{
              tab:'Tareas',
              tareas:[],
              tareasterminadas:[],
              DialogoTareaEditar:false,
              idtipousuario:'',
              id_tarea:'',
              descripcion:'',
              porcentaje:null,
              id_responsable:'',
              respuesta:'',
              estadotarea:'',
              showModal:false,
              estado2:'',
             
        }
    },
    created () {
      //  this.ListarTareas();
    },
    mounted() {
         this.GetDatos() 
    },
    methods: {
       update(num){
            console.log(num)
        },
      GetDatos(){
           var id = this.$route.params.id
             if(id){        
                 this.id_responsable=id;
                 this.ListarTareas(id);                  
            }      
       },
       ListarTareas(id){ 
             let me=this;         
             var elementos=[];
             me.tareasterminadas=[];
             me.tareas=[];
             this.$axios.get('Miembro/TareasMiembro/'+id,).then(function(response){   
              console.log(response.data)   
                response.data.forEach(elem => {
                    if (elem.estado1=="Terminado") {
                         me.tareasterminadas.push({
                             id_tarea:elem.id_tarea,
                             descripcion: elem.descripcion,
                             porcentajeavance: elem.porcentajeavance,
                             fecha_inicio:elem.fecha_inicio,
                             fecha_termino: elem.fecha_termino,
                             estado:elem.estado,   
                             estado1:elem.estado1, 
                             estado2:elem.estado2,                  
                          })
                 }else{
                         me.tareas.push({
                             id_tarea:elem.id_tarea,
                             descripcion: elem.descripcion,
                             porcentajeavance: elem.porcentajeavance,
                             fecha_inicio:elem.fecha_inicio,
                             fecha_termino: elem.fecha_termino,
                             estado:elem.estado,  
                             estado1:elem.estado1, 
                             estado2:elem.estado2,                  
                       })
                 }
               
              });                                     
              }).catch(function(error){
                  console.log(error);
           });       
        },
        openModal(id_tarea){
             console.log(id_tarea);
           //  this.$refs['my-modal'].show()
             let me=this;
             me.showModal=true;
             this.$axios.get('Tarea/VerMensaje/'+id_tarea).then(response => {   
               console.log(response.data)
                 me.respuesta=response.data.respuesta;      
               }).catch(function (error) {
                    console.log(error);
              }) .finally(() => {
           })
        },      
        EditarTarea(idtarea,descripcion,porcentaje,estado1,estado2){
            this.id_tarea=idtarea;
            this.descripcion=descripcion;
            this.porcentaje=parseInt(porcentaje);
            this.estadotarea=estado1;
            this.estado2=estado2;
            console.log(porcentaje)
            this.DialogoTareaEditar=true;
        },
        CerrarModal(){
             this.DialogoTareaEditar=false;
        }
    }
}
</script>

