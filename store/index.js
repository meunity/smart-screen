export const state = () => ({
  accessToken: '',
  username: '',
  name: '',
  pwd: ''
})

export const mutations = {
  setPrivate (state, name, pwd, trueName) {
    state.name = name
    state.pwd = pwd
    state.username = trueName
  },
  setTrueName (state, trueName) {
    state.username = trueName
  },
  resetPrivate (state) {
    state.name = ''
    state.pwd = ''
    state.username = ''
  }
}
