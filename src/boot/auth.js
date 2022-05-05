export default ({ app, router, store, Vue }) => {
  // GOOD
  router.beforeEach((to, from, next) => {
    const user = localStorage.user ? JSON.parse(localStorage.user) : null
    const jwt = localStorage.jwt ? localStorage.jwt : null
    if (jwt) {
      store.commit('app/setUser', user)
      store.commit('app/setJwt', jwt)

      Vue.prototype.$api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${jwt.replace(/['"]+/g, '')}`
    }
    if (
      to.name !== 'Login' &&
      to.name !== 'Home' &&
      to.name !== 'Widget' &&
      !store.state.app.user
    )
      next({ name: 'Login' })
    else next()
  })
}
