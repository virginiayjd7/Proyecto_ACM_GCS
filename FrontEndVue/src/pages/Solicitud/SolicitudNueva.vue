<template>
  <q-page class="q-pa-md">
    <q-form class="q-gutter-md">
      <div class="row">
        <div class="col-6" style="padding: 0px 1% 0px">
           <q-select outlined v-model="id_proyecto"    @input="handleChange()"   :options="items" label="Proyecto" map-options />
     
        </div>
        <div class="col-6" style="padding: 0px 1% 0px">
          <q-input  v-model="fecha" filled type="date" />
        </div>
      </div>
      <div class="row">
        <div class="col-6" style="padding: 0px 1% 0px">
           <q-select outlined v-model="id_fase" :options="fasesproyecto" @input="ChangeFase()" label="Fase" map-options />
        </div>
        <div class="col-6" style="padding: 0px 1% 0px">
        <q-select outlined v-model="objeelemento" :options="elementos" label="Elemento" @input="ChangeElemento()" map-options />
        </div>
      </div>
      <div class="row">
        <div class="col-12" style="padding: 0px 1% 0px">
          <q-input       
                    label="Objetivo *"           
                    v-model="objetivo"
                />
        </div>
      </div>
        <div class="row">
        <div class="col-12" style="padding: 0px 1% 0px">
             <textarea v-model="descripcion"  cols="65" rows="3"></textarea>
        </div>
      </div>

      <div></div>
      <div>
        <q-btn
          label="Generar Docuemento"
          type="button"
          @click="GenerarPdf"
          color="primary"
        />
       <br>
       <br>
       <br>
       <div>
    <label>Adjunte PDF</label>
                    <input
                    type="file"
                    ref="cedulaTrabajador"
                    accept="application/pdf"
                    :disabled="loading"
                    class="form-control"
                    id="archivoCedulaConyuge"
                    data-validate="Anexe Pdf"
                    >
       </div>
       
      <q-btn
          label="   Crear Solicitud"
          type="button"
          @click="agregar"
          color="primary"
        />

      </div>
    </q-form>
  </q-page>
</template>

<script>
import axios from "axios";
import { jsPDF } from "jspdf";
import * as autoTable from "jspdf-autotable";
//import pdf from 'vue-pdf'
//import firebase from '@/firebase'
//import 'firebase/storage';
import  firebase  from "firebase";
import 'firebase/storage';

import Vue from "vue";

import Swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);



