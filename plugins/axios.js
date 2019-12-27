import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = `http://localhost:3000`
axios.defaults.timeout = 3000
axios.defaults.withCredentials = false
axios.defaults.headers.common.Authorization = ''
export {
  axios
}
Vue.use(VueAxios, axios)
