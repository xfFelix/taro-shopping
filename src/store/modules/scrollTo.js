
import { localStorage } from 'common/storage'
let defaultGoodsList = ''
try{
  if (localStorage.get('goodsList')) {
    defaultGoodsList = localStorage.get('goodsList')
  }
} catch(e) {
  console.error(e)
}

const state = {
  goodsList: defaultGoodsList
}

// getters
const getters = {
  getGoodsList: state => {
    return state.goodsList
  }
}

// actions
const actions = {
  setGoodsList ({state, commit}, scroll) {
    commit('setGoodsList', scroll)
  }
}

// mutations
const mutations = {
  setGoodsList(state, scroll) {
    state.goodsList = scroll
    try {
      localStorage.set('goodsList',scroll)
    }catch(e) {
      console.error(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
