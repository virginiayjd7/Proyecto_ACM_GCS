<template>
  <q-page class="q-pa-md">
      
    <q-card class="my-card cardstyle">
      <q-card-section>
        <div>
      
           <label for=" " style="font-size: 18px;  font-weight:bold;">{{nombre_elemento}}</label>
        
          <br />
          <br>
         <div class="row">
            <div class="col-4">
                <label for="" style="color: #1A86D0;  font-weight:bold;">Fase</label> <br>
                <label for="">{{nombre_fase}}</label>

            </div>
            <div class="col-4">
                   <label for="" style="color: #1A86D0;  font-weight:bold;">Proyecto</label> <br>
                <label for="">{{nombre_proyecto}}</label>
            </div>         
         
            </div>
        </div>
        <br>
        
      </q-card-section>
    </q-card>

    <br />  

  
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
          <q-tab name="alarms" label="Alarms" />
         
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="Tareas">
            <div class="text-h6">Tareas</div>

              <div class=" row">
                <div class=" q-pa-md col-4" v-for="item in tareasversion" :key="item.key">
                    <q-card class="my-card" flat bordered>
                    <q-card-section horizontal>
                        <q-card-section class="q-pt-xs">
                     
                        <div class="text-h6 q-mt-sm q-mb-xs">{{ item.descripcion }}    <q-badge outline color="primary" :label="item.estado1" style="margin-left:10px" /> </div>
                       
                       <!-- <div class="text-caption text-grey">
                                                 
                        </div> -->
                        </q-card-section>  
                     <!--   <q-card-section class="col-5 flex flex-center">
                        <q-img
                            class="rounded-borders"
                            src="https://cdn.quasar.dev/img/parallax2.jpg"
                        />
                        </q-card-section>  -->
                    </q-card-section>
                      <q-card-section>
                            <q-slider
                            name="speed"
                            v-model="item.porcentajeavance"
                            label-always
                            :min="0"
                            :max="100"
                            :step="1"
                            :label-value="+ item.porcentajeavance + ' %'"
                            disabled
                          />
                     <!--   <q-linear-progress :value="progress" class="q-mt-md" /> -->


                        <label for="">Res.: {{item.nombre}}</label>   
                          <div class="row">
                          <div class="col-6">
                              <label for="" style="color: #1A86D0;  font-weight:bold;">Fecha Inicio</label> <br>
                              <label for="">{{item.fecha_inicio}}</label>

                          </div>
                          <div class="col-6">
                                <label for="" style="color: #1A86D0;  font-weight:bold;">Fecha Termino</label> <br>
                                 <label for="">{{item.fecha_termino}}</label>
                          </div>         
                      
                          </div>                   
                        </q-card-section>
                    <q-separator />
                    <q-card-actions>
                        <q-btn flat round icon="event" />
                        <q-btn flat @click="DetalleTarea(item.id_tarea)">
                        Ver
                        </q-btn>                        
                    </q-card-actions>
                    </q-card>
                </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Terminadas</div>
            <div class=" row">
                <div class=" q-pa-md col-4" v-for="item in tareasterminadas" :key="item.key">
                    <q-card class="my-card" flat bordered>
                    <q-card-section horizontal>
                        <q-card-section class="q-pt-xs">
                     
                        <div class="text-h6 q-mt-sm q-mb-xs">{{ item.descripcion }}    <q-badge outline color="primary" :label="item.estado1" style="margin-left:10px" /> </div>
                       
                       <!-- <div class="text-caption text-grey">
                                                 
                        </div> -->
                        </q-card-section>  
                     <!--   <q-card-section class="col-5 flex flex-center">
                        <q-img
                            class="rounded-borders"
                            src="https://cdn.quasar.dev/img/parallax2.jpg"
                        />
                        </q-card-section>  -->
                    </q-card-section>
                      <q-card-section>
                            <q-slider
                            name="speed"
                            v-model="item.porcentajeavance"
                            label-always
                            :min="0"
                            :max="100"
                            :step="1"
                            :label-value="+ item.porcentajeavance + ' %'"
                            disabled
                          />
                     <!--   <q-linear-progress :value="progress" class="q-mt-md" /> -->


                        <label for="">Res.: {{item.nombre}}</label>   
                          <div class="row">
                          <div class="col-6">
                              <label for="" style="color: #1A86D0;  font-weight:bold;">Fecha Inicio</label> <br>
                              <label for="">{{item.fecha_inicio}}</label>

                          </div>
                          <div class="col-6">
                                <label for="" style="color: #1A86D0;  font-weight:bold;">Fecha Termino</label> <br>
                                 <label for="">{{item.fecha_termino}}</label>
                          </div>         
                      
                          </div>                   
                        </q-card-section>
                    <q-separator />
                    <q-card-actions>
                        <q-btn flat round icon="event" />
                        <q-btn flat @click="DetalleTarea(item.id_tarea)">
                        Ver
                        </q-btn>                        
                    </q-card-actions>
                    </q-card>
                </div>
            </div>
          </q-tab-panel>         
        </q-tab-panels>
      </q-card>
    </div>    

    
   </q-page>
</template>


<script>
import axios from  'axios';


export default {
    name: 'tareas',
    components: { },
    data(){
      return{
          tab: 'Tareas',
          progress: 0.5,
          nombre_proyecto:'',
          nombre_fase:'',
          nombre_elemento:'',
          id_elemento:'',
          id_miembro:'',
          id_version:'',
          miembros:[],
          tareasversion:[],
          tareasterminadas:[],
          DialogoTarea:false,
          DialogoDetalleTarea:false,
      }
    },
    created () {

    },
    computed: {  
      
     },
    mounted(){
            this.DatosId();    
    },
    methods: {
            DatosId(){
                var dato = this.$route.params.data             
                if(dato){
                    this.editable = true
                    var val = dato.split("-")
                    this.nombre_elemento= val[0]
                    this.nombre_fase=val[1]
                    this.id_version=val[2]
                    this.id_miembro=val[3]
                    this.nombre_proyecto=val[4]
                  //  this.ListaMiembros(val[5]);
                    this.ListarTareasVersion(val[2]);                
                }
            },
            ListaMiembros(id){
                    let me=this;
                    var previa=[];
                     axios.get('ApiWeb/Miembro.php/?id_proyecto='+id).then(response => {                      
                            previa=response.data;  
                          //  console.log(response.data)
                            previa.map(function(x){
                              me.miembros.push({text: x.nombre,value:x.id});
                            })
                            }).catch(function (error) {
                                console.log(error);
                      }) .finally(() => {
                  })       
            },
            ListarTareasVersion(id){
                    let me=this; 
                    me.tareasterminadas =[];    
                    me.tareasversion =[];            
                    this.$axios.get('Tarea/Listar/'+id).then(response => {                          
                            response.data.forEach(elem => {
                                if (elem.estado1=="Terminado") {
                                    me.tareasterminadas.push({                                        
                                        id_tarea:elem.id_tarea,
                                        descripcion: elem.descripcion,
                                        porcentajeavance: elem.porcentajeavance,
                                        fecha_inicio:elem.fecha_inicio,
                                        fecha_termino: elem.fecha_termino,
                                        nombre:elem.nombre,
                                        estado:elem.estado,   
                                        estado1:elem.estado1, 
                                        estado2:elem.estado2,                  
                                    })
                            }else{
                                    me.tareasversion.push({
                                        id_tarea:elem.id_tarea,
                                        descripcion: elem.descripcion,
                                        porcentajeavance: elem.porcentajeavance,
                                        fecha_inicio:elem.fecha_inicio,
                                        fecha_termino: elem.fecha_termino,
                                        estado:elem.estado,  
                                        nombre:elem.nombre,
                                        estado1:elem.estado1, 
                                        estado2:elem.estado2,                  
                                  })
                                 }                        
                             }); 
                         //  console.log(response.data)                            
                            }).catch(function (error) {
                               console.log(error);
                     }) .finally(() => {
               }) 
            },
            DetalleTarea(id){
              var data =id+'-'+this.nombre_elemento;
              //alert(data)
                this.$router.push({name:"tareadetalle",params:{data} });
            },
            AbrirModal(){
                this.DialogoTarea=true
            },
            CerrarModal(){
                this.DialogoTarea=false
            }
    }
}
</script>

