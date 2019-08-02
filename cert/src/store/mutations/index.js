import { localStorage } from 'common/storage'
import {isEmpty} from 'util/common';
export default {
  // 设置用户信息和是否登录
  setUserinfo (state, userinfo) {
    state.userinfo = userinfo || {}
    try{
      if (isEmpty(userinfo) || !userinfo) {
        localStorage.remove('userinfo')
      } else {
        localStorage.set('userinfo', userinfo)
      }
    } catch(e) {
      console.error(e)
    }
  },
  // 配置信息
  setToken (state, data) {
    state.token = data || null
    try {
      if (data === null || data === undefined) {
        localStorage.remove('token')
      } else {
        localStorage.set('token', data)
      }
    } catch(e) {
      console.error(e)
    }
  },
  setShowSetPassword (state, value) {
    state.showSetPassword = value
  },
  setShowSetMobile(state, value) {
    state.showSetMoblie = value
  },
}