export default {
  components: {},
  data() {
    return {
      items: [],
      fasesproyecto: [],
      elementos: [],
      id_proyecto: "",
      id_fase: "",
      nombre_elemento: "",
      objeelemento:'',
      fecha: "",
      objetivo: "",
      descripcion: "",
      estado: "",
      respuesta: "",
      usuario_miembroid: "",
      id_usuario: "",
      condidgo: "",
      idtipousuario: "",
      id_jefeproyecto: "",
      nombre_solicitante: "",
      nombre_proyecto: "",
      loading: false,
      downloadUrl: "",
      headers: {
        authorization: "authorization-text"
      },
      imgbase64: "",
      numeroSolicitud: ""
    };
  },

  created() {
    //this.ListarProyecto();
    //  this.ObtenerNumeroSolicitud();
  },
  mounted() {
    if (localStorage.idtipo) this.id_usuario = localStorage.id_usuario;
    if (localStorage.idtipo) this.idtipousuario = localStorage.idtipo;
    if (localStorage.nombre) this.nombre_solicitante = localStorage.nombre;
    this.ListarPoryectosMiembro(this.id_usuario);
  },
  methods: {
    ListarPoryectosMiembro(idtipousuario) {
      let me = this;
      var previa = [];
      this.$axios
        .get("Usuario/Proyectos/" + idtipousuario)
        .then(response => {
          previa = response.data;
          previa.map(function(x) {
            me.items.push({ label: x.nombre_proyecto, value: x.id_proyecto });
          });
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    CrearSolicitudCambio() {
      let id_proyecto = this.id_proyecto;
      let miembrojefeId = this.id_jefeproyecto;
      let miembrosolicitanteId = this.usuario_miembroid;
      let fecha = this.fecha;
      let objetivo = this.objetivo;
      let descripcion = this.descripcion;
      let respuesta = "";
      let estado = "1";
      const obj = {
        id_proyecto,
        miembrojefeId,
        miembrosolicitanteId,
        fecha,
        objetivo,
        descripcion,
        respuesta,
        estado
      };
      axios
        .post("ApiWeb/SolicitudCambio.php/", obj)
        .then(response => {
          console.log(response);
          this.Confirmacion();
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
 
    Confirmacion() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Registrado",
        text: "texto",
        showConfirmButton: false,
        timer: 3000
      });
    },
    handleChange() {   
     
      this.nombre_proyecto=this.id_proyecto.label
      this.ObtenerIdMiembro(this.id_proyecto.value);
      this.ObtenerJefe2(this.id_proyecto.value);
      this.MostarFaseMetodolgiaProyecto(this.id_proyecto.value);
    },
    ObtenerIdMiembro(proyectoId) {

          var usuario_miembroid =this.id_usuario;       
          const obj={usuario_miembroid,proyectoId}     
         this.$axios.post("Miembro/ObtenerJefeProyecto", obj) .then(response => {                      
          this.usuario_miembroid = response.data.id;         
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    ObtenerJefe2(proyectoId){             
          const obj={proyectoId}     
          this.$axios.post("Miembro/ObtenerJefeProyecto2", obj) .then(response => {                      
          this.id_jefeproyecto = response.data.id;    
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    MostarFaseMetodolgiaProyecto(id) {      
      let me = this; 
      var previa = [];
      this.$axios
        .get("Proyecto/ListarFasesProyecto/" + id)
        .then(response => {
            previa = response.data;
              //console.log(response.data);
            previa.map(function(x) {
                me.fasesproyecto.push({ label: x.nombre_fase, value: x.id_fase });
            });        
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
     ChangeFase() {
      this.elementos = [];
      var idfase =this.id_fase.value;
    //  alert(idfase)
      this.ElentosFaseProyecto(idfase);
    },
    ElentosFaseProyecto(id_fase) {
      let me = this;
      var previa = [];  
      var id_proyecto=me.id_proyecto.value;
      const obj = { id_proyecto, id_fase };
      this.$axios
        .post("Proyecto/ProyectoFasesElemento", obj)
        .then(response => {       
          // console.log(response.data);
           previa = response.data;
           previa.map(function(x) {
            me.elementos.push({label: x.nombre_elemento,  value: x.id_cronograma_elemento});
          });
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});

    },
   ChangeElemento(){
        this.nombre_elemento=this.objeelemento.label;
   },
    Change1(e) {
      this.nombre_elemento = event.target.textContent; // example: One
      console.log("name ", this.nombre_elemento);
    },   

    add1(){
          this.downloadUrl = "url";
            let id_proyecto = this.id_proyecto.value;
            let miembrojefeId = this.id_jefeproyecto;
            let miembrosolicitanteId = this.usuario_miembroid;
            let fecha = this.fecha;
            let objetivo = this.objetivo;
            let descripcion = this.descripcion;
            let respuesta = "";
            let estado = "1";
            let documento = this.downloadUrl;
            let elemento = this.nombre_elemento;
            const obj = {
              id_proyecto,
              miembrojefeId,
              miembrosolicitanteId,
              fecha,
              objetivo,
              descripcion,
              respuesta,
              estado,
              documento,
              elemento
            };
              this.$axios.post("Solicitud/AgregarSolicitud", obj)
              .then(response => {
              //  console.log(response);
                  this.Confirmacion();
              })
              .catch(function(error) {
                console.log(error);
              })
              .finally(() => {});
    },
    async agregar() {
      try {
        const { files } = this.$refs.cedulaTrabajador;
        this.loading = true;
        const file = files[0];
        if (file) {
          const isPdf = file.type === "application/pdf";
          if (isPdf) {
                  this.$swal({ title: 'Cargando',allowOutsideClick: false});
                      this.$swal.showLoading();
            const response = await firebase
              .storage()
              .ref(`pdfs/${file.name}`)
              .put(file);
            const url = await response.ref.getDownloadURL();
            this.downloadUrl = url;
             let id_proyecto = this.id_proyecto.value;
            let miembrojefeId = this.id_jefeproyecto;
            let miembrosolicitanteId = this.usuario_miembroid;
            let fecha = this.fecha;
            let objetivo = this.objetivo;
            let descripcion = this.descripcion;
            let respuesta = "";
            let estado = "1";
            let documento = this.downloadUrl;
            let elemento = this.nombre_elemento;
            const obj = {
              id_proyecto,
              miembrojefeId,
              miembrosolicitanteId,
              fecha,
              objetivo,
              descripcion,
              respuesta,
              estado,
              documento,
              elemento
            };
              this.$axios.post("Solicitud/AgregarSolicitud", obj)
              .then(response => {
                     this.$swal.close(); 
                 console.log(response);
                  this.Confirmacion();
              })
              .catch(function(error) {
                console.log(error);
                   this.$swal.close(); 
              })
              .finally(() => {});
          } else {
            console.log("Archivo no valido");
          }
        } else {
          console.log("falta el archivo");
        }
      } catch (error) {
        console.error(error);
      }
      this.loading = false;
    },
    ObtenerNumeroSolicitud() {
      let me = this;
      var cantidad = "1";
      axios
        .get("ApiWeb/SolicitudCambio.php/?cantidad=" + cantidad)
        .then(response => {
          me.numeroSolicitud = parseInt(response.data);
          console.log(me.numeroSolicitud);
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    ImgBase64() {
      this.imgbase64 =
        "data:image/png;base64,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";
    },
    GenerarPdf() {
      let me = this;
      me.ImgBase64();
      var doc = new jsPDF();
      //FOOTER
      //   x y  ancho  alto
      doc.rect(15, 15, 180, 30); // empty square
      // filled square
      doc.setDrawColor(0);
      doc.setFillColor(0, 255, 0);
      doc.rect(40, 15, 90, 30, "F");

      doc.setFontSize(20);
      doc.setTextColor(150);
      doc.text(45, 25, "SOLICITUD DE CAMBIO");
      // linesas vertical
      doc.setLineWidth(0.1);
      doc.line(153, 15, 153, 45);
      doc.setLineWidth(0.1);
      doc.line(175, 15, 175, 45);
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text(132, 19, "CODIGO");
      doc.text(132, 24, "VERSION");
      doc.text(132, 32, "PAGINA");
      doc.text(165, 32, "1");
   
      doc.line(180, 20, 130, 20);
      doc.line(175, 25, 130, 25);
     
      doc.addImage(me.imgbase64, "JPEG", 20, 15, 19, 27);
      doc.addImage(me.imgbase64, "JPEG", 175, 15, 19, 27);
    
      doc.rect(15, 50, 180, 230); // empty square

      doc.setDrawColor(0);
      doc.setFillColor(0, 255, 0);
      doc.rect(15, 50, 115, 20, "F");
      doc.setFontSize(20);
      doc.setTextColor(150);
      doc.text(30, 60, "SOLICITUD DE CAMBIO");

      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text(133, 57, "N° Solicitud :");
      var numero =  "1";
      doc.text(168, 57, numero);
      doc.text(133, 65, "Fecha :");
      doc.text(165, 65, me.fecha);
      doc.text(85, 75, "SOLICITANTE");
      doc.text(18, 85, "Solicitado por :");
      // nombre soiicitante
      doc.text(60, 85, me.nombre_solicitante);

      doc.text(18, 95, "Proyecto/Producto :");

      doc.text(60, 95, me.nombre_proyecto);

      doc.text(85, 105, "SOLICITUD");
      doc.text(18, 113, "Objetivo :");
      doc.text(25, 120, me.objetivo);
      doc.text(18, 126, "Descripción del Cambio solicitado :");
      doc.text(18, 135, me.descripcion);
      doc.text(18, 146, "Elemento de Configuración del software afectado :");
      doc.text(120, 146, me.nombre_elemento);
      doc.text(18, 156, "Impacto :");
      doc.text(18, 166, "Esfuerzo estimado: ");
      //  doc.line(180, 20, 130, 20);
      //  a      x  a   y
      doc.line(130, 60, 195, 60);
      doc.line(15, 70, 195, 70);
      //vertical
      doc.setLineWidth(0.1);
      doc.line(160, 70, 160, 50);
      //horizonral
      doc.line(15, 78, 195, 78);
      doc.line(15, 88, 195, 88);
      doc.line(15, 98, 195, 98);
      //vertical
      doc.setLineWidth(0.1);
      doc.line(55, 98, 55, 78);
      //horizonral
      doc.line(15, 108, 195, 108);
      //horizonral
      doc.line(15, 122, 195, 122);
      //horizonral
      doc.line(15, 142, 195, 142);
      //horizonral
      doc.line(15, 151, 195, 151);
      //horizonral
      doc.line(15, 160, 195, 160);
      //horizonral
      doc.line(15, 173, 195, 173);
      doc.save("Solicitud1.pdf");
      //  me.LimpiarCampos();
      //   this.Confirmacion();
    },
    Lista() {
      this.$router.push("/app/solicitudlista");
    },
    LimpiarCampos() {
      let me = this;
      me.descripcion = "";
      me.objetivo = "";
      me.imgbase64 = "";
    }
  }
};
</script>
