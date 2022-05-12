import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({
  baseURL: 'https://fruity-pots-smell-138-117-223-71.loca.lt/api'
})

Vue.prototype.$api = api
Vue.prototype.$site = process.env.SITE
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

export { axios, api }
