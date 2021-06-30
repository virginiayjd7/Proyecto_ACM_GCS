<template>
  <q-page class="q-pa-md">   
        <div class="col-md-6 col-sm-12 col-xs-12">
        <card-base>
          <apex-pie></apex-pie>
        </card-base>
      </div>
  </q-page>
</template>


<script>
import CardBase from 'components/CardBase.vue'

export default {
  name: 'PageIndex',
  components: {
    CardBase,  
    ApexPie: () => import('components/ApexPie.vue'),     
  },
  data () {
    return {
      loading: true,
      dialog: true,
      colors: [
        'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
        'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
        'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
        'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
      ]
    }
  },
  created () {
 
  }
}
</script>