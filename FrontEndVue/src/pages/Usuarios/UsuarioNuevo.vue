<template>
      <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Nueva Usuario</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
         <q-input outlined v-model="nombre" label="Nombre" />
         <br>
         <q-input outlined v-model="apellido" label="Apellido" />
        </q-card-section>
         
     <q-card-section style="max-height: 50vh" class="scroll">        
         <q-input outlined v-model="correo" label="correo" />
      </q-card-section>
          <q-card-section>
            <q-select outlined v-model="id_tipo_usuario" :options="tipoUsuario" label="tipo usuario" map-options />
        </q-card-section>

         <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
       
            <q-btn color="primary" label="Registrar" @click="RegistrarUsuario" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);


export default {
    name: 'usuario-nuevo',
    props:{
      DialogUsuario: {
        type: Boolean,
        required: true,
        default: false
      },
      
    },
    data() {
        return {
          codigo:'',
          nombre:'',
          apellido:'',
          correo:'',
          rol:'',            
          isLoading:false,          
          Show:this.DialogUsuario,
          tipoUsuario:[],
          id_tipo_usuario:'',

        }
    },
    watch: {
      DialogUsuario(){
        this.Show = this.DialogUsuario
      }
    },
    created () {
          this.ListarTipoUsuario();
    },
    computed: {
     
    },
    methods: {
       ListarTipoUsuario(){
                  let me=this;
                  var tipos=[];
                  this.$axios.get('TipoUsuario/ListarTipoUsuario').then(function(response){                      
                  tipos=response.data;    
                  console.log(response.data);              
                  tipos.map(function(x){
                      if (x.nombre!="Administrador"){
                         me.tipoUsuario.push({label: x.nombre,value:x.id_tipo});
                      }                       
                 });  
              }).catch(function(error){
                  console.log(error);
              });
         },
         RegistrarUsuario(){
          let nombre=this.nombre;
          let apellido=this.apellido;
          let correo=this.correo;
          let password="123456";
          let tiposusuarioId=this.id_tipo_usuario.value;             
          const obj={nombre,apellido,correo,password,tiposusuarioId};
            this.$axios.post('Usuario/RegistrarUsuario',obj).then(response => {                       
                  var estado =response.data.estado;
                 this.CerrarModal(); 
                  if(estado=="Existe"){
                       this.Existe();
                  }else{
                      this.Confirmacion();
                      this.ListarUsuarios();
                  }                  
                }).catch(function (error) {
                      console.log(error);
                }) .finally(() => {                     
              })
         },       
         Existe(){
          Swal.fire({
            title: '<strong>Alerta </strong>',
            icon: 'info',
            html:
              'Este correo ya esta en uso ' ,          
          })
       },           
       Confirmacion(){
            this.$swal({
                position: 'top-end',
                icon: 'success',
                title: 'Registrado',
                text:'texto',
                showConfirmButton: false,
                timer: 3000
              })
          },
          ListarUsuarios(){
             this.$emit('Listar-Emit-Usuario');
           },
          CerrarModal(){                       
              this.$emit('CerrarModal');
          }
    }
};
</script>