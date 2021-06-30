<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import Vue from "vue";
import VueSession from 'vue-session'
Vue.use(VueSession)

export default {
  name: 'App',
  created(){
       if (!this.$session.exists()) {
          this.$router.push('/login').catch(err => {
       // Ignore the vuex err regarding  navigating to the page they are already on.
            if (
              err.name !== 'NavigationDuplicated' &&
              !err.message.includes('Evitó la navegación redundante a la ubicación actual')
            ) {
              // But print any other errors to the console
              console(err);
            }
          });
    }   
  }
}
</script>
