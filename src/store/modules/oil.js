import {isEmpty} from 'util/common';

const state = {
  typeList: [
    {label: '中石化', value: 1},
    {label: '中石油', value: 2},
  ],
  config: {
    cardNum: undefined,
    faceValue: undefined,
    type: 1,
    token: undefined,
    code: undefined
  }
}

// getters
const getters = {
  getTypeList: state => {
    if (!state.typeList || isEmpty(state.typeList)) return undefined
    return state.typeList
  },
  getConfig (state) {
    if (!state.config || isEmpty(state.config)) return undefined
    return state.config
  }
}

// actions
const actions = {
  setTypeList ({state, commit}, typeList) {
    commit('setTypeList', typeList)
  },
  setConfig({state, commit, rootGetters }, config) {
    if (!state.config.token) {
      config.token = rootGetters.getToken
    }
    commit('setConfig', config)
  },
  initConfig({state,commit}) {
    commit('initConfig')
  }
}

// mutations
const mutations = {
  setUser(state, typeList) {
    if (!typeList || isEmpty(typeList)) {
      state.typeList = undefined
    } else {
      state.typeList = typeList
    }
  },
  setConfig(state, config) {
    if (!config || isEmpty(config)) {
      state.config = undefined
    } else {
      state.config = Object.assign(state.config, config)
    }
  },
  initConfig(state) {
    state.config = {
      cardNum: undefined,
      faceValue: undefined,
      type: 1,
      token: undefined,
      code: undefined
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
