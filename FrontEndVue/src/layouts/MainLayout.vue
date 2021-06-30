<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Sistema Gestion de laConfiguracion
        </q-toolbar-title>
       <q-btn unelevated rounded color="deep-orange" label="Salir"  @click="Salir" />

      </q-toolbar>
    </q-header>
  <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label   header  class="text-grey-8"  >
          <center>
            <label  style="font-size: 25px;color: #1A86D0;  font-weight:bold" for="">{{tipo_usuario}}</label>
 
          </center>
         <hr>
        </q-item-label>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Inicio</q-item-label>
          </q-item-section>              
          </q-item>
          <q-item clickable to="/metodologia"  v-if="esJefe">
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Metodologia</q-item-label>
          </q-item-section>              
          </q-item>

         <q-item clickable  to='/elemento' v-if="esJefe">
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Elementos</q-item-label>
          </q-item-section>              
          </q-item>

          <q-item   clickable  to='/proyectolista' v-if="esJefe"> 
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Proyecto</q-item-label>
          </q-item-section>              
          </q-item>
      <q-item   clickable  to='/usuarios' v-if="esJefe"> 
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Usuarios</q-item-label>
          </q-item-section>              
          </q-item>


          <q-item   clickable  to='/tareasmiembro' v-if="esMiembro"> 
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Tareas</q-item-label>
          </q-item-section>              
          </q-item>

          <q-item   clickable  to='/solicitud' v-if="esMiembro" > 
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> solicitud</q-item-label>
          </q-item-section>              
          </q-item>
        

         <q-item   clickable  to='/solicitudlista' v-if="esJefe"> 
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> solicitud lista</q-item-label>
          </q-item-section>              
          </q-item>
        


       </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
//import CustomDrawer from 'components/CustomDrawer'
const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
 
];

export default {
  name: 'MainLayout',
  components: { EssentialLink  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      tipo_usuario:'',
    }
  },
  mounted() {
     if (localStorage.tipousuario) this.tipo_usuario = localStorage.tipousuario;
  },
  methods: {
    Salir(){
      this.$session.destroy();
      this.$router.push("/login")      
      window.localStorage.setItem('authenticated', false);
      window.localStorage.clear();
       //    this.$router.push({name:"proyectomiembros",params:{idproyecto} });
    }
  },
   computed: {   
    esAdministrador(){
      return this.$store.state.tipousuario =='Administrador';
    },
     esMiembro(){
      return  this.$store.state.tipousuario =='Miembro';
    },
    esJefe(){
      return  this.$store.state.tipousuario =='Jefe';
    }
  },
}
</script>
