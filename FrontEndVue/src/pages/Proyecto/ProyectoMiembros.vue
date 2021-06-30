<template>
     <q-page class="q-pa-md">
        <h5>Miemros Proyecto </h5>       
         
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
                    <div class="text-overline">Miembro</div>
                    <div class="text-h5 q-mt-sm q-mb-xs"> {{item.nombre}}</div>
                    <div class="text-caption text-grey">
                      {{item.nombre_rol}}
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
  </q-page>
</template>


<script>

import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);


export default {
    components: {   },

    data(){
        return{  
              DialogoModificar:false,
              DialogUsuario:false,
              nombremiembro:'',
              search: '',
              items:[],
              id:'',
             }
      },
      created(){
        
          },
      mounted(){
          this.GetDatos()
          },
      computed: {
            ListaFiltro() {
                return this.items.filter(post => {
                return post.nombre.toLowerCase().includes(this.search.toLowerCase())
            })
          }
      },
      methods:{
          GetDatos(){
            var item = this.$route.params.idproyecto
              if(item){        
                  this.ListarMiembrosProyecto(item);                   
              }   
          },
          AbrirDialogo(id,nombre){
            this.id=id;
            this.nombremiembro=nombre;
            this.DialogoModificar=true;  

          },
          ListarMiembrosProyecto(id){
                let me=this;
                this.$axios.get('Miembro/MiembroProyecto/'+id).then(response => {                         
                     me.items = response.data;   
                      console.log(response.data)       
                    }).catch(function (error) {
                            console.log(error);
                    }) .finally(() => {
                })
            },
            CerrarModal() {
                this.DialogUsuario = false;
                this.DialogoModificar=false;             
            },          
             Tareas(id_proyecto){              
                this.$router.push({name:"miembrotareas",params:{id_proyecto} });
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
