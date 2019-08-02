import {getParam, IsMobile} from 'util/common'

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
  /**
   * 设置密码
   * @param {*} param0
   * @param {*} value
   */
  setShowSetPassword ({commit}, value) {
    commit('setShowSetPassword', value)
  },
  /**
   * 设置手机号
   * @param {*} param0
   * @param {*} value
   */
  setShowSetMobile({commit}, value) {
    commit('setShowSetMobile', value)
  },
  /**
   * 验证是否需要设置密码或者手机号
   * @param {*} param0
   */
  checkPassword({state, dispatch}) {
    if (state.userinfo.payValidType === 1 && !state.userinfo.payPwd) {
      dispatch('setShowSetPassword', true)
      return false
    } else if (state.userinfo.payValidType !== 1 && !IsMobile(state.userinfo.userName)) {
      dispatch('setShowSetMobile', true)
      return false
    }
    return true
  }
}
