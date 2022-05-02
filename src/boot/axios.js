import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({
  baseURL: 'https://9368-2804-3244-200-3348-d197-95ee-809a-504b.ngrok.io/api'
})

Vue.prototype.$api = api
Vue.prototype.$site = process.env.SITE
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

export { axios, api }
