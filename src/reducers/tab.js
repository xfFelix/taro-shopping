import { SET_CURRENT } from '../constants/tab'

const INITIAL_STATE = {
  current: 0,
  tabList: [
    { title: '首页', iconType: 'home', path: '/pages/tab/Home/index' },
    { title: '商城', iconType: 'shopping-bag', path: '/pages/tab/ShoppingMall/index' },
    { title: '分类', iconType: 'list', path: '/pages/tab/Classify/index' },
    { title: '购物车', iconType: 'shopping-cart', text: '2', path: '/pages/tab/Cart/index' },
    { title: '我的', iconType: 'user', path: '/pages/tab/User/index' }
  ]
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT:
      return {
        ...state,
        current: action.current
      }
    default:
      return state
  }
}
