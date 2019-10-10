import fetch from './fetch'

// 配置接口
export const getInfo = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/info',
  // url:'http://lc-OnsG2j7w.cn-n1.lcfile.com/cc5c24b8de8ac46fa85f.json', //赢球帝
  // url:'http://lc-OnsG2j7w.cn-n1.lcfile.com/53978791842af681d07b.json', //30000
  // url:'http://lc-OnsG2j7w.cn-n1.lcfile.com/1dc605696e190e530bb6.json',//未实名
  // url:'http://lc-OnsG2j7w.cn-n1.lcfile.com/7ff01ba4aefcec48b369.json', //积分只有10
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

// 发送验证码 短信
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


//兑换金币
export const getCostCoin =(data)=>fetch({
  url:"goldcoin/getCostInfo",
  method:'POST',
  data
})
//提交订单
export const sumbmitCoin =(data)=>fetch({
  url:"goldcoin/submit",
  method:'POST',
  data
})
//金币兑换列表
export const coinList =(data)=>fetch({
  url:"/goldcoin/getOrderList",
  method:'POST',
  data
})

/**
 * 根据城市与生活缴费类型获取公司
 */
export const getCompaniesByCity = (params) => fetch({
  url: `${process.env.VUE_APP_INFO_URl}/live/companies`,
  method: 'GET',
  params
})

/**
 * 获取城市列表
 */
export const getCityList = (params) => fetch({
  url: `${process.env.VUE_APP_INFO_URl}/live/cities`,
  method: 'GET',
  params
})
/**
 * 生活缴费下单
 * @param {*} data
 */
export const paymentByLife = (data) => fetch({
  url: `${process.env.VUE_APP_INFO_URl}/live/pay`,
  method: 'POST',
  data
})
/**
 * 生活缴费 兑换记录
 * @param {*} data
 */
export const getLogsByLife = (data) => fetch({
  url: `${process.env.VUE_APP_INFO_URl}/live/logs`,
  method: 'POST',
  data
})
/**
 * 首页 用户列表
 * @param {*} data
 */
export const getGroupByLife = data => fetch({
  url: `${process.env.VUE_APP_INFO_URl}/live/grps`,
  method: 'POST',
  data
})
/**
 * 首页 用户列表
 * @param {*} data
 */
export const getArrearsByLife = data => fetch({
  url: `${process.env.VUE_APP_INFO_URl}/live/bill`,
  method: 'POST',
  data
})
/**
 * 根据用户编号获取用户信息 姓名。。。
 * @param {*} data
 */
export const getUserByNumber = data => fetch({
  url: `${process.env.VUE_APP_INFO_URl}/live/info`,
  method: 'POST',
  data
})
/**
 * 获取售价 合计。。。
 * @param {*} data
 */
export const getPriceByLife = data => fetch({
  url: `${process.env.VUE_APP_INFO_URl}/live/tax`,
  method: 'POST',
  data
})


/****************************  黄金 ******************************/
//获取黄金价格
export const goldPrice = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/prices',
  method: 'POST',
  data
})
//计算黄金价格
export const goldTax = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/goldTax',
  method: 'POST',
  data
})

//黄金兑换接口
export const goldBuy = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/gold',
  method: 'POST',
  data
})

//黄金购买记录
export const goldLog = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/golds',
  method: 'POST',
  data
})

//黄金兑换详情
export const goldInfo = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/goldInfo',
  method: 'POST',
  data
})

//黄金回购
export const goldbuyback = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/goldbuyback',
  method: 'POST',
  data
})

//黄金查看卡密
export const goldCode = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/goldCode',
  method: 'POST',
  data
})


/****************************  话费 ******************************/
//直充价格查询
export const directPrice = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'other/phonePrice',
  method: 'POST',
  data
})

//直充兑换接口
export const phoneCharge = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'other/phoneCharge',
  method: 'POST',
  data
})

//直充记录
export const phoneLogs = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/phoneLogs',
  method: 'POST',
  data
})

//充值卡价格查询
export const cardPrice = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'other/phoneCardPrice',
  method: 'POST',
  data
})

//话费充值税费计算
export const phoneTax = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/phoneTax',
  method: 'POST',
  data
})

/****************************  信用卡 ******************************/
// 信用卡列表 （状态为审核通过）
export const cards = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/cards',
  method: 'POST',
  data
})
// 信用卡列表（状态为审核通过和审核中的信用卡）
export const allcards = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/allcards',
  method: 'POST',
  data
})
// 信用卡校验
export const validCard = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'other/validCard',
  method: 'POST',
  data
})
// 添加信用卡
export const addcard = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/addvalidcard',
  method: 'POST',
  data
})
// 解绑信用卡
export const unbindCard = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/unbind',
  method: 'POST',
  data
})

// 信用卡还款提交
export const applyCard = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/apply',
  method: 'POST',
  data
})

// 信用卡还款税费计算
export const cardTax = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/cardTax',
  method: 'POST',
  data
})
// 信用卡还款记录
export const logsCard = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/logs',
  method: 'POST',
  data
})
// 信用卡信息
export const cardInfo = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/cardInfo',
  method: 'POST',
  data
})

/************************************* userInfo *************************************/
// 实名认证
export const cert = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + '/user/cert',
  method: 'POST',
  data
})
//实名认证短信
export const certsms = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + '/user/certsms',
  method: 'POST',
  data
})


// 用户绑定
export const bind = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + '/user/bind',
  method: 'POST',
  data
})


// 椰子分充值
export const charge = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + '/user/charge',
  method: 'POST',
  data
})

// 积分日志
export const integraLogs = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + '/user/slogs',
  method: 'POST',
  data
})

// 缴税记录
export const taxes = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/taxes',
  method: 'POST',
  data
})

/************************************* 传奇金币 *************************************/
// 传奇金币
export const chuanqiinfo = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'other/chuanqiinfo',
  method: 'POST',
  data
})
// 传奇金币税率
export const chuanqiTax = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'user/chuanqiTax',
  method: 'POST',
  data
})
// 兑换传奇金币
export const buyChuanQiCoin = (data) => fetch({
  url: process.env.VUE_APP_INFO_URl + 'other/buyChuanQiCoin',
  method: 'POST',
  data
})
// 获取列表
export const getChuanQiCoinList = (data) => fetch({
  url: process.env.VUE_APP_BASE_URL + '/goldcoin/getGoldCards',
  method: 'POST',
  data
})

