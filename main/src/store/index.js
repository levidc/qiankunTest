import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: null,
    commonData: {
      // parent: 1
    },
  },
  mutations: {
    setUserData (state, payload) {
      state.userData = payload
    },
    setCommonData (state, val) {
      state.commonData = val;
    }
  },
  actions: {
  },
  modules: {
  }
})
