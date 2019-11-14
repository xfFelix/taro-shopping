
import fetch from '@/api/fetch'
import { MALL_URL } from '@/api/config'

//会员卡券类型
export const getVipList= (data) => fetch({
  url: `${MALL_URL}/api/ticket/mbscard/getProductList`,
  data
})

//会员卡券价格详情
export const vipCostInfo= (data) => fetch({
  url: `${MALL_URL}/api/ticket/mbscard/getCostInfo`,
  method: 'POST',
  data
})

//会员卡券提交订单
export const vipSubmit= (data) => fetch({
  url: `${MALL_URL}/api/ticket/mbscard/submit`,
  method: 'POST',
  data
})


//会员卡券订单列表
export const vipOrderList= (data) => fetch({
  url: `${MALL_URL}/api/ticket/mbscard/getOrderList`,
  method: 'POST',
  data
})
