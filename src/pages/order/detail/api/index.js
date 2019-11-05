import fetch from '@/api/fetch'

// 获取订单详情
export const getOrders = (data) => fetch({
  url: `/api/findOrder`,
  method: 'post',
  data
})
