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

//门票列表
export const getTicketList = (params) => fetch({
  url: 'ticket/getTicketList',
  method: 'GET',
  params
})
// 查询订单列表
export const getOrderList = (params) => fetch({
  url: 'ticket/selectOrders',
  method: 'GET',
  params
})

//景区详情
export const getScenicSpotInfo = (params) => fetch({
  url: 'ticket/getScenicSpotInfo',
    method: 'GET',
  params
})
// 查询订单详情
export const getOrderDetail = (params) => fetch({
  url: 'ticket/getOrderInfo',
  method: 'GET',
  params
})

//搜索关键字
export const search = (params) => fetch({
  url: 'ticket/search',
  method: 'GET',
  params
})
