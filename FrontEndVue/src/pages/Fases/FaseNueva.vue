<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Nueva Fase</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
          <q-input outlined v-model="nombre" label="nombre fase" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
          <!-- <q-btn flat label="Accept" color="primary" v-close-popup />
          -->
          <q-btn color="primary" label="Registrar" @click="RegistrarFase" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

export default {
  props: {
    DialogoFase: {
      type: Boolean,
      required: true,
      default: false
    },
    idmetodologia: [String, String]
  },
  data() {
    return {
      Show: this.DialogoFase,
      nombre: ""
    };
  },
  watch: {
    DialogoFase() {
      this.Show = this.DialogoFase;
    }
  },
  methods: {
    RegistrarFase() {
      let nombre_fase = this.nombre;
      let metodologiaId = this.idmetodologia;
      const obj = { nombre_fase, metodologiaId };
      //  this.$axios.get('metodologia/Fases/'
      this.$axios
        .post("Fases/AgregarFase/", obj)
        .then(response => {
            var estado=response.data.estado;
               this.CerrarModal();
              if (estado=="Existe"){
                   this.Existe(); 
              } else{
                   this.Confirmacion();
                   this.ListarFases(this.idmetodologia);
                                
              }         
       
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    ListarFases(idmeto) {
      this.$emit("Listar-Fase", idmeto);
    },
    CerrarModal() {
      this.$emit("CerrarModal");
    },
    Existe() {
      Swal.fire({
        title: "<strong>Alerta </strong>",
        icon: "info",
        html: "Este fase existe  "
      });
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
