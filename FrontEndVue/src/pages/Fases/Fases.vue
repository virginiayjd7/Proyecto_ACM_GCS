<template>
  <q-page class="q-pa-md">
    <h5>Fases metodologia</h5>
    <q-btn color="primary" style="width: 150px" @click="DialogoFase = true">
      <div class="ellipsis">
        Fase Nueva
      </div>
    </q-btn>
    <q-btn
      color="primary"
      style="margin-left:5px"
      @click="DialogoFaseElemento = true"
    >
      <div class="ellipsis">
        + ECS
      </div>
    </q-btn>
    <br /><br />
    
    <q-list
      bordered
      v-for="item in items"
      :key="item.key"
      @click="ListarElemtosFase(item.id_fase)"
    >
      <q-expansion-item
        group="somegroup"
        icon="explore"
        :label="item.nombre_fase"
        header-class="text-primary"
      >
        <q-card>
          <q-card-section>
            <q-list bordered>
              <q-item
                v-for="contact in elementos"
                :key="contact.id_elemento"
                class="q-my-sm"
              >
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    E
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ contact.nombre }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="chat_bubble" color="green" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
    </q-list>
    <fase-nueva
      @CerrarModal="CerrarModal"
      :DialogoFase="DialogoFase"
      v-bind:idmetodologia="id_metodologia"
      v-on:Listar-Fase="ListarFasePorMetodologia"
    ></fase-nueva>
    <fases-elemento
      @CerrarModal="CerrarModal"
      :DialogoFaseElemento="DialogoFaseElemento"
      v-bind:idmetodologia="id_metodologia"
    >
    </fases-elemento>
    <!--
         <fase-nueva @CerrarModal="CerrarModal" :DialogoFase="DialogoFase"  v-bind:idmetodologia="id_metodologia" v-on:Listar-Fase="ListarFasePorMetodologia"></fase-nueva>
         <fases-elemento @CerrarModal="CerrarModal" :DialogoFaseElemento="DialogoFaseElemento" v-bind:idmetodologia="id_metodologia" > </fases-elemento>
    -->
  </q-page>
</template>

<script>
import FaseNueva from "./FaseNueva";
import FasesElemento from "./FasesElemento";

export default {
  components: { FaseNueva, FasesElemento },
  data() {
    return {
      items: [],
      elementos: [],
      id_metodologia: "",
      DialogoFase: false,
      DialogoFaseElemento: false
    };
  },
  mounted() {
    this.GetDatos();
  },
  methods: {
    GetDatos() {
      var item = this.$route.params.item;
      if (item) {
        var val = item.split("-");
        //  this.datos.id_metodologia = val[0]
        //  this.id_metodologia=val[0];
        //  this.datos.nombre=val[1]
        //  this.nombremetodologia=val[1];
        this.id_metodologia = val[0];
        this.ListarFasePorMetodologia(val[0]);
      }
    },
    ListarFasePorMetodologia(metodologiaId) {
      let me = this;
      this.$axios
        .get("metodologia/Fases/" + metodologiaId)
        .then(response => {
          me.items = response.data;

          // me.ListarElemtosFase(me.items[0].id_fase);
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    ListarElemtosFase(faseId) {
      let me = this;
      me.elementos = [];
      this.$axios
        .get("PlantillaElemento/Elementos/" + faseId)
        .then(response => {
          console.log(response.data);
          me.elementos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {});
    },
    CerrarModal() {
      this.DialogoFase = false;
      this.DialogoFaseElemento = false;
    }
  }
};
</script>
