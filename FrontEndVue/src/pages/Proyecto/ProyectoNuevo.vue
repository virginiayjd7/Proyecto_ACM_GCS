<template>
     <q-page class="q-pa-md">
          <q-form      
        class="q-gutter-md"
        >
     <div class="row" >
            <div class="col-6" style="padding: 0px 1% 0px">
      <q-input       
        label="Mombre Proyecto *"           
        v-model="nombre_proyecto"
      />
         </div>
        <div class="col-6" style="padding: 0px 1% 0px">
       <q-input v-model="fecha_inicio" filled type="date"  />
        </div>       
       </div>     
        <div class="row" >
             <div class="col-6" style="padding: 0px 1% 0px">
            <textarea v-model="descripcion"  cols="65" rows="3"></textarea>
             </div>
              <div class="col-6" style="padding: 0px 1% 0px">
        <q-input v-model="fecha_fin" filled type="date"  />
        </div>           
      </div>
      <div class="row">  
         <div class="col-6" style="padding: 0px 1% 0px">
                <q-select outlined v-model="metodologiaId" :options="metodologias" label="Metologia"  :value="metodologiaId" @input="val => { handleChange(metodologiaId) }" />
                        
             </div>   

      </div>    
 <div>
    <q-splitter
      v-model="splitterModel"
      style="height: 250px"
    > 
      <template  v-slot:before >
         <div v-for="item in fases" :key="item.key"  @click="onChanges(item.index)" >
             <q-tabs
              v-model="tab"
              vertical            
              class="text-teal"
            >
          <q-tab name="mails" icon="mail" :label="item.nombre_fase" />   
        </q-tabs>        
      </div> 
      </template>   

      <template v-slot:after>

       <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >      
        <q-tab-panel name="mails">   
           <q-table
          title="Elementos Configuracion"  
 hide-header
            :data="fases[tabIndex].tabla"  
           :columns="fields"
          row-key="NombreElemento"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          :selected.sync="selected"
        />
          <div class="q-mt-md">
            Selected: {{ JSON.stringify(fases) }}
          </div>
          </q-tab-panel>    
        </q-tab-panels> 
        </template>
        
    </q-splitter>

  </div>
      <div>
        <q-btn label="Rrgistrar" type="button" @click="RegistrarProyecto" color="primary"/>
        <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>    
  </q-page>
</template>


<script>
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

