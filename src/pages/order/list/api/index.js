import fetch from '@/api/fetch'

// 获取订单列表
export const getOrders = (data) => fetch({
  url: `/api/selectOrders`,
  method: 'post',
  data
})
