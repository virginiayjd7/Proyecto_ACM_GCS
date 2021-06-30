<template>
  <div class="q-pa-md">
    <q-table
      title="Solicitud de Cambio"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="codigo" :props="props">
            {{ props.row.codigo }}
          </q-td>
          <q-td key="nombre_proyecto" :props="props">
            {{ props.row.nombre_proyecto }}
          </q-td>

          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
          </q-td>
          <q-td key="estado" :props="props">
            {{ props.row.estado }}
          </q-td>
          <q-td key="fecha" :props="props">
            {{ props.row.fecha }}
          </q-td>
          <q-td key="button" :props="props"  style="width:40px">    
             <q-btn  type="a" color="primary" label="Documento"  :href="props.row.documento"  target="_blank">
               
             </q-btn>
             
          </q-td>

           <q-td key="Evaluar" :props="props" style="width:40px">
               <q-btn color="primary" label="Evaluar" @click="MensajeEvaluar" />

          </q-td>
        </q-tr>
      </template>
    </q-table>

     <q-dialog v-model="Show" @hide="CerrarModal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Evaluar Solicitud</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
         <q-input outlined  label="Algo" />
         <br>
        
        </q-card-section>         
       
         <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
         <!-- <q-btn flat label="Accept" color="primary" v-close-popup />
          -->
          <q-btn color="primary" label="Registrar"   />
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
  data() {
    return {
      columns: [
        { name: "codigo", label: "codigo", field: "codigo", sortable: true },
        {
          name: "nombre_proyecto",
          label: "Proyecto",
          field: "nombre_proyecto",
          sortable: true,
          align: 'center'
        },
        {
          name: "nombre",
          label: "Solictgante",
          field: "nombre",
          sortable: true,
          align: 'center'
        },
        { name: "estado", label: "estado", field: "estado", sortable: true },
        { name: "fecha", label: "fecha", field: "fecha", sortable: true ,align: 'center'},
        { name: "button", label: "Doc", field: "button" ,sortable: true,align: 'center'},
        { name: "Evaluar", label: "Evaluar", field: "button",sortable: true,align: 'center' }
      ],
      data: [],
      Show:false,


    };
  },
  created() {
    this.ListarSolicitudes();
  },
  methods: {
    ListarSolicitudes() {
      let me = this;
      this.$axios
        .get("Solicitud/ListarSolicitud")
        .then(response => {
          me.data = response.data;
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    CerrarModal(){
      this.Show=false;
    },
  async  MensajeEvaluar(){
        const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            '#ff0000': 'Aprobar',
            '#00ff00': 'Green',
            '#0000ff': 'Blue'
          })
        }, 1000)
      })

      const { value: color } = await Swal.fire({
        title: 'Select color',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to choose something!'
          }
        }
      })
      if (color) {
        Swal.fire({ html: `You selected: ${color}` })
      }
    }
  }
};
</script>

<style>
.btnareft {
  background-color: #f44336;
  color: white;
  padding: 14px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
</style>
