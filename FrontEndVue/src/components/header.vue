<template>
     
    <q-header elevated>
     
    </q-header>
</template>

<script>
export default {
    name: 'header',
    
    
    data () {
        return{

        }
    },
    methods:{
        change(){
            this.$emit('ViewDrawer-Emit');
        }
    }
    //leftDrawerOpen

}
</script>