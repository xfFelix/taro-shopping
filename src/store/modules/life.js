import {isEmpty} from 'util/common';
import { localStorage } from 'common/storage'

let defaultHistory = []
try{
  if (localStorage.get('city_history')) {
    defaultHistory = localStorage.get('city_history')
  }
} catch(e) {
  console.error(e)
}
const state = {
  config: {
    type: '电费', // 电费 水费 燃煤费
    city: ''
  },
  history: defaultHistory
}

// getters
const getters = {
  getConfig (state) {
    if (!state.config || isEmpty(state.config)) return undefined
    return state.config
  },
  getHistory (state) {
    if (!state.history || isEmpty(state.history)) return undefined
    return state.history
  }
}

// actions
const actions = {
  setConfig({ state, commit }, config) {
    commit('setConfig', config)
  },
  setHistory({ state, commit }, value) {
    let res = state.history.some(item => item === value)
    if (res) return
    commit('setHistory', value)
  },
  initConfig({commit}) {
    commit('initConfig')
  }
}

// mutations
const mutations = {
  setConfig(state, config) {
    if (!config || isEmpty(config)) {
      state.config = undefined
    } else {
      state.config = Object.assign(state.config, config)
    }
  },
  setHistory(state, value) {
    state.history.unshift(value)
    if (state.history.length > 6) {
      state.history.pop()
    }
    try {
      localStorage.set('city_history',state.history)
    }catch(e) {
      console.error(e)
    }
  },
  initConfig(state) {
    state.config = {
      type: '电费',
      city: ''
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
