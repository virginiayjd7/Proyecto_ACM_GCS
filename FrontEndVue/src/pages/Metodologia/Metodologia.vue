<template>
   <q-page class="q-pa-md">
 <h5>Metodologias </h5> 
          <q-btn color="primary" style="width: 150px"  @click="DialogMetodologia=true">
         <div class="ellipsis">
            Agregar
            </div>            
         </q-btn>


        <div class="q-pa-md row items-start q-gutter-md"  >
           <!--  <q-select outlined v-model="metodologiaId" :options="lista" label="nombre"  />-->
           <div class="col-3" v-for="item in lista" :key="item.key"  >   
          <q-card
              class="my-card "           
                  >
              <q-card-section>
              
                <center>     <div class="text-h6">Metodologia</div>   <div class="text-subtitle2">{{item.nombre}}</div></center>
           
              </q-card-section>

              <q-card-section class="q-pt-none">
                  <q-img  src="../../assets/logometo.png" />
              </q-card-section>
              <q-card-actions align="around">
                <q-btn flat @click="Detalle(item.id_metodologia+'-'+item.nombre)">Ver</q-btn>
                <q-btn flat  @click="Mensaje">Borrar</q-btn>
         </q-card-actions>
        </q-card>
        </div>
     </div>

       <metodologia-nueva @CerrarModal="CerrarModal" :DialogMetodologia="DialogMetodologia" v-on:Listar-Emit="ListarMetodologia"></metodologia-nueva>

    </q-page>
</template>
<script>
import MetodologiaNueva from './MetodologiaNueva';
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

export default {
  name: 'metodologia',
      components: { MetodologiaNueva},
  data(){
      return{
          lista:[],
          metodologiaId:'',
          DialogMetodologia:false,
          DialogoModificar:false,    
          nombre:'',  
      }
  },
  created(){
      this.ListarMetodologia();
  },
  methods:{
      ListarMetodologia(){
         // this.$axios.get()
         let  me=this;
         this.$axios.get('metodologia/ListarTodas/').then(response => {
             console.log(response.data)
                    me.lista = response.data;             
                }).catch(function (error) {
                      console.log(error);
              }) .finally(() => {
         })
      },
       Detalle(item){       
           this.$router.push({name:"fases",params:{item} });        
      }, 
        CerrarModal() {
                  this.DialogMetodologia = false;
                  this.DialogoModificar = false;                     
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
