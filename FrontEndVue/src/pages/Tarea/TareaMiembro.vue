<template>
   <q-page class="q-pa-md">

       <div class="row"  >
            <div class="q-pa-md col-6" v-for="item in proyectos" :key="item.key">
            <q-card class="my-card cardstyle">
      <q-card-section>
            <div class="text-h6">{{item.nombre_proyecto}}            
            </div>
      </q-card-section>   
            
      <q-card-section>                
                <div ><q-chip square color="orange" text-color="white" >
                {{item.estado}}
                   </q-chip>   
            </div>
              Rol :  <label>{{item.nombre}}</label>  <br> <br>
               <div  style=" display: flex;" >

               </div>  

            <div class="text-subtitle2">Fecha Inicio :  {{item.fecha_inicio}}</div>
            <div class="text-subtitle2">Fecha Fin :  {{item.fecha_termino}}</div>
             <q-btn outline color="primary"  style="float:right" label="Detalle" @click="Ver(item.id)" />
                        
              <br>
         </q-card-section>
         <br>
      </q-card>
     </div>
    </div>    
 </q-page>
</template>


<script>
import axios from  'axios';
//import TareaEditar from './TareaEditar';
export default {
    name: 'tarea-usuario',
     components: {  },
    data(){
        return{
              tareas:[],            
              DialogoTareaEditar:false,
              idtipousuario:'',
              idusuario:'',
              proyectos:[],
        }
    },
    created () {
      //  this.ListarTareas();
    },
    mounted() {
     if(localStorage.idtipo) this.idtipousuario = localStorage.idtipo;
      if(localStorage.idtipo) this.idusuario = localStorage.id_usuario;
       this.ListarPoryectos(this.idusuario);   
    },
    methods: {
        ListarPoryectos(idtipousuario){
              let me=this;
            //  console.log(idtipousuario);
              this.$axios.get('Usuario/Proyectos/'+idtipousuario).then(response => {                    
                      me.proyectos = response.data;     
                      console.log(response.data)                 
                  }).catch(function (error) {
                      console.log(error);
                 }) .finally(() => {                     
            })
        },
       
        Ver(id){
             this.$router.push({name:"tareasdetallemiembro",params:{id} });
        },
        EditarTarea(){
            this.DialogoTareaEditar=true;
        },
        CerrarModal(){
             this.DialogoTareaEditar=false;
        }
    }
}
</script>
<style>
.cardstyle{
  border: 1px solid #1A86D0;
}
</style>