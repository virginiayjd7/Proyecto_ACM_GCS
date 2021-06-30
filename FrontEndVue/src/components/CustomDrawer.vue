<template>
     <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label   header  class="text-grey-8"  >
          Sistema
        </q-item-label>

          <q-item clickable to="/metodologia">
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Metodologia</q-item-label>
          </q-item-section>              
          </q-item>

         <q-item clickable  to='/elemento'>
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Elementos</q-item-label>
          </q-item-section>              
          </q-item>

          <q-item clickable  to='/proyectolista'>
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Proyecto</q-item-label>
          </q-item-section>              
          </q-item>
      <q-item clickable  to='/login'>
          <q-item-section avatar>
            <q-icon name="school"> </q-icon>
          </q-item-section>
          <q-item-section>
              <q-item-label> Salie</q-item-label>
          </q-item-section>              
          </q-item>

       </q-list>
    </q-drawer>
</template>

<script>
export default {
     props: {
        /* this prop gets passed down from our parent - it should NOT be manipulated directly! */
        leftDrawerOpen: Boolean
    },
     data () {
   
            return {
                /* A local data copy of our prop - which CAN be manipulated here */
                localLeftDrawerOpen: false
    
            }
    
    },
    watch: {
        
        /* If our prop ever gets changed outside of this component then we need to update our local data version of the prop */
        leftDrawerOpen: function(newVal) {
            this.localLeftDrawerOpen = newVal;
        }

    },

    mounted: function() {

        /* As soon as the component is mounted convert our passed prop into data*/
       /* This line may or may not be necessary - The watch function probably covers it already, but I haven't tested without it yet */
        this.localLeftDrawerOpen = this.leftDrawerOpen;

    }

}
</script>