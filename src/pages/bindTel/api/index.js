import fetch from '@/api/fetch'
import { INFO_URL } from '@/api/config'

// 微信授权注册、登录
export const bindTelByWechat = (data) => fetch({
  url: `${INFO_URL}/user/wechatRegister`,
  method: 'post',
  data
})
