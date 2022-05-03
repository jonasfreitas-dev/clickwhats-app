// import Vue from 'vue'

export default function auth({ next, router }) {
  if (!localStorage.getItem('jwt')) {
    return router.push({ name: 'login' })
  }
  next()
}
