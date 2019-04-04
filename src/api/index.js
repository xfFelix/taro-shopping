import fetch from './fetch'
import store from '@store'

// const v_config = store.state.get_config;

// 配置接口
export const get_config = (params) => fetch({
  url: '/api/get_config',
  method: 'GET',
  params
})

// 注册-验证码-接口
export const sendCode = (data) => fetch({
  url: '/api/sendverify',
  method: 'POST',
  data
})

// 注册-确认-接口
export const register = (data) => fetch({
  url: '/api/register',
  method: 'POST',
  data
})