export default {
//el usuaariio jefe tiene que llenarse cuando haga login
    data(){
        return{
       
           tabIndex: 0,
           nombre_proyecto:'',
           codigo:'',
           descripcion:'',
           fecha_inicio:'',
           fecha_fin:'',
           metodologia:'',
           metodologiaId:'',
           usuariojefeId:'',
           metodologias:[],
           plantillaelemento:[],
           listaFases:[],
           listaElementos:[],
           TodasPlantillas:[],
           fases:[],        
          selected: [],
          elementos:{nombre:''},
          step1: '',
          step2: '',
          cStep: 1,  
          current: 0, 
          seleccionados:[],
          idseleccionados:[],
          idseleccionadosfases:[],
          Listacronogramafase:[],
          listaenviar:[],
          stepStyle: {
          marginBottom: '20px',
          boxShadow: '0px -1px 0 0 #e8e8e8 inset',
           },
          fields: [
                   {  name:'NOMBREELEMENTO',label:"NombreElemento", field: 'NombreElemento', align: 'left', sortable: false },              
             ],           
          tabs: [],
          tablas:{},
          tabCounter: 0,
          tab: 'mails',
          splitterModel: 20,  
          data: []
     
          }
      },   
    created(){
     //  this.ListarTodasPlantillas();
       this.ListarTodasPlantillas();
       this.ListarMetodologias();
    },
    mounted() {
    
      if(localStorage.id_usuario) this.usuariojefeId = localStorage.id_usuario;
      console.log(this.usuariojefeId)
     
    },
    methods:{      
      
       getSelectedString () {
        return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
       },
       newTab() {
        this.tabs.push(this.tabCounter++)
        },   
        RegistrarProyecto(){  
          this.listaElementos=[];         
       //  for(var i =0;i<this.seleccionados.length ;i++){           
           //  this.listaElementos.push({id:this.idseleccionados[i],nombre:this.seleccionados[i],id_fase:this.idseleccionadosfases[i]});
         // }
         //  for(var i =0;i<this.selected.length ;i++){           
         //    this.listaElementos.push({id:this.idseleccionados[i],nombre:this.seleccionados[i],id_fase:this.idseleccionadosfases[i]});
         // }
      
          let nombre_proyecto=this.nombre_proyecto;
          let fecha_inicio=this.fecha_inicio;
          let fecha_termino=this.fecha_fin;
          let descripcion=this.descripcion;
          let usuariojefeId=this.usuariojefeId;
          let estado="activo";
          let metodologiaId=this.metodologiaId.value;  
          var ListaFases=this.listaFases;
          var cantidad=ListaFases.length;
          var porcentaje=100/parseInt(cantidad); 
          const obj={nombre_proyecto,fecha_inicio,fecha_termino,descripcion,estado,metodologiaId,usuariojefeId,porcentaje,ListaFases}
        //console.log(obj);
          //nombre_proyecto,fecha_inicio,fecha_termino,descripcion,estado,metodologiaId,usuariojefeId,porcentaje,ListaFases
         // const obj={codigo,nombre,fechaini,fechater,descripcion,estado,metodologia,usuariojefeId,lista,ListaElementos,porcentaje};
          this.$axios.post('Proyecto/Agregar/',obj).then(response => {                       
                 console.log(response);                 
                //  this. Confirmacion();
                  var estado=response.data.estado;                 
                    if(estado=="Existe"){
                        this.Existe(); 
                    } else{
                       this.Listacronogramafase=response.data.vector;

                       this.AgregarCronogramaElemento();   
                        this.Confirmacion();       
                    }                    
                }).catch(function (error) {
                      console.log(error);
                }) .finally(() => {                     
              }) 
          },
         handleChange(item) {              
             this.MostarFaseMetodolgia(item.value);
          },
          AgregarCronogramaElemento(){
            // tengo que hacer esto para otro dia We
            //   var lista=[];        
            //   for(var i =0;i<this.seleccionados.length ;i++){            
             //     lista.push({id:this.idseleccionados[i],nombre:this.seleccionados[i],id_fase:this.idseleccionadosfases[i]});
             //  }
               for(var i =0;i<this.selected.length ;i++){     
                 for (var e =0;e<this.Listacronogramafase.length;e++){
                   if(this.selected[i].id_fase==this.Listacronogramafase[e].id_fase){
                      this.listaenviar.push({id:this.selected[i].id,nombre:this.selected[i].NombreElemento,id_fase:this.Listacronogramafase[e].id_fase,id_cronograma_fase:this.Listacronogramafase[e].id_cronograma_fase});
                   }
                 }
               }
              let listacronogramaelemento=this.listaenviar;
              console.log(listacronogramaelemento);
              const obj={listacronogramaelemento}
               this.$axios.post('CronogramaElemento/Agregar/',obj).then(response => {  
                 // this.Limpiar();
                }).catch(function (error) {
                      console.log(error);
                      this.Limpiar();
                }) .finally(() => {                     
             });
          },
          ListarMetodologias(){
                  let me=this;
                  var tipoDcumento=[];
                   this.$axios.get('metodologia/Listar/').then(response => {   
                    tipoDcumento=response.data; 
                    console.log(response.data)
                    tipoDcumento.map(function(x){
                         me.metodologias.push({label: x.nombre,value:x.metodologiaId});
                   });  
                  
              }).catch(function(error){
                  console.log(error);
              });
          },
          Confirmacion(){
            this.$swal({
                position: 'top-end',
                icon: 'success',
                title: 'Registrado',
                text:'texto',
                showConfirmButton: false,
                timer: 3000
              })
          },       
          MostarFaseMetodolgia(metodologiaId){
                let me=this;
               me.Limpiar();
                this.$axios.get('metodologia/Fases/'+metodologiaId).then(response => {            
                  
                    console.log(response.data)
                    if ( response.data.length>0) {
                        me.fases = response.data;
                        me.listaFases=[];                 
                        response.data.forEach(item=>{
                            me.listaFases.push({nombre: item.nombre_fase,id_fase:item.id_fase});   
                          });               
                      for(var i=0;i< me.fases.length ;i++){                       
                          for  (var e=0;e< me.TodasPlantillas.length ;e++){
                          // console.log(me.TodasPlantillas[e].id_fase);
                              if(me.fases[i].id_fase==me.TodasPlantillas[e].id_fase){   
                            //    console.log("Existe");
                                  me.fases[i].tabla.push({ NombreElemento:me.TodasPlantillas[e].nombre,id:me.TodasPlantillas[e].id_elemento,id_fase: me.fases[i].id_fase})
                              } 
                          }                    
                        }  
                    }else{
                      //   alert("llega vacio")
                          me.listaFases=[];
                        //  me.fases=[];
                          me.fases[0].tabla=[]
                          me.fases[0]=[]
                   
                    }
                  
                      }).catch(function (error) {
                          console.log("ERrro");
                          console.log(error);
                  }) .finally(() => {
              })
          },

          Ver(value){
            this.tabIndex=value;
            console.log(value)
            var code =this.fases[value].id_fase;           
            console.log("id fase= "+code);
            //this.ListarElemtosFase(code);

          },

          onChanges(current) {
              console.log('onChange:', current);
            this.tabIndex=current;            
           //   this.current = current;
              var code =this.fases[current].id_fase;           
              console.log("id fase= "+code);
             // this.ListarElemtosFase(code);  
          },
          ListarElemtosFase(id_fase){
              let me=this;
              this.$axios.get('PlantillaElemento/'+id_fase).then(response => {     
                  console.log(response.data)            
                    me.plantillaelemento = response.data;     
                             
                  }).catch(function (error) {
                          console.log(error);
                  }) .finally(() => {
              })
          }, 
          ListarTodasPlantillas(){
              let me=this;               
              
              
                console.log("todos los elemetos")  
                this.$axios.get('PlantillaElemento/ListarPlantilla/',).then(function(response){                      
                  me.TodasPlantillas=response.data;  
                
                 console.log(response.data);  
              }).catch(function(error){
                  console.log(error);
              });
          },
          onPreviewClick(data, id, nombre,id_fase) {
           //  console.log(data,id,nombre);
           //  console.log("id_Fase",id_fase);  
               var existe=null;            
                if(this.Verificar(id,nombre)){                
                  this.Quitar(id,nombre,id_fase);                  
                }else{                
                  this.agregar(id,nombre,id_fase);   
                }        
            },
            Verificar(id,nombre){           
               for(var i =0;i< this.seleccionados.length;i++){
                 if (this.seleccionados[i]==nombre){
                    return true;  
                 }
               }  
              return false;
            },
            agregar(id,nombre,id_fase){
                  this.seleccionados.push(nombre);
                  this.idseleccionados.push(id);
                  this.idseleccionadosfases.push(id_fase);
               
            },
            Quitar(id,nombre,id_fase){             
               this.seleccionados.splice(this.seleccionados.indexOf(nombre), 1);
               this.idseleccionados.splice(this.idseleccionados.indexOf(id), 1);
               this.idseleccionadosfases.splice(this.idseleccionadosfases.indexOf(id_fase),1);              
            },
             Existe(){
                Swal.fire({
                    title: '<strong>Alerta </strong>',
                    icon: 'info',
                    html:
                    'Nombre de proyecto usado ' ,                
                })
            }, 
            Limpiar(){
              this.seleccionados=[];
              this.idseleccionados=[];
              this.idseleccionadosfases=[];
              this.listaenviar=[];
              this.listaFases=[]
              this.selected=[];
            }
    }
}
</script>