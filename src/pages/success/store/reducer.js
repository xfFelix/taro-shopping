import { constant } from './index'

const INITIAL_STATE = {
  list: [
    { imgPath: 'https://mall.cocotc.cn/static/images/home/gold.png', name: '黄金兑换', path: '', id: 1 },
    { imgPath: 'https://mall.cocotc.cn/static/images/home/recharge.png', name: '话费充值', path: '', id: 2 },
    { imgPath: 'https://mall.cocotc.cn/static/images/home/oil.png', name: '加油卡充值', path: '', id: 3 },
    { imgPath: 'https://mall.cocotc.cn/static/images/home/jd.png', name: '小椰商城', path: '', id: 4 }
  ],
  title: '提交成功',
  price: 0,
  path: {
    home: '/pages/tab/Home/index',
    order: '/pages/order/list/index'
  }
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.SET_PARAMS:
      return {
        ...state,
        title: action.title,
        price: action.price,
        path: action.path
      }
    default:
      return state
  }
}
