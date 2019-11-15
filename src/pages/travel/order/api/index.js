import fetch from '@/api/fetch'
import {MALL_URL} from "@/api/config"

// 获取兑换列表
export const getOrderList = (data) => fetch({
  url: `${MALL_URL}/api/ticket/selectOrders`,
  method: 'post',
  data
})

// 获取详情
export const getOrderDetail = (data) => fetch({
  url: `${MALL_URL}/api/ticket/getOrderInfo`,
  method: 'post',
  data
})
