import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/tab/Home/index'

import configStore from './store'

import './app.scss'
import './custom-variables.scss'
import './assets/fonts/iconfont.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/gold/home/index',
      'pages/gold/protocol/index',
      'pages/gold/protocol/back',
      'pages/gold/buyBack/index',
      'pages/gold/record/index',
      'pages/tab/User/index',
      'pages/help/index',
      'pages/order/list/index',
      'pages/travel/order/detail/index',
      'pages/travel/order/list/index',
      'pages/tab/Home/index',
      'pages/phone/home/index',
      'pages/phone/record/index',
      'pages/vip/home/index',
      'pages/vip/cardType/index',
      'pages/vip/record/index',
      'pages/goods/list/index',
      'pages/goods/detail/index',
      'pages/travel/home/index',
      'pages/travel/preview/index',
      'pages/travel/detail/index',
      'pages/oil/home/index',
      'pages/oil/apply/index',
      'pages/oil/recovery/index',
      'pages/oil/order/index',
      'pages/life/home/index',
      'pages/life/order/index',
      'pages/life/payment/index',
      'pages/life/account/index',
      'pages/life/unit/index',
      'pages/life/city/index',
      'pages/protocol/index',
      'pages/order/stream/index',
      'pages/order/detail/index',
      'pages/order/preview/index',
      'pages/success/index',
      'pages/Login/index',
      'pages/ForgetPwd/index',
      'pages/Register/index',
      'pages/setting/index',
      'pages/tab/Cart/index',
      'pages/tab/Classify/index',
      'pages/tab/ShoppingMall/index',
      'pages/address/detail/index',
      'pages/address/list/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#000',
      selectedColor: '#30ce84',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [
        { pagePath: 'pages/tab/Home/index', text: '首页', iconPath: 'assets/img/tab/home.png', selectedIconPath: 'assets/img/tab/home-actived.png' },
        { pagePath: 'pages/tab/ShoppingMall/index', text: '商城', iconPath: 'assets/img/tab/supermarket.png', selectedIconPath: 'assets/img/tab/supermarket-actived.png' },
        { pagePath: 'pages/tab/Classify/index', text: '分类', iconPath: 'assets/img/tab/classify.png', selectedIconPath: 'assets/img/tab/classify-actived.png' },
        { pagePath: 'pages/tab/Cart/index', text: '购物车', iconPath: 'assets/img/tab/cart.png', selectedIconPath: 'assets/img/tab/cart-actived.png' },
        { pagePath: 'pages/tab/User/index', text: '我的', iconPath: 'assets/img/tab/mine.png', selectedIconPath: 'assets/img/tab/mine-actived.png' },
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
