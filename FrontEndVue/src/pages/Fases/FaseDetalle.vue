<template>
  <q-page class="q-pa-md">
    <q-card class="my-card cardstyle">
      <q-card-section>
        <div>         
          <label for=" " style="font-size: 18px;margin-right:5px">{{nombre_fase}}</label>
       <!--   <q-linear-progress :value="progress" class="q-mt-md" />   -->
        <q-slider
          name="speed"
          v-model="porcentajeavance"
          label-always
          :min="0"
          :max="100"
          :step="1"
          @change ="chan(porcentajeavance)"

        />
          <br />          
        </div>     

        <div class="row">
            <div class="col-4">
                <label for="" style="color: #1A86D0;  font-weight:bold;">Proyecto</label> <br>
              <label for="" style="font-size: 18px;margin-right:5px"> {{nombreProyecto}} </label>
            </div>                  
        </div>
      </q-card-section>
    </q-card>

    <br />
    <q-list      bordered
      v-for="item in elementosConfi"
      :key="item.key"
      @click="ListaVersion(item.id_cronograma_elemento)"
    >
      <q-expansion-item
        group="somegroup"
        icon="explore"
        :label="item.nombre_elemento "
        header-class="text-primary"
      >
        <q-card>
          <q-card-section>
            <div style="float:right">
              <q-btn
                color="primary"
                label="add Version"
                @click="
                  Dialogo(
                    item.id_cronograma_elemento,
                    item.nombre_elemento,
                    item.nombre
                  )
                "
              />
            </div>
            <br />
            <br />
            <q-list bordered>
              <q-item
                v-for="contact in listaversiones"
                :key="contact.id_elemento"
                class="q-my-sm"
              >
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    V
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label> Version {{ contact.version }}</q-item-label>
                  <q-item-label>{{ contact.nombre }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div style="display: flex">
                    <q-btn
                      outline
                      style="color: goldenrod;margin-right:5px"
                      label="Detalle"
                      @click="detallesVErsion(contact.id_version,contact.miembroresponsableID, item.nombre_elemento)"
                    />
                    <q-btn
                      color="secondary"
                      label="Tarea"
                      @click="ModalTarea(contact.id_version,contact.miembroresponsableID)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
    </q-list>
    {{id_miembro}}
    <br />
   
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="DialogoElementoVersion" @hide="CerrarModal">
        <q-card style="width: 500px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Crear Version</div>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input outlined v-model="nombre_fase" label="nombre fase" />
          </q-card-section>

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input outlined v-model="nombre_elemento" label="Elemento" />
          </q-card-section>

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input outlined v-model="version" label="Numero de Version:" />
          </q-card-section>
          
          <q-card-section style="max-height: 50vh" class="scroll">
            <div class="row">
            <div class="col-6">
                <label for="" style="color: #1A86D0;  font-weight:bold;">Fecha Unicio</label> <br>
                <q-input v-model="fecha_inicio" filled type="date" />
            </div>    
        <div class="col-6">
                <label for="" style="color: #1A86D0;  font-weight:bold;">Fecha termino</label> <br>
                   <q-input v-model="fecha_termino" filled type="date" />
            </div>    
        </div>
          </q-card-section>   

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-select
              outlined
              v-model="id_miembro"
              :options="miembros"
              label="Miembro"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />

            <!-- <q-btn flat label="Accept" color="primary" v-close-popup />
            -->
            <q-btn color="primary" label="CrearVersion" @click="CrearVersion" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!--Dialogo Tarea -->
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="DialogoTarea" @hide="CerrarModal">
        <q-card style="width: 500px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Tarea Nueva</div>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input outlined v-model="nombre_tarea" label="Nombre Tarea" />
          </q-card-section>

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input outlined v-model="justificacion" label="Justificacion:" />
          </q-card-section>

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input v-model="fecha_inicio_tarea" filled type="date" />
          </q-card-section>

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input v-model="fecha_termino_tarea" filled type="date" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />

            <q-btn color="primary" label="Crear Tarea" @click="RegistrarTarea" />
          </q-card-actions>
        </q-card>
      </q-dialog>
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

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faColumns } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      DialogoElementoVersion: false,
      DialogoTarea: false,
      idcronogramamalemento: "",
      idcronogramafase:"",
      progress: 0.5,
      elementosConfi: [],
      listaversiones: [],
      miembros: [],
      idproyecto: "",
      id_miembro: "",
      nombre_fase: "",
      nombre_elemento: "",
      fecha_inicio: "",
      fecha_termino: "",
      id_version:'',
      nombreProyecto:'',     
      fase: "",      
      version: "",    
      porcentaje:'',
      porcentajeavance:'',
      rangoAnterior:'',
      //datos tarea
      nombre_tarea: "",
      justificacion: "",
      fecha_inicio_tarea: "",
      fecha_termino_tarea: "",
      id_miembro_tarea: "",
      speed: 40,
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
      var item = this.$route.params.data;
      if (item) {
        //  this.MostaraseMetodolgiaProyecto(item);
        var array = item.split("-");
        var idfase = array[0];
        var idproyecto = array[1];
        this.nombre_fase= array[2];
        this.nombreProyecto=array[3];
        this.idproyecto=array[1];
        this.idcronogramafase=array[4];
        this.ElentosFaseProyecto(idproyecto, idfase);
        this.ListarMiembrosProyecto(idproyecto);
        this.ObtenerCronogramaFase( this.idcronogramafase);

      }
    },
    ElentosFaseProyecto(id_proyecto, id_fase) {
      let me = this;
      const obj = { id_proyecto, id_fase };
      this.$axios
        .post("Proyecto/ProyectoFasesElemento", obj)
        .then(response => {       
          me.elementosConfi = response.data;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },

    MostarFaseMetodolgiaProyecto(id) {
      let me = this; //  this.$axios.get('PlantillaElemento/'+faseId).then(response => {
      this.$axios
        .get("Proyecto/ListarFasesProyecto/" + id)
        .then(response => {
          me.items = response.data;
          //    console.log(response.data);
          //   me.ElentosFaseProyecto(me.id_proyecto, me.fases[0].id_fase);
          // me.nombre_fase =me.fases[0].nombre_fase;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    Dialogo(idcromograma, elementto, fase) {
      this.idcronogramamalemento = idcromograma;
      this.DialogoElementoVersion = true;
      this.nombre_fase = fase;
      this.nombre_elemento = elementto;
    },
    ListarMiembrosProyecto(id) {
      let me = this;
      var tipoDcumento = [];
      this.$axios
        .get("Miembro/MiembroProyecto/" + id)
        .then(response => {
          tipoDcumento = response.data;
        // console.log(response.data);
          tipoDcumento.map(function(x) {
            // aqui tengo dudas we
               if (x.nombre_rol!="Jefe de Proyecto"){
                      //  me.roles.push({label: x.nombre,value:x.id_rol});
                     me.miembros.push({ label: x.nombre, value: x.id });
                   }   
          });
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    CerrarModal() {
      this.DialogoElementoVersion = false;
      this.DialogoTarea = false;
    },
    CrearVersion() {
      let elemntoconfiguracionID = this.idcronogramamalemento;
      let version = this.version;
      let fecha_inicio = this.fecha_inicio;
      let fecha_termino = this.fecha_termino;
      let miembroresponsableID = this.id_miembro.value;
      if (this.id_miembro.value==""){
         alert("eleigir resposnble")
         return;
      }   
 
      if(miembroresponsableID=="" ||miembroresponsableID== undefined){
        alert("eleigir resposnble")
        return;
      }  
      if  (version==""){
           alert("llenar version")
        return;
      }
      const obj = {
        elemntoconfiguracionID,
        version,
        fecha_inicio,
        fecha_termino,
        miembroresponsableID
      };
      //  console.log(obj);
      this.$axios
        .post("Version/AgregarVersion", obj)
        .then(response => {
          this.Confirmacion();
          this.Limpiar();
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    chan(value){ 
              Swal.fire({
              title: 'Editar porcentaje ?',
              text: value,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Editar Porcentaje!'
            }).then((result) => {
              if (result.isConfirmed) {
                  this.EditarPorcentajeFase();
              }else{
                this.porcentajeavance=value;
              }
            })  

    },
    detallesVErsion(idver,idmienmro,nombrelele){    
         var element=nombrelele;
         var proyect=this.nombreProyecto;
         var fase=this.nombre_fase; 
         var id_proyect=this.idproyecto;
         var data=element+'-' +fase+'-'+ idver+'-'+idmienmro+'-'+proyect+'-'+id_proyect;      
         this.$router.push({name:"tarea",params:{data} });

    },
    ListaVersion(id) {
      let me = this;
      //alert(id_elemento)
      this.$axios
        .get("Version/Listar/" + id)
        .then(response => {
          me.listaversiones = response.data;
        //  console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    ModalTarea(id_version,miembroresponsableID) {
      this.id_version=id_version;
      this.id_miembro_tarea=miembroresponsableID
      this.DialogoTarea = true;
    },
    ObtenerCronogramaFase(id){
         this.$axios.get("CronogramaFase/ObtenerCronogramaFase/"+id).then(response => {
         this.porcentajeavance=response.data.porcentaje_avance;
         this.porcentaje=response.data.porcentaje;

         this.rangoAnterior=response.data.porcentaje_avance;


      console.log(response.data)
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    RegistrarTarea() {
      let verionID = this.id_version;
      let miembroresponsableID = this.id_miembro_tarea;
      let fecha_inicio = this.fecha_inicio_tarea;
      let fecha_termino = this.fecha_termino_tarea;
      let descripcion = this.nombre_tarea;
      let porcentajeavance = "0";
      let urlevidencia = "nulo";
      let estado = "Nuevo";
      let estado1 = "Nuevo";

      const obj = { verionID,miembroresponsableID,fecha_inicio,fecha_termino,descripcion, porcentajeavance, urlevidencia, estado, estado1 };

       this.$axios.post("Tarea/AgregarTarea/", obj).then(response => {
         this.CerrarModal();
          this.Confirmacion();
         // this.ListarTarea();
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
   EditarPorcentajeFase(){
            let id_cronograma_fase=this.idcronogramafase;  
            let porcentaje=this.porcentajeavance;  
            var  porcentajeVerdadero=this.porcentajeavance- this.rangoAnterior;
             var porcentajeProyeto =(porcentajeVerdadero*this.porcentaje)/100;
            console.log("procetnej proyecto"+porcentajeProyeto);
            const obj={porcentaje};
            this.$axios.put('CronogramaFase/UpdatateCronogramaFase/'+id_cronograma_fase,obj).then(response => {     
                   
                    this.EditarPorcentajeProyecto(porcentajeProyeto);
                    this.Confirmacion();    

                }).catch(function (error) {
                    console.log(error);
                }) .finally(() => {              
           })  
       },
       EditarPorcentajeProyecto(porcentajeProyeto){
            let id=this.idproyecto;  
            let porcentaje=porcentajeProyeto;  
            const obj={porcentaje};
            
            this.$axios.put('Proyecto/UpdatatePorcentaje/'+id,obj).then(response => {     
                      console.log(response.data)                           
                      this.ObtenerCronogramaFase( this.idcronogramafase)            
                  }).catch(function (error) {
                      console.log(error);
                  }) .finally(() => {              
            })  
       },
    Confirmacion() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Registrado Version",
        text: "texto",
        showConfirmButton: false,
        timer: 3000
      });
    },
    Limpiar(){
        this.version="";
        this.this.id_miembro="";
    }
  }
};
</script>

