import fetch from '@/api/fetch'
import { INFO_URL } from '@/api/config'

//获取黄金价格
export const goldPrice = (data) => fetch({
  url: `${INFO_URL}/user/prices`,
  method: 'post',
  data
})

//计算黄金价格
export const goldTax = (data) => fetch({
  url: `${INFO_URL}/user/goldTax`,
  method: 'post',
  data
})

//黄金兑换接口
export const goldBuy = (data) => fetch({
  url: `${INFO_URL}/user/gold`,
  method: 'post',
  data
})

//黄金购买记录
export const goldLog = (data) => fetch({
  url: `${INFO_URL}/user/golds`,
  // url:'http://lc-OnsG2j7w.cn-n1.lcfile.com/d617c90238bff1f9bc08.json',
  method: 'post',
  data
})

//黄金兑换详情
export const goldInfo = (data) => fetch({
  url: `${INFO_URL}/user/goldInfo`,
  method: 'post',
  data
})

//黄金回购
export const goldbuyback = (data) => fetch({
  url: `${INFO_URL}/user/goldbuyback`,
  method: 'post',
  data
})

//黄金查看卡密
export const goldCode = (data) => fetch({
  url: `${INFO_URL}/user/goldCode`,
  method: 'post',
  data
})

//查看回购价格
export const buybackMoney = (data) => fetch({
  url: `${INFO_URL}/user/buybackMoney`,
  method: 'POST',
  data
})
