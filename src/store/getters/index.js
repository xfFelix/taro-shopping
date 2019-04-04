
import * as type from 'store/getters/type'

export default {
  // 获取用户信息
  [type.GET_USER_INFO]: state => {
    return state.user_info
  },
  // 获取配置信息
  [type.GET_CONFIG]: state => {
    return state.get_config
  }
}
