import fetch from './fetch'
import { INFO_URL, SEARCH_URL } from './config'
import Taro from '@tarojs/taro'

// 登录
export const login = (data) => fetch({
  url: `${INFO_URL}/user/login`,
  method: 'post',
  data
})

// 发送短信
export const sms = (data) => fetch({
  url: INFO_URL + '/user/sms',
  method: 'POST',
  data,
  header: {'Cookie': Taro.getStorageSync('cookie')}
})

// 微信授权注册、登录
export const loginByWechat = (data) => fetch({
  url: `${INFO_URL}/user/wechatLogin`,
  method: 'post',
  data
})

export const captcha = () => fetch({
  url:INFO_URL+ '/user/captcha64?' + new Date(),
})

// 个人信息
export const getInfo = (data) => fetch({
  url: INFO_URL + '/user/info',
  method: 'POST',
  data
})

// 轮播图，热门爆款
export const getHomeSwiper = (data) => fetch({
  url: '/api/goodsGroups',
  method: 'post',
  data
})

// 走马灯
export const getNewList = (data) => fetch({
  url: INFO_URL + '/news/newsList',
  method: 'post',
  data
})

// 积分筛选商品列表
export const getGoodsByIntegral = (data) => fetch({
  url: SEARCH_URL + '/query/price',
  data
})

// 分类 一级目录
export const getClassifyDirByFirst = (data) => fetch({
  url: `/api/categories`,
  method: 'post',
  data
})

// 注册
export const register = (data) => fetch({
  url: `${INFO_URL}/user/register`,
  method: 'post',
  data
})

// 忘记密码
export const forget = (data) => fetch({
  url: `${INFO_URL}/user/forget`,
  method: 'post',
  data
})

// 积分充值
export const charge = (data) => fetch({
  url: `${INFO_URL}/user/charge`,
  method: 'post',
  data,
  header: {'Cookie': Taro.getStorageSync('cookie')}
})
