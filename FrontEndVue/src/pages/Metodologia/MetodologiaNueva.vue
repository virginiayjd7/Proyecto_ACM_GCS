<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Nueva Metodlogia</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
          <q-input outlined v-model="nombre" label="nombre Metodlogia" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
         
          <q-btn
            color="primary"
            label="Registrar"
            @click="RegistrarMetodologia"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
//DialogMetodologia
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

export default {
  name: "metodologia-nueva",
  props: {
    DialogMetodologia: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      Show: this.DialogCliente,
      isLoading: false,
      contador: 0,
      codigo: "",
      nombre: ""
    };
  },
  watch: {
    DialogMetodologia() {
      this.Show = this.DialogMetodologia;
    }
  },
  created() {},
  computed: {},
  methods: {
    RegistrarMetodologia() {
      let nombre = this.nombre;
      const obj = { nombre };
      if(nombre==""){
        alert("llenar campo");
        return;
      }
      this.$axios
        .post("metodologia/AgregarMetodologia", obj)
        .then(response => {      

              var estado=response.data.estado;
               this.CerrarModal();
              if (estado=="Existe"){
                 this.Existe(); 
              } else{
                 this.Confirmacion();
                 this.ListarMetodologia();  
                 this.Limpiar();              
              }
        
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    ListarMetodologia() {
      this.$emit("Listar-Emit");
    },

    CerrarModal() {
      this.$emit("CerrarModal");
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
     Existe(){
          Swal.fire({
            title: '<strong>Alerta </strong>',
            icon: 'info',
            html:
              'Nombre de metodologia usado ' ,
          
          })
       }, 
       Limpiar(){
          this.nombre="";
       }
  }
};
</script>
