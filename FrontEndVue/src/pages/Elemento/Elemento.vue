<template>
  <q-page class="q-pa-md">
    <h5>Elementos</h5>
    <q-btn color="primary" style="width: 150px" @click="DialogoElemento = true">
      <div class="ellipsis">
        Agregar
      </div>
    </q-btn>
   <div class="q-gutter-y-md column" style="max-width: 500px;float:right">
       <q-input outlined bottom-slots v-model="search" label="Buscar" counter maxlength="52" >
              <template v-slot:append>
          <q-icon v-if="search !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
        
      </q-input>
   </div>

    <br /><br /><br>
    
    <div class=" row">
      <div class=" q-pa-md col-4" v-for="item in FilterList" :key="item.key">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Elemento</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ item.nombre }}</div>
              <div class="text-caption text-grey">
                texto
              </div>
            </q-card-section>
            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
            </q-card-section>
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat>
              Editar
            </q-btn>
            <q-btn flat color="primary">
              Eliminar
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <elemento-nuevo
      @CerrarModal="CerrarModal"
      :DialogoElemento="DialogoElemento"
      v-on:ListarElemento-Emit="ListaElemento"
    ></elemento-nuevo>
  </q-page>
</template>

<script>
import ElementoNuevo from "./ElementoNuevo";

import { ref } from 'vue'

export default {
  components: { ElementoNuevo },
  data() {
    return {

      search:'',      
      items: [],      
      elementos: [],
      id_elemento: "",
      DialogoElemento: false,
      DialogoModificar: false,
     
    };
  },
  mounted() {
    //   this.GetDatos()
  },
  created() {
    this.ListaElemento();
  },
  
  methods: {
    ListaElemento() {
      let me = this;
      this.$axios
        .get("Elemento/Listar/")
        .then(response => {
          me.items = response.data;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    CerrarModal() {
      this.DialogoElemento = false;
    }
  },
   computed: {
            FilterList() {
                return this.items.filter(post => {
                return post.nombre.toLowerCase().includes(this.search.toLowerCase())
               })
            }
        }
}
</script>
