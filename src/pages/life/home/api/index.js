import fetch from '@/api/fetch'
import {MALL_URL} from "@/api/config"

// 获取服务费， 总额
export const getCostInfo = (data) => fetch({
  url: `${MALL_URL}/api/ticket/oilcard/getCostInfo`,
  method: 'post',
  data
})

// 提交
export const submit = (data) => fetch({
  url: `${MALL_URL}/api/ticket/oilcard/submit`,
  method: 'post',
  data
})

// 提交
export const getOrderInfo = (data) => fetch({
  url: `${MALL_URL}/api/ticket/oilcard/getOrderInfo`,
  method: 'post',
  data
})
