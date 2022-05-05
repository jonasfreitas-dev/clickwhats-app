import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({
  baseURL: 'https://empty-cases-rush-179-125-21-219.loca.lt/api'
})

Vue.prototype.$api = api
Vue.prototype.$site = process.env.SITE
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

export { axios, api }
