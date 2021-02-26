import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin:sessionStorage.getItem('admin')?JSON.parse(sessionStorage.getItem('admin')):{},
    user:sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{},
    category:[],
    dscore:[
      {value: 0, name: '0星'},
      {value: 0, name: '1星'},
      {value: 0, name: '2星'},
      {value: 0, name: '3星'},
      {value: 0, name: '4星'},
      {value: 0, name: '5星'}
    ]
  },
  mutations: {
    addAdmin(state,payload){
      state.admin=payload
    },
    addUser(state,payload){
      state.user=payload
    },
    addCategory(state,payload){
      state.category.push(payload)
    },
    addDscore(state,payload){
      switch(payload){
        case 0:
          state.dscore[0].value++
          break
        case 1:
          state.dscore[1].value++
          break
        case 2:
          state.dscore[2].value++
          break
        case 3:
          state.dscore[3].value++
          break
        case 4:
          state.dscore[4].value++
          break
        case 5:
          state.dscore[5].value++
          break
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
