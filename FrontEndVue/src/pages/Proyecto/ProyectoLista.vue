<template>
     <q-page class="q-pa-md">
        <h5> Proyectos </h5>             
     <q-btn color="primary" style="width: 150px"  @click="ProyectoNuevo">
         <div class="ellipsis">
            Agregar
            </div>            
      </q-btn>

     <div class="row"  >
            <div class="q-pa-md col-6" v-for="item in items" :key="item.key">
            <q-card class="my-card cardstyle">
            <q-card-section>
            <div class="text-h6">{{item.nombre_proyecto}} 
            <div class="float-right">
            <q-btn-dropdown    
                        color="teal"                        
                        @click="onMainClick"
                        >
                <q-list>
                    <q-item clickable v-close-popup >
                    <q-item-section avatar>
                       <q-icon name="account_circle" class="big-icon" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label @click="AbrirDialogo(item.id_proyecto)">Nuevo Miembro</q-item-label>                     
                    </q-item-section>                   
                    </q-item>
                    <q-item clickable v-close-popup >
                    <q-item-section avatar>
                        <q-icon name="vertical_split" class="big-icon" />                        
                    </q-item-section>
                    <q-item-section>
                        <q-item-label @click="Miembros(item.id_proyecto)" >Miembros</q-item-label>                       
                    </q-item-section>                   
                    </q-item>
                </q-list>
              </q-btn-dropdown>
          </div>
        </div>
      </q-card-section>      
      <q-card-section>                
                <div ><q-chip square color="orange" text-color="white" >
                {{item.estado}}
            </q-chip>   
            </div>
            <div class="text-subtitle2">Fecha Inicio :  {{item.fecha_inicio}}</div>
            <div class="text-subtitle2">Fecha Fin :  {{item.fecha_termino}}</div>
                    <q-btn outline color="primary"  style="float:right" label="Detalle" @click="IrProyectoDetalle(item.id_proyecto)" />
                <div class="row">
                  <div  style=" display: flex;" v-for="miembro in items[item.index].listaMiembro" :key="miembro.key">   
                  <q-chip>
                        <q-avatar>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                        {{miembro.nombre}}
                    </q-chip>
                 </div>
                 </div>          
                  <br>
         </q-card-section>
      </q-card>
     </div>
    </div>       

          <miembro-nuevo @CerrarModal="CerrarModal"   v-bind:idproyecto="idproyecto" v-bind:id_usuario_jefe="idusuario"   :DialogMiembro="DialogMiembro"  v-on:Listar-Proyecto-Emit="ListarPoryectosUsuario"> </miembro-nuevo>
  </q-page>
</template>


<script>
import MiembroNuevo from '../../pages/Miembro/MiembroNuevo';
export default {
        components: { MiembroNuevo },
        data () {
            return {
                 listaMiembros:[],
                 items:[],
                  DialogMiembro:false,
                  idusuario:'',
                  id_elemento:'', 
                  idproyecto:'',   
                  idtipousuario:'',
            
            }
        },
        mounted(){
             //   this.GetDatos()
                  if(localStorage.idtipo) this.idtipousuario = localStorage.idtipo;
                   if(localStorage.idtipo) this.idusuario = localStorage.id_usuario;
                    this.ListarPoryectosUsuario(this.idusuario);  
        },
        created(){
            //  this.ListarProyecto();
        },
        methods:{
            ProyectoNuevo(){
                  this.$router.push({name:"proyectonuevo" });   
            },           
            ListarPoryectosUsuario(id){
             let me=this;
                if (id=="") {                  
                    alert("llega vacio")
                    return;
                }
             this.$axios.get('Usuario/ListaProyectoJefe/'+id).then(response => {                    
                      me.items = response.data;  
                     console.log(response.data);   
                      me.LisrarMiembrosProyecto();                 
                  }).catch(function (error) {
                      console.log(error);
                }) .finally(() => {                     
                })
              
           },    
           LisrarMiembrosProyecto(){
              let me=this;              
               this.$axios.get('Miembro/Listar').then(response => {                    
                      me.listaMiembros = response.data; 
                      //console.log(response.data)                        
                        for(var i=0;i< me.items.length ;i++){
                            for  (var e=0;e< me.listaMiembros.length ;e++){
                                if(me.items[i].id_proyecto==me.listaMiembros[e].id_proyecto){  
                                      me.items[i].listaMiembro.push({ nombre: me.listaMiembros[e].nombre,inicial:me.listaMiembros[e].inicial})
                                    
                                   } 
                               }                    
                           } 
                  }).catch(function (error) {
                      console.log(error);
                }) .finally(() => {                     
              })
           },
           CerrarModal() {
                  
                 this.DialogMiembro = false;    
           },
           onMainClick () {
            // console.log('Clicked on main button')
            },
            IrProyectoDetalle(id_proyecto){
                 this.$router.push({name:"proyectodetalle",params:{id_proyecto}}); 
                 // this.$router.push({name:"fases",params:{item} }); 
            },
            AbrirDialogo(id){
              ///  alert(id)
             this.DialogMiembro=true,
             this.idproyecto=id;
            //this.idproyecto=parseInt(this.idproyecto)
            //proyectomiembros
           },
            Miembros(idproyecto){           
             this.$router.push({name:"proyectomiembros",params:{idproyecto} });
             },
          

        }
}
</script>
