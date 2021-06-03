import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    name: "John Doe",
    age: "28"
  },
  getters: {
    NAME: state => {
      return state.name;
    }
  },
  mutations: {
    SET_NAME: (state, payload) => {
      state.name = payload;
    },
  },
  actions: {
    SET_NAME: (context, payload) => {
      context.commit('SET_NAME', payload);
    },
  }
})

export const bus = new Vue();

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
