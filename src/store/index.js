import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    Develop: false,
    Loading: false,
    PsssInfo: null,
    Config: null
  },
  mutations: {
    Update_Config(State, Data) {
      State.Config = Data
    },
    Update_PassInfo(State, Data) {
      State.PsssInfo = Data
    },
    Update_Loading(State) {
      State.Loading = true
    }
  }
})

export default Store