import fetch from './fetch'
import { INFO_URL, SEARCH_URL, SHOP_URL } from './config'
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
  header: Taro.getStorageSync('cookie')
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

export const register = (data) => fetch({
  url: `${INFO_URL}/user/register`,
  method: 'post',
  data
})
