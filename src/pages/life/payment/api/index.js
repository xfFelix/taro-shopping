import fetch from '@/api/fetch'
import {INFO_URL} from "@/api/config"

// 轮询查询结果
export const getBill = (data) => fetch({
  url: `${INFO_URL}/live/bill`,
  method: 'post',
  data
})

// 获取 价格
export const getTax = (data) => fetch({
  url: `${INFO_URL}/live/tax`,
  method: 'post',
  data
})

// 支付
export const payment = (data) => fetch({
  url: `${INFO_URL}/live/pay`,
  method: 'post',
  data
})
