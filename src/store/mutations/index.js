import * as type from 'store/mutations/type'
import { localStorage } from 'common/storage'
export default {
  // 设置用户信息和是否登录
  [type.SET_USER_INFO] (state, userinfo) {
    state.user_info = userinfo || {}
    if (userinfo === null) {
      localStorage.remove('user_info')
    } else {
      localStorage.set('user_info', userinfo)
    }
  },
  // 配置信息
  [type.SET_CONFIG] (state, data) {
    state.get_config = data || {}
    if (data === null) {
      localStorage.remove('get_config')
    } else {
      localStorage.set('get_config', data)
    }
  }
}
