export function setUser(state, payload) {
  state.user = payload
}

export function setEmpty(state, payload) {
  state = payload
}

export function setJwt(state, payload) {
  state.jwt = payload
}
