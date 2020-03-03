import { GET_HOME_SWIPER, GET_HOME_HOT, GET_HOME_NEW } from '@/constants/tab'

const INITIAL_STATE = {
  list: [
    { imgPath: 'https://tmall.cocogc.cn/static/images/weapp/gold.png', name: '黄金兑换', path: '/pages/gold/home/index', id: 1 },
    { imgPath: 'https://mall.cocotc.cn/static/images/home/recharge.png', name: '话费充值', path: '/pages/phone/home/index', id: 2 },
    { imgPath: 'https://tmall.cocogc.cn/static/images/weapp/oil.png', name: '加油卡充值', path: '/pages/oil/home/index', id: 3 },
    { imgPath: 'https://tmall.cocogc.cn/static/images/weapp/jd.png', name: '小椰商城', path: '/pages/tab/ShoppingMall/index', id: 4 },
    { imgPath: 'https://tmall.cocogc.cn/static/images/weapp/life.png', name: '生活缴费', path: '/pages/life/home/index', id: 5 },
    { imgPath: 'https://tmall.cocogc.cn/static/images/weapp/vip.png', name: '会员卡券', path: '/pages/vip/home/index', id: 6 },
    // { imgPath: 'https://mall.cocotc.cn/static/images/home/travel.png', name: '海南旅游', path: '/pages/travel/home/index', id: 7 },
    // { imgPath: 'https://mall.cocotc.cn/static/images/home/food.png', name: '海南特产', path: '/pages/goods/list/index?id=18591', id: 8 },
    { imgPath: 'https://mall.cocotc.cn/static/images/home/air-disabled.png', name: '机票酒店', path: '', id: 9 },
    { imgPath: 'https://mall.cocotc.cn/static/images/home/zdf-disabled.png', name: '周大福金饰', path: '', id: 10 },
    { imgPath: 'https://mall.cocotc.cn/static/images/home/game-disabled.png', name: '游戏周边', path: '', id: 11 },
    { imgPath: 'https://tmall.cocogc.cn/static/images/weapp/wangyi.png', name: '网易严选', path: '', id: 12 }
  ],
  swiperList: [],
  hotList: [],
  newList: []
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_HOME_SWIPER:
      return {
        ...state,
        swiperList: action.swiperList
      }
    case GET_HOME_HOT:
      return {
        ...state,
        hotList: action.hotList
      }
    case GET_HOME_NEW:
      return {
        ...state,
        newList: action.newList
      }
    default:
      return state
  }
}
