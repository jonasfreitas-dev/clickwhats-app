import axios from 'axios'

const api = axios.create({
  baseURL: 'https://warm-mugs-cross-168-121-203-197.loca.lt/api'
})

let token = localStorage.getItem('jwt')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token.replace(
    /['"]+/g,
    ''
  )}`
}
