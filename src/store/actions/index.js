import {getParam} from 'util/common'

export default {
  // 设置用户信息和登录
  setUserinfo ({ commit }, userinfo) {
    commit('setUserinfo', userinfo)
  },
  // 设置配置信息
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  async checkToken({state, dispatch}) {
    if (state.token) {
      return state.token
    } else {
      if (!Object.keys(getParam()).length) {
        return undefined
      }
      let token = getParam().token
      if (token) await dispatch('setToken', token)
      return token
    }
  },
  async checkUrlToken({dispatch, commit}) {
    if (Object.keys(getParam()).length && getParam().token) {
      if (getParam().token === 'null' || getParam().token === 'undefined') {
        return undefined
      }
      commit('setToken', getParam().token)
      return getParam().token
    } else {
      let token = await dispatch('checkToken')
      return token
    }
  },
}
