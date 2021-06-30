<template>
      <q-page class="q-pa-md">
        <h5>Usuarios </h5>       
          <q-btn color="primary" style="width: 150px" @click="DialogUsuario=true">
          <div class="ellipsis">
            Nuevo Usuario
          </div>
    </q-btn>
     <br><br>
         <div class=" row"  >
           <div class=" q-pa-md col-4" v-for="item in items" :key="item.key"  >   
           <q-card class="my-card" flat bordered>
                <q-card-section horizontal>
                      <q-card-section class="col-5 flex flex-center">
                    <q-img
                        class="rounded-borders"
                        src="https://cdn.quasar.dev/img/boy-avatar.png"
                    />
                    </q-card-section>
                    <q-card-section class="q-pt-xs">
                    <div class="text-overline">Usuario</div>
                    <div class="text-h5 q-mt-sm q-mb-xs"> {{item.nombre}}</div>
                    <div class="text-caption text-grey">
                      {{item.tipousuario}}
                    </div>
                    </q-card-section>                  
                </q-card-section>
           <q-separator />
            <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn flat>
                Editar
                </q-btn>
                <q-btn flat color="primary" @click="Mensaje">
                Eliminar
                </q-btn>
            </q-card-actions> 
     </q-card>
        </div>
     </div>   

        <usuario-nuevo @CerrarModal="CerrarModal" :DialogUsuario="DialogUsuario" v-on:Listar-Emit-Usuario="ListaUsuarios" ></usuario-nuevo>
    

  </q-page>
</template>


<script>

import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);


import UsuarioNuevo from './UsuarioNuevo';

export default {
 components: {   UsuarioNuevo},

 data(){
     return{
          items:[],
          DialogUsuario:false,
              }
 },
 created(){
      this. ListaUsuarios();   
    },
 methods:{
       CerrarModal() {
           this.DialogUsuario = false;             
       },
       ListaUsuarios(){
           let me=this;
              this.$axios.get('Usuario/Listar').then(response => {                     
                      me.items = response.data;       
                      console.log(response.data)               
                  }).catch(function (error) {
                      console.log(error);
                  }) .finally(() => {
                     
            })
       },     
       Tareas(){
         // this.$router.push('/app/usuariotareas');
       },
         Mensaje(){
                Swal.fire({
                    title: 'Desea Eliminar?',
                    text: "ya no se podra revertir!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, eliminar!'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                    }
                    })
            }
       
  }

}
</script>