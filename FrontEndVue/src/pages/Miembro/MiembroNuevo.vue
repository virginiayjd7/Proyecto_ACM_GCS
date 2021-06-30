<template>
    <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Nuevo Miembro</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
             <q-select filled  v-model="id_usuario"  :options="usuarios" label="Elija el usuario" map-options />
         <br>
          <q-select filled v-model="id_rol" :options="roles" label="Elija el Rol" map-options />
        </q-card-section>
         
       
         <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
         <!-- <q-btn flat label="Accept" color="primary" v-close-popup />
          -->
        
            <q-btn color="primary" label="Registrar"  @click="RegistrarMiembro" />
        </q-card-actions>
        
      </q-card>
    </q-dialog>
  </div>
</template>


<script>

//DialogMetodologia
import Vue from 'vue';
import axios from  'axios';
import Swal from 'sweetalert2'

import VueSweetalert2 from 'vue-sweetalert2'; 
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
export default {
    name: 'miembro-nuevo',
    props:{
      DialogMiembro: {       
        type: Boolean,
        required: true,
        default: false
      }, idproyecto: [Number, Number],id_usuario_jefe: [String, String]
      
    },
    data() {
        return {
          contador:0,
          CodeMetodologia:'M',
          codigo:'',
          nombre:'',            
          isLoading:false,          
          Show:this.DialogMiembro,         
          usuarios:[],
          roles:[],
          id_rol:'',
          id_usuario:'',
           model: null,
              options: [
            'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
           ]
         
        }
    },
    watch: {
      DialogMiembro(){
        this.Show = this.DialogMiembro
      }
    },
    created() {    
          this.ListarUsuario();
          this.ListarRoles();
    },
    computed: {
     
    },
    methods: {
      RegistrarMiembro(){    
          let me =this;     
          let usuario_miembroid=me.id_usuario.value;     
          let rolId=me.id_rol.value;     
          let proyectoId=me.idproyecto;   
          const obj={usuario_miembroid:usuario_miembroid,rolId:rolId,proyectoId:proyectoId};
          this.$axios.post('Miembro/Registrar',obj).then(response => {                     
              me.CerrarModal()            
              var estado=response.data.estado;
              if (estado=="Existe"){
                 me.ExisteMiembro(); 
              } else{
                me.Confirmacion();  
                me.ListarProyectos(me.id_usuario_jefe);
              }
                                
          }).catch(function (error) {
              console.log(error);
          }) .finally(() => {
              
          })
      },
      ListarProyectos(id_usuario_jefe){
          this.$emit('Listar-Proyecto-Emit',id_usuario_jefe);
      },   
      Datos(){
        alert(this.id_rol.value)
      },
      ListarUsuario(){
                  let me=this;
                  var elementos=[];
                   this.$axios.get('Usuario/Listar').then(function(response){                      
                  elementos=response.data;             
                  elementos.map(function(x){
                    if(x.tipousuario=="Miembro"){
                         me.usuarios.push({label: x.nombre,value:x.id_usuario});
                   }                      
                 });  
              }).catch(function(error){
                  console.log(error);
           });       
      },  
      ListarRoles(){
             let me=this;
                  var elementos=[];
                   this.$axios.get('Rol/Listar',).then(function(response){                      
                  elementos=response.data;             
                  elementos.map(function(x){
                    if (x.nombre!="Jefe de Proyecto"){
                         me.roles.push({label: x.nombre,value:x.id_rol});
                    }                        
                 });  
              }).catch(function(error){
                  console.log(error);
           });       
       },         
       CerrarModal(){              
              this.$emit('CerrarModal');
       },     
       ExisteMiembro(){
          Swal.fire({
            title: '<strong>Alerta </strong>',
            icon: 'info',
            html:
              'Este usuario ya es miembro ' ,          
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
    }
};
</script>
<style scoped>
  ::v-deep .myDiv {
    background-color: 	#FFFFFF;
  }

</style>

