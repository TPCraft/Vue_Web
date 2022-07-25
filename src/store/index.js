import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    Config: {
      ApiUrl: "https://develop.tpcraft.cn/"
    },
    PsssInfo: null
  },
  mutations: {
    Update_Config(State, Data) {
      State.Config = Data
    },
    Update_PassInfo(State, Data) {
      State.PsssInfo = Data
    }
  }
})

export default Store