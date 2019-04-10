import fetch from './fetch'

// 配置接口
export const getInfo = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/info',
  method: 'POST',
  data
})

// 查询景区列表
export const getScenicList = (params) => fetch({
  url: 'ticket/getScenicSpotList',
  method: 'GET',
  params
})

// 查询订单列表
export const getOrderList = (params) => fetch({
  url: 'ticket/selectOrders',
  method: 'GET',
  params
})

// 查询订单详情
export const getOrderDetail = (params) => fetch({
  url: 'ticket/getOrderInfo',
  method: 'GET',
  params
})
