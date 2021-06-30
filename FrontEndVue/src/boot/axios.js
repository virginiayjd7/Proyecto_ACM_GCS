import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({ 
    baseURL: 'http://localhost:3050/' 
  })
  export default ({ Vue }) => {
    Vue.prototype.$axios = axiosInstance
  }
  export { axiosInstance }