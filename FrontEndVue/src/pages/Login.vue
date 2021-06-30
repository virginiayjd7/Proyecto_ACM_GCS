<template>
 <div  class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274C5, #5A4A9F);">

    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:400px;height:485px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Gestion de la Configuracion</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <q-btn fab icon="add" color="purple-4" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square clearable v-model="email"  ref="email" type="email" label="Correo">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="password"  ref="password" type="password" label="Contraseña">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pa-md q-gutter-md">
              <q-btn round color="indigo-7">
                <q-icon name="fab fa-facebook-f" size="1.2rem" />
              </q-btn>
              <q-btn round color="red-8">
                <q-icon name="fab fa-google-plus-g" size="1.2rem" />
              </q-btn>
              <q-btn round color="light-blue-5">
                <q-icon name="fab fa-twitter" size="1.2rem" />
              </q-btn>
            </div>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" @click="Loguear" label="Ingresar" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Forgot your password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>

    
  
 </div>
</template>
 

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
       Loguear(){     
           let  correo =this.$refs.email.value;
           let  password =this.$refs.password.value;    
             
            const obj={correo_usuario:correo,password:password};
              this.$axios.post('Login/Loguear',obj).then(response => {   
               console.log(response.data)
              if (response.data.estado==true) {

                this.$store.dispatch("guardarDatos",response.data.data.nombre)      
                this.$store.dispatch("guardarTipo",response.data.data.id_tipo)    
                this.$store.dispatch("guardarTipoUsuario",response.data.data.tiposusuario)    
                this.$store.dispatch("guardarIdUsuario",response.data.data.id_usuario)    

                 this.$router.push({path:"/" });

              }else{
                alert("No existe user")
              }
                   
              }).catch(function (error) {
                      console.log(error);
             }) .finally(() => {
                     
            })
    },  

  }
}
</script>
