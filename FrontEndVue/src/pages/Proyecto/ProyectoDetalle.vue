<template>
  <q-page class="q-pa-md">
    <q-card class="my-card cardstyle">
      <q-card-section>
      
        <label style="font-size: 25px;">{{ nombreProyecto }} </label> <br>
        <q-chip dense color="teal" text-color="white" icon="bookmark">
          Activo
        </q-chip>
        <div>
          <q-linear-progress
            :value="parseFloat(TotalProcentajeProyecto) / 100"
            class="q-mt-md"
          />           
          <br />
          <p>
            {{descripcion}}
          </p>
        </div>         
         <div class="row">
            <div class="col-4">
                <label for=""  style="color: #1A86D0;  font-weight:bold;" >Fecha Inicio</label> <br>
                <label for="">{{fecha_inicio}}</label>
            </div>
            <div class="col-4">
                   <label for="" style="color: #1A86D0;  font-weight:bold;">Fecha Termino</label> <br>
                <label for="">{{fecha_termino}}</label>
            </div>            
        </div>

      </q-card-section>
    </q-card>
    <div class="q-pa-md row items-start ">
      <div class="col-4" style="padding: 0px 1% 0px">
        <q-card
          class="my-card text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);"
        >
          <q-card-section> </q-card-section>
          <q-card-section class="q-pt-none">
            <div style="display: flex;">
              <font-awesome-icon :icon="myIcon" size="5x" />
              <div class="text-h6 " style="margin-left:5%">Nuevo</div>
              <div class="text-h6 " style="margin-left:5%">{{TareaNuevas}}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4" style="padding: 0px 1% 0px">
        <q-card
          class="my-card text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);"
        >
          <q-card-section> </q-card-section>
          <q-card-section class="q-pt-none">
            <div style="display: flex;">
              <font-awesome-icon :icon="myIcon" size="5x" />
              <div class="text-h6 " style="margin-left:5%">Proceso</div>
              <div class="text-h6 " style="margin-left:5%">{{TareaProceso}}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4" style="padding: 0px 1% 0px">
        <q-card
          class="my-card text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);"
        >
          <q-card-section> </q-card-section>
          <q-card-section class="q-pt-none">
            <div style="display: flex;">
              <font-awesome-icon :icon="myIcon" size="5x" />
              <div class="text-h6 " style="margin-left:5%">Terminado</div>
              <div class="text-h6 " style="margin-left:5%">{{TareaTerminada}}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <br />
    <div class="row">
      <div class=" q-pa-md col-4" v-for="item in items" :key="item.key">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Fase</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ item.nombre_fase }}</div>
              <div class="text-caption text-grey"></div>
            </q-card-section>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
          <!--<q-linear-progress
              :value="item.porcentaje_avance / 100"
              class="q-mt-md"
              max="100"
            />-->

             <q-slider
              name="speed"
            v-model="item.porcentaje_avance"
              label-always
              :min="0"
              :max="100"
              :label-value="+ item.porcentaje_avance + ' %'"
              :step="1"
              readonly
              
              color="light-green"
            />
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-icon style="font-size: 2em;" name="search" />
            <q-btn flat @click="DetalleFase(item.id_fase,item.nombre_fase,item.id_cronograma_fase)">
              Ver
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faColumns } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      progress: 0.5,
      items: [],
         speed: 40,
      myIcon: faColumns,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      nombre_fase: "",
      nombre_elemento: "",
      nombreProyecto: "",
      TotalProcentajeProyecto: "",
      id_proyecto: "",
      id_miembro: "",
      idcronogramamalemento: "",
      id_cronograma_fase: "",
      fecha_inicio: "",
      fecha_termino: "",
      descripcion: "",
      estado: "",
      version: "",
      metodologia: "",
      TareaNuevas: "",
      TareaProceso: "",
      TareaTerminada: "",
      RangoFase: "",
      rangoAnterior: ""
    };
  },
  mounted() {
    this.GetDatos();
  },
  computed: {
    appIcon() {
      return faChessQueen;
    }
  },
  created() {},
  methods: {
    GetDatos() {
      var item = this.$route.params.id_proyecto;
      if (item) {
         this.id_proyecto=item 
          this.MostarFaseMetodolgiaProyecto(item);
          this.DatosProyecto(item);
          this.ProyectoTotalTareas(item);
    
      }
    },
    MostarFaseMetodolgiaProyecto(id) {
      let me = this; //  this.$axios.get('PlantillaElemento/'+faseId).then(response => {
      this.$axios
        .get("Proyecto/ListarFasesProyecto/" + id)
        .then(response => {
          me.items = response.data;
         //  console.log(response.data)
          //   me.ElentosFaseProyecto(me.id_proyecto, me.fases[0].id_fase);
          // me.nombre_fase =me.fases[0].nombre_fase;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    DatosProyecto(id) {
      let me = this;
      this.$axios
        .get("Proyecto/ProyectoDetail/" + id)
        .then(response => {
          me.nombreProyecto = response.data.nombre_proyecto;
          me.fecha_inicio = response.data.fecha_inicio;
          me.fecha_termino = response.data.fecha_termino;
          me.metodologia = response.data.nombre_metodologia;
          me.estado = response.data.estado;
          me.descripcion = response.data.descripcion;
          me.TotalProcentajeProyecto = response.data.porcentaje;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    DetalleFase(id,nombrefa,idcronogramafase){
        var data =id+"-"+this.id_proyecto+'-'+nombrefa+'-'+this.nombreProyecto+'-'+idcronogramafase
        this.$router.push({name:"fasedetalle",params:{data} });
    },
     ProyectoTotalTareas(id){
          let me=this;
           this.$axios.get('Proyecto/TotalTareasProyecto/'+id).then(response => {   
             console.log(response.data); 
              if(response.data.length==0){
                   me.TareaNuevas="0";
                   me.TareaProceso="0";
                   me.TareaTerminada="0";
              } else{
               me.TareaNuevas=response.data[0].cantidad;  
                if(response.data.length>1){
                  me.TareaProceso=response.data[1].cantidad;
                 }
                 else{ 
                     me.TareaProceso="0";
                 }
                 if(response.data.length>2){
                  me.TareaTerminada=response.data[2].cantidad;   
                 }else{
                     me.TareaTerminada="0";
                 } 
              }                  
           
               }).catch(function (error) {
                      console.log(error);
              }) .finally(() => {
           })
       },  
  }
};
</script>
<style>
.cardstyle{
  border: 1px solid #1A86D0;
}
</style>