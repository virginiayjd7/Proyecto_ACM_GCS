import Vue from 'vue';
import Login from 'pages/Login.vue';
import Router from 'vue-router';
Vue.use(Router);
import store from '../store/index'
/*
var routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name:'login',
      component: Login
    },
    {
      path: '*',
      component: () => import('pages/Error404.vue')
    }, 
    {
      path: '/',      
      name:'/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('pages/Index.vue') },
        { name:'metodologia', path: 'metodologia', component: () => import('pages/Metodologia/Metodologia.vue'),
         meta: {    Administrador :true,    }},
        { name: "fases",path: 'fases/:item', component: () => import('pages/Fases/Fases.vue') },
        { name: "elemento",path: 'elemento', component: () => import('pages/Elemento/Elemento.vue') },
        { name: "proyectolista",path: 'proyectolista', component: () => import('pages/Proyecto/ProyectoLista.vue') },
        { name: "proyectodetalle",path: 'proyectodetalle/:id_proyecto', component: () => import('pages/Proyecto/ProyectoDetalle.vue') },
        { name: "proyectonuevo",path: 'proyectonuevo', component: () => import('pages/Proyecto/ProyectoNuevo.vue') },
        { name: "proyectomiembros",path: 'proyectomiembros/:idproyecto', component: () => import('pages/Proyecto/ProyectoMiembros.vue') },
        { name: "fasedetalle",path: 'fasedetalle/:data', component: () => import('pages/Fases/FaseDetalle.vue') },
      
        { name: "tarea",path: 'tarea/:data', component: () => import('pages/Tarea/Tareas.vue') },
        { name: "tareadetalle",path: 'tareadetalle/:id', component: () => import('pages/Tarea/TareaDetalle.vue') },
          
         
      ],
    },
  ],
}); */

const routes = [
  {
    path: '/login',
    name:'login',
    component: Login
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }, 
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { name:'metodologia', path: 'metodologia', component: () => import('pages/Metodologia/Metodologia.vue'),
       meta: {    Administrador :true,    }},
      { name: "fases",path: 'fases/:item', component: () => import('pages/Fases/Fases.vue') },
      { name: "elemento",path: 'elemento', component: () => import('pages/Elemento/Elemento.vue') },
      { name: "proyectolista",path: 'proyectolista', component: () => import('pages/Proyecto/ProyectoLista.vue') },
      { name: "proyectodetalle",path: 'proyectodetalle/:id_proyecto', component: () => import('pages/Proyecto/ProyectoDetalle.vue') },
      { name: "proyectonuevo",path: 'proyectonuevo', component: () => import('pages/Proyecto/ProyectoNuevo.vue') },
      { name: "proyectomiembros",path: 'proyectomiembros/:idproyecto', component: () => import('pages/Proyecto/ProyectoMiembros.vue') },
      { name: "fasedetalle",path: 'fasedetalle/:data', component: () => import('pages/Fases/FaseDetalle.vue') },
    
      { name: "tarea",path: 'tarea/:data', component: () => import('pages/Tarea/Tareas.vue') },
      { name: "tareadetalle",path: '/tareadetalle/:data', component: () => import('pages/Tarea/TareaDetalle.vue') },
      { name: "tareasmiembro",path: 'tareasmiembro', component: () => import('pages/Tarea/TareaMiembro.vue') },
      { name: "tareasdetallemiembro",path: 'tareasdetallemiembro/:id', component: () => import('pages/Tarea/TareaDetalleMiembro.vue') },
      { name: "usuarios",path: 'usuarios', component: () => import('pages/Usuarios/Usuarios.vue') },
      { name: "solicitud",path: 'solicitud', component: () => import('pages/Solicitud/SolicitudNueva.vue') },

      { name: "solicitudlista",path: 'solicitudlista', component: () => import('pages/Solicitud/SolicitudLista.vue') },

    ]
  },   
 
]


 

export default routes
