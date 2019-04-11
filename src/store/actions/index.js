import {getParam} from 'util/common'
import {toast} from 'util/toast'

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
      if (!Object.keys(getParam()).length) return toast('token不存在')
      let token = getParam().token
      await dispatch('setToken', token)
    }
  },
  async checkUrlToken({dispatch, commit}) {
    if (Object.keys(getParam()).length && getParam().token) {
      return commit('setToken', getParam().token)
    } else {
      await dispatch('checkToken')
    }
  }
}
