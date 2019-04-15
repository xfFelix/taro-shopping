import { localStorage } from 'common/storage'
import { isObject } from 'common/js/app'

let defaultToken = ''
let defaultUser = ''
try{
  defaultToken = localStorage.get('token')
  defaultUser = localStorage.get('userinfo')
} catch(e) {
  console.error(e)
}

let defaultGoodsList = ''
try{
  if (localStorage.get('goodsList')) {
    defaultGoodsList = localStorage.get('goodsList')
  }
} catch(e) {
  console.error(e)
}


export default {
  // 用户信息和是否登录
  token: defaultToken,
  userinfo: defaultUser,
  // 平台区分 1:ios, 2:android, 3:h5; 默认为h5
  platform: isObject(localStorage.get('platform')) ? localStorage.get('platform') : '3',
  goodsList: defaultGoodsList
}
