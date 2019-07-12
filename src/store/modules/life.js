import {isEmpty} from 'util/common';
import { localStorage, sessionStorage } from 'common/storage'

let defaultHistory = []
let defaultConfig = {
  type: 13, // 13电费 12水费 14燃煤费
  city: '',
  group: 0, // 0 我家 1 父母 2 朋友 3 其他
}
try{
  if (localStorage.get('city_history')) {
    defaultHistory = localStorage.get('city_history')
  }
  if (sessionStorage.get('life_config')) {
    defaultConfig = sessionStorage.get('life_config')
  }
} catch(e) {
  console.error(e)
}
const state = {
  config: defaultConfig,
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
    try{
      sessionStorage.set('life_config', state.config)
    } catch(e) {
      console.error(`sessionStorage保存life_config失败`)
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
      type: 13,
      city: '',
      group: 0, // 0 我家 1 父母 2 朋友 3 其他
    }
    try{
      sessionStorage.set('life_config', state.config)
    } catch(e) {
      console.error(`sessionStorage保存life_config失败`)
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
