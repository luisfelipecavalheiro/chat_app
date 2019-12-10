import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    state: {
    users: [] 
  },
  actions: {
    getUserData ({ commit }, email) {
      // Consome API utilizando axios
      axios
      .post('http://localhost/lumen/public/clients/validated', {          
          email: email         
        })
        .then(r => r.data) 
        .then(users => {
        // Envia para mutation
        commit('GET_USERS', users)
        })       
    },
    registerUser ({ commit }, { name, email, image}) {
      axios
      // Consome API utilizando axios
      .post('http://localhost/lumen/public/clients', {
          name: name,
          email: email,
          image: image     
        })
        .then(r => r.data) 
        .then(users => {
        // Envia para mutation  
        commit('SET_USERS', users)
        })       
    }
  },
  mutations: {
    // Atualiza state com dados do cliente recebido via api
    GET_USERS (state, users) {
      state.users = users
    },
    // Salva dados cliente via api
    SET_USERS (state, users) {
      state.users = users
    }
  },
})