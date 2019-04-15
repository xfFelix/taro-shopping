import { localStorage } from 'common/storage'
export default {
  // 设置用户信息和是否登录
  setUserinfo (state, userinfo) {
    state.userinfo = userinfo || {}
    try{
      if (!Object.keys(userinfo).length) {
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
  }
}
