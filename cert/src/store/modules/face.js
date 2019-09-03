import storage from '@/common/js/local'
import { isObject } from '@/util/common'

let defaultConfig = {
  name: '',
  idcard: ''
}
try{
  if (storage.get('face_config')) {
    defaultConfig = storage.get('face_config')
  }
} catch(e) {
  console.error(e)
}
const state = {
  config: defaultConfig,
}

// getters
const getters = {
  getConfig (state) {
    return state.config
  }
}

// actions
const actions = {
  setConfig({ state, commit }, config) {
    commit('setConfig', config)
  },
  initConfig({commit}) {
    commit('initConfig')
  }
}

// mutations
const mutations = {
  setConfig(state, config) {
    if (!config || !isObject(config)) {
      state.config = undefined
    } else {
      state.config = Object.assign(state.config, config)
    }
    try{
      storage.set('face_config', state.config)
    } catch(e) {
      console.error(`sessionStorage保存face_config失败`)
    }
  },
  initConfig(state) {
    state.config = {
      name: '',
      idcard: ''
    }
    try{
      storage.set('face_config', state.config)
    } catch(e) {
      console.error(`sessionStorage保存face_config失败`)
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

