import { localStorage } from 'common/storage'
import { isObject } from 'common/js/app'
export default {
  // 用户信息和是否登录
  user_info: localStorage.get('user_info'),
  get_config: localStorage.get('get_config'),
  // 平台区分 1:ios, 2:android, 3:h5; 默认为h5
  platform: isObject(localStorage.get('platform')) ? localStorage.get('platform') : '3'
}
