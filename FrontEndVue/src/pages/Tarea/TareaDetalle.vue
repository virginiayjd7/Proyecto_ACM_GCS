<template>
  <q-page class="q-pa-md">

     <div class="row">
    <div class="col-6">

    <q-timeline color="secondary"   avatar="https://cdn.quasar.dev/img/boy-avatar.png">     

      <q-timeline-entry v-for="item in timeline" :key="item.id_timeline"
        :title="item.descripcion"
        :subtitle="item.fecha+'-'+item.hora"
        @click="ListarComit(item.id_timeline)"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do  
        </div>
      </q-timeline-entry>      
    </q-timeline>

    </div>
    <div class="col-6">
         <q-card class="my-card cardstyle">
      <q-card-section>
        <div>      
           <label for=" " style="font-size: 18px;  font-weight:bold;">{{nombre_miembro}}</label>        
          <br />
          <br>
         <div class="row">
            <div class="col-4">
                <label for="" style="color: #1A86D0;  font-weight:bold;">Estado</label> <br>              
                <q-chip square color="orange" text-color="white" >
                {{estado1}}
            </q-chip>   
            </div>
            <div class="col-4">
                   <label for="" style="color: #1A86D0;  font-weight:bold;">Elemento</label> <br>
                <label for="">{{nombre_elemento}}</label>
            </div>          
         
         </div>
         <div class="row">
            <div class="col-4">
                <label for="" style="color: #1A86D0;  font-weight:bold;">Fecha inicio </label> <br>
                <label for="">{{fecha_inicio}}</label>
            </div>
            <div class="col-4">
                   <label for="" style="color: #1A86D0;  font-weight:bold;">fecha fin</label> <br>
                <label for="">{{fecha_termino}}</label>
            </div>          
         
         </div>
        </div>
        <br>
        <hr>
      <p> {{comnentario}} </p>
      <br>
          <a :href="urlevidencia"  target="_blank">Link Evidencia</a>
          <q-btn  v-if="estado1=='Terminado'" color="primary" style="float:right" label="Responder"  @click="MostrarMensaje"/>
          <br><br>
      </q-card-section>
    </q-card>
    </div>
  
    </div> 

 
  </q-page>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "tarea-detalle",
  data() {
    return {
      nombre_miembro: "",
      nombre_elemento:"",
      fecha_inicio: "",
      fecha_termino: "",
      descripcion: "",
      porcentajeavance: null,
      urlevidencia: "",
      estado: "",
      estado1: "",
      estado2: "",
      id_usuario: "",
      comnentario: "",
      timeline: [],
      current: 0,
      id_tareamiembro: "",
      mensaje: ""
    };
  },
  watch: {},
  created() {},
  computed: {
    esAdministrador() {
      return this.$store.state.tipousuario == "Administrador";
    },
    esMiembro() {
      return this.$store.state.tipousuario == "Miembro";
    },
    esJefe() {
      return this.$store.state.tipousuario == "Jefe";
    }
  },
  mounted() {
    this.GetDatos();
  },
  methods: {
    GetDatos() {
      var item = this.$route.params.data;
      if (item) {
        var arraydatos =item.split("-");
        var id =arraydatos[0];
        this.id_tareamiembro = id;
        this.nombre_elemento=arraydatos[1];
        this.ListarTimliene(id);
        this.BuscarTarea(id);
      }
    },
    ListarTimliene(id_tarea) {
      let me = this;
       this.$axios.get("Commit/ListarCommit/" + id_tarea)
        .then(response => {
          me.timeline = response.data;
         // console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    BuscarTarea(id) {
      let me = this;
       this.$axios.get("Tarea/ObtenerTarea/" + id)
        .then(response => {
          console.log(response.data);
          me.nombre_miembro = response.data.nombre;
          me.fecha_inicio = response.data.fecha_inicio;
          me.fecha_termino = response.data.fecha_termino;
          me.descripcion = response.data.descripcion;
          me.porcentajeavance = response.data.porcentajeavance;
          me.urlevidencia = response.data.urlevidencia;
          me.estado = response.data.estado;
          me.estado1 = response.data.estado1;
          me.estado2 = response.data.estado2;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    MostrarMensaje() {
      if (this.estado2 == "Aprobado") {
        this.MensajeTareaAprobada();
      } else {
          this.Responder();
      }
    },
    Responder() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
      });
      swalWithBootstrapButtons
        .fire({
          title: this.descripcion,
          text: "Responder a esta  Tarea !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aprobar !",
          cancelButtonText: "Rechazar !",
          cancelButtonColor: "#d33",
          reverseButtons: true
        })
        .then(result => {
          if (result.isConfirmed) {
            this.EditarTareaMiembro(
              this.id_tareamiembro,
              "Terminado",
              "Terminado",
              "Aprobado"
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.RecharzarTarea();
          }
        });
    },
    onChange(current) {
      console.log("onChange:", current);
      var id_timelinea = this.timeline[current].id_timeline;
      console.log("id :", id_timelinea);
      this.ListarComit(id_timelinea);
      this.current = current;
    },
    ListarComit(id_timelinea) {
      let me = this;
        this.$axios.get("Historial/ObtenerHistorial/" + id_timelinea)
        .then(response => {
        //  if (response.data.length > 0) {
            me.comnentario = response.data.descripcion;
            me.urlevidencia = response.data.urlevidencia;
        //  } else {
         //   me.comnentario = "";
         // }
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    CerrarModal() {
      this.$emit("CerrarModal");
    },
    EditarTareaMiembro(idtarea, esta, esta1, esta2) {
      let id_tarea = idtarea;
      let estado = esta;
      let estado1 = esta1;
      let estado2 = esta2;
      let respuesta = "Aprobado";
      const obj = {  estado, estado1, estado2, respuesta };
      console.log(obj);
      this.$axios
          .put("Tarea/AprobarRechazarTarea/"+id_tarea, obj)
          .then(response => {
            console.log(response.data);
            this.$swal.fire(
              "Aprobado!",
              "Se ha Aprobado esta tarea !.",
              "success"
            );
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(() => {});
   
    },
    RecharzarTarea() {
      let me = this;
      this.$swal
        .fire({
          title: "Mensaje",
          input: "textarea",
          confirmButtonText: "Enviar !"
        })
        .then(function(result) {
          if (result.value) {
            me.EnviarMensaje(result.value);
          }
        });
    },
    MensajeTareaAprobada() {
      Swal.fire("Esta Tarea ya esta Aprobada");
    },
    EnviarMensaje(mensaje) {
      // this.EditarTareaMiembro(this.id_tareamiembro,"Terminado","Terminado","Aprobado");
      let id_tarea = this.id_tareamiembro;
      let estado = "Proceso";
      let estado1 = "Terminado";
      let estado2 = "Observado";
      let respuesta = mensaje;
      const obj = { id_tarea, estado, estado1, estado2, respuesta };
      axios
        .put("ApiWeb/Historial.php/", obj)
        .then(response => {
          console.log(response.data);
          this.$swal.fire("Observado!", "Enviado Obervacion.", "success");
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    Datos(id){
      alert(id)
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
    }
  }
};
</script>
