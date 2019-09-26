import {isEmpty} from 'util/common';
import {sessionStorage } from 'common/storage'
let defaultConfig = {
  type: 0, //0直充 1卡充
  realDirP:undefined,
  dirPrice:undefined,
  realCarP:undefined,
  cardPrice:undefined,
  mobile:""
}

// try{
//   if (sessionStorage.get('phone_config')) {
//     defaultConfig = sessionStorage.get('phone_config')
//   }
// } catch(e) {
//   console.error(e)
// }


const state = {
  config: defaultConfig
}


// getters
const getters = {
  getConfig (state) {
    if (!state.config || isEmpty(state.config)) return undefined
    return state.config
  },
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
    state.config = Object.assign(state.config, config)
    // sessionStorage.set('phone_config', state.config)
  },
  initConfig(state) {
    state.config = {
      type: 0, //0直充 1卡充
      realDirP:undefined,
      dirPrice:undefined,
      realCarP:undefined,
      cardPrice:undefined,
      mobile:""
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
