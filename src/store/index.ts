import { createStore } from 'vuex'

interface IRootState {}

export default createStore({
  state: () => {
    return {} as IRootState
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {},
    setPowersDescriptionList(state, powersDescriptionList) {}
  },
  actions: {
  },
  modules: {
  }
})
