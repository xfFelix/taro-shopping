import fetch from '@/api/fetch'
import {MALL_URL} from "@/api/config"

// 获取回收详情价格
export const getOrderInfo = (data) => fetch({
  url: `${MALL_URL}/api/ticket/oilcard/getOrderInfo`,
  method: 'post',
  data
})

// 根据价格获取售价之类
export const getPrice = (data) => fetch({
  url: `${MALL_URL}/api/ticket/oilcard/priceQuery`,
  method: 'get',
  data
})

// 提交回收申请
export const submitApply = (data) => fetch({
  url: `${MALL_URL}/api/ticket/oilcard/buyBackCommitOrder`,
  method: 'post',
  data
})
