import {isEmpty} from 'util/common';
import {sessionStorage } from 'common/storage'
let defaultConfig = {  //购买
  type: 0, //0金条 1金砂
  id:undefined,
  barPrice:undefined,
  sandPrice:undefined
}

let defaultBack = { //回购信息
  cardId:undefined,
  cardCode:undefined,
  type:undefined,
  weight:undefined,
  barPrice:undefined,
  sandPrice:undefined
}

try{
  if (sessionStorage.get('goldBack_config')) {
    defaultBack = sessionStorage.get('goldBack_config')
  }
} catch(e) {
  console.error(e)
}


const state = {
  config: defaultConfig,
  backInfo:defaultBack
}


// getters
const getters = {
  getConfig (state) {
    if (!state.config || isEmpty(state.config)) return undefined
    return state.config
  },
  getBackInfo (state) {
    if (!state.backInfo || isEmpty(state.backInfo)) return undefined
    return state.backInfo
  },

}

// actions
const actions = {
  setConfig({ state, commit }, config) {
    commit('setConfig', config)
  },
  setBackInfo({ state, commit }, backInfo) {
    commit('setBackInfo', backInfo)
  },
  initConfig({commit}) {
    commit('initConfig')
  }
}

// mutations
const mutations = {
  setConfig(state, config) {
    state.config = Object.assign(state.config, config);
  },
  setBackInfo(state, backInfo) {

    state.backInfo = Object.assign(state.backInfo, backInfo)
    sessionStorage.set('goldBack_config', state.backInfo)
  },
  initConfig(state) {
    state.backInfo = {
      cardId:'',
      cardCode:'',
      type:'',
      weight:'',
      barPrice:'',
      sandPrice:''
    }
    state.config = {
      type: 0, //0金条 1金砂
      id:'',
      barPrice:'',
      sandPrice:''
    }
    try{
      sessionStorage.set('goldBack_config', state.backInfo)
    } catch(e) {
      console.error(`sessionStorage保存goldBack_config失败`)
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
