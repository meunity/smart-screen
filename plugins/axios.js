import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = `http://localhost:8080`
axios.defaults.timeout = 5000
axios.defaults.headers.common.Authorization = ''

Vue.use(VueAxios, axios)
