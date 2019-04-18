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
export const getOrderList = (data) => fetch({
  url: 'ticket/selectOrders',
  method: 'POST',
  data
})

//景区详情
export const getScenicSpotInfo = (params) => fetch({
  url: 'ticket/getScenicSpotInfo',
  method: 'GET',
  params
})
// 查询订单详情
export const getOrderDetail = (data) => fetch({
  url: 'ticket/getOrderInfo',
  method: 'POST',
  data
})

//搜索关键字
export const search = (params) => fetch({
  url: 'ticket/search',
  method: 'GET',
  params
})

// 查询费用详情
export const getFeeInfo = (params) => fetch({
  url: 'ticket/getOrderPreview',
  method: 'GET',
  params
})

// 查询日期列表
export const getDateList = (params) => fetch({
  url: 'ticket/getRealTimeStorage',
  method: 'GET',
  params
})

// 查询门票详情
export const getTicketInfo = (params) => fetch({
  url: 'ticket/getTicketInfo',
  method: 'GET',
  params
})

// 提交订单
export const submitOrder = (data) => fetch({
  url: 'ticket/pFTOrderSubmit',
  method: 'POST',
  data
})

// 首页轮播图
export const homeBanner = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'news/newsList',
  method: 'POST',
  data
})

// 发送验证码
export const sendSmsCode = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/sms',
  method: 'POST',
  data
})

export const getCostInfo = (data) => fetch({
  url: 'oilcard/getCostInfo',
  method: 'POST',
  data
})

export const submitOilOrder = (data) => fetch({
  url: 'oilcard/submit',
  method: 'POST',
  data
})

// 订单列表
export const oilOrderList = (data) => fetch({
  url: 'oilcard/getOrderList',
  method: 'POST',
  data
})
