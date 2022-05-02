export default ({ app, router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    const user = localStorage.user ? JSON.parse(localStorage.user) : null

    const jwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null
    if (jwt) {
      store.commit('app/setUser', user)
      store.commit('app/setJwt', jwt)

      Vue.prototype.$api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${jwt.replace(/['"]+/g, '')}`
    }
    if (
      to.name !== 'Login' &&
      to.name !== 'Leads' &&
      to.name !== 'HOME' &&
      !store.state.app.user
    )
      next({ name: 'login' })
    else next()
  })
}
