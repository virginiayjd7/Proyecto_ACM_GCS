<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Editar Tarea</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
       <!--   <q-input outlined   v-model="descripcion" label="nombre tarea" /> -->
          <label style="color: #1A86D0;  font-weight:bold;"> {{descripcion}}</label> 
        </q-card-section>

          <q-card-section style="max-height: 50vh" class="scroll">
              <div v-if="estadotarea2=='Observado'">
                   <div class="q-mt-xl">
                    <q-slider
                    name="speed"
                    v-model="rango"
                    label-always
                    :min="0"
                    :max="100"
                    :step="1"
                      readonly
                    />
                </div>   
              </div>
              <div v-else>              
                   <div class="q-mt-xl">
                    <q-slider
                    name="speed"
                    v-model="rango"
                    label-always
                    :min="0"
                    :max="100"
                    :step="1"                  
                    />
                </div>   
              </div>                                      
            </q-card-section>
        <q-card-section style="max-height: 50vh" class="scroll">
          <q-input outlined     v-model="urlevidencia" label="url evidencia" />
        </q-card-section>
        <q-card-section style="max-height: 50vh" class="scroll">
                    <q-input
            v-model="descripcion_avance"          
            filled
            type="textarea"
            />
        </q-card-section>    
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />        
          <q-btn color="primary" label="Registrar"   @click="RegistrarAvance"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>


import moment from 'moment'
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
export default {
    name: 'tarea-editar',  
    props:{
      DialogoTareaEditar: {       
        type: Boolean,
        required: true,
        default: false
      },id_tarea: [String, String],descripcion: [String, String] ,porcentaje:{type:Number},id_responsable:[String, String],estadotarea:[String,String],estadotarea2:[String,String]  
      
    },
    data() {
        return {
          contador:0,
          CodeMetodologia:'M',
          codigo:'',
          nombre:'',            
          isLoading:false,          
          Show:this.DialogoTareaEditar,
          id_miembro:'',       
          fecha_inicio:'',
          fecha_termino:'',
          miembroreponsableID:'',
          urlevidencia:'',
          rango:this.porcentaje, 
          fecha_actual:moment().format('DD/MM/YYYY'),
          hora_actual:moment().format('HH:mm:ss'),
          estado_tarea:'',
          disabled: false,
          descripcion_avance:'',
          speed: 40,
          
        }
    },
    mounted: function () {
  //    this.rango=this.porcentaje;
     },
    watch: {
      DialogoTareaEditar(){
        this.Show = this.DialogoTareaEditar
      },   
      porcentaje(){
        this.rango = this.porcentaje;
      },  
    },
    created () {    
         
    },
    computed: {
     
    },
    methods: {
            addNumber() {
              let myNumber = this.rango;       
              this.$emit("update-number", myNumber);
            },
            RegistrarAvance(){
                 var estadota='';
                 var estado1='';
                  let id_tarea=this.id_tarea;
                  let urlevidencia=this.urlevidencia;
                  let porcentajeavance=this.rango;    
                if(urlevidencia==""){
                  alert("llenar ulr evidencia")
                  return;
                }
                 if(this.descripcion_avance==""){
                  alert("llenar descripcion")
                  return;
                }
                  if(this.rango==100){
                      estadota="Proceso"
                      estado1="Terminado";
                  }else{
                      estadota="Proceso";
                      estado1="Proceso";
                  }
                  let estado=estadota;  
                  const obj={urlevidencia,porcentajeavance,estado,estado1};
                   this.$axios.put('Tarea/editar/'+id_tarea,obj).then(response => {     
                      console.log(response.data)   
                      this.Confirmacion();
                    
                        this.RegistrarTimeline(estadota);
                        this.ListarTareas(this.id_responsable); 
                  }).catch(function (error) {
                      console.log(error);
                  }) .finally(() => {              
                })                
              // this.RegistrarTimeline(estadota);
            },     
            RegistrarTimeline(estadota){
                  let miembroresponsableID=this.id_responsable;
                  let fecha=this.fecha_actual;
                  let hora=this.hora_actual;    
                  let estado=estadota;   
                  let id_tarea=this.id_tarea;  
                  let descripcion_avance=this.descripcion_avance;  
                  let porcentajeavance=this.rango;  
                  let urlevidencia=this.urlevidencia;

                  const obj={miembroresponsableID,fecha,hora,estado,id_tarea,porcentajeavance,urlevidencia,descripcion_avance};

                   this.$axios.post('Commit/Agregar',obj).then(response => {    
                           console.log(response.data)    
                           this.limpiar();           
                     }).catch(function (error) {
                      console.log(error);
                  }) .finally(() => {              
                })
            },                 
            ListarTareas(id){           
                this.$emit('ListarTareas-Emit',id);
            },  
             onChange(value) {
              console.log('change: ', value);
            },
            onAfterChange(value) {
              console.log('afterChange: ', value);
            },          
            CerrarModal(){              
                 this.$emit('CerrarModal');
            },
            Confirmacion(){
                this.$swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registrado',
                    text:'se ha registrado con exito',
                    showConfirmButton: false,
                    timer: 3000
                })
            },
            limpiar(){
              this.descripcion_avance="";
              this.urlevidencia="";
            }
    }
};
</script>