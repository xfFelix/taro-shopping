import {isEmpty} from 'util/common';

const state = {
  typeList: [
    {label: '中石化', value: 1},
    {label: '中石油', value: 2},
  ],
  config: {
    cardNum: undefined,
    faceValue: 100,
    type: 1,
    token: undefined,
    code: '',
    rechargeType: 1 // 充值方式： 1 直充 2 加油卡充值
  },
  statusList: [
    { label: '已售出', value: 0 },
    { label: '成功', value: 1 },
    { label: '失败', value: 2 },
    { label: '回购中', value: 3 }
  ]
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
  },
  getStatusList: state => {
    return state.statusList
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
  setTypeList(state, typeList) {
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
      faceValue: 100,
      type: 1,
      token: undefined,
      code: '',
      rechargeType: 1 // 充值方式： 1 直充 2 加油卡充值
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
