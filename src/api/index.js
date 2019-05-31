import fetch from './fetch'

// 配置接口
export const getInfo = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/info',
  method: 'POST',
  data
})

// 查询景区列表
export const getScenicList = (params) => fetch({
  url: '/getScenicSpotList',
  method: 'GET',
  params
})

//门票列表
export const getTicketList = (params) => fetch({
  url: '/getTicketList',
  method: 'GET',
  params
})
// 查询订单列表
export const getOrderList = (data) => fetch({
  url: '/selectOrders',
  method: 'POST',
  data
})

//景区详情
export const getScenicSpotInfo = (params) => fetch({
  url: '/getScenicSpotInfo',
  method: 'GET',
  params
})
// 查询订单详情
export const getOrderDetail = (data) => fetch({
  url: '/getOrderInfo',
  method: 'POST',
  data
})

//搜索关键字
export const search = (params) => fetch({
  url: '/search',
  method: 'GET',
  params
})

// 查询费用详情
export const getFeeInfo = (params) => fetch({
  url: '/getOrderPreview',
  method: 'GET',
  params
})

// 查询日期列表
export const getDateList = (params) => fetch({
  url: '/getRealTimeStorage',
  method: 'GET',
  params
})

// 查询门票详情
export const getTicketInfo = (params) => fetch({
  url: '/getTicketInfo',
  method: 'GET',
  params
})

// 提交订单
export const submitOrder = (data) => fetch({
  url: '/pFTOrderSubmit',
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

// 绑定手机号
export const setMobile = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/bindMobile',
  method: 'POST',
  data
})

export const getCostInfo = (data) => fetch({
  url: '/oilcard/getCostInfo',
  method: 'POST',
  data
})

export const submitOilOrder = (data) => fetch({
  url: '/oilcard/submit',
  method: 'POST',
  data
})

// 订单列表
export const oilOrderList = (data) => fetch({
  url: '/oilcard/getOrderList',
  method: 'POST',
  data
})

//回收价格
export const priceQuery = (params) => fetch({
  url: '/oilcard/priceQuery',
  method: 'GET',
  params
})


//详情信息
export const getOilOrderDetail= (data) => fetch({
  url: '/oilcard/getOrderInfo',
  method: 'POST',
  data
})

export const getRecoveryList = (data) => fetch({
  url: 'oilcard/getBuyBackList',
  method: 'POST',
  data
})

// 查看密码接口
export const getPayPassword = (data) => fetch({
  url: 'oilcard/getCardPwd',
  method: 'POST',
  data
})

//回收成功
export const buyBackCommitOrder= (data) => fetch({
  url: '/oilcard/buyBackCommitOrder',
  method: 'POST',
  data
})

//会员卡券类型
export const getVipList= (params) => fetch({
   url: '/mbscard/getProductList',
  method: 'GET',
  params
})

//会员卡券价格详情
export const vipCostInfo= (data) => fetch({
  url: '/mbscard/getCostInfo',
  method: 'POST',
  data
})

//会员卡券提交订单
export const vipSubmit= (data) => fetch({
  url: '/mbscard/submit',
  method: 'POST',
  data
})


//会员卡券订单列表
export const vipOrderList= (data) => fetch({
  url: '/mbscard/getOrderList',
  method: 'POST',
  data
})


export const checkPayPwd = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/editPayPwd',
  method: 'POST',
  data
})



