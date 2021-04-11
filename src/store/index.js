import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account : ""
  },
  getters : {
    account : state => {
      return state.account
    }
  },
  mutations: {
    setAccount : (state,val ) => {
      state.account = val
    }
  },
  actions: {},
  modules: {},
});
