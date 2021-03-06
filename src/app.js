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
    subPackages: [
      {
        root: "app",
        pages: [
          "pages/fruit/home/index",
          "pages/fruit/buyBack/index",
          "pages/fruit/record/index",
          "pages/payment/index",
          "pages/payment/order/index",
          "pages/payment/success/index",
        ]
      }
    ],
    pages: [
      // "app/pages/fruit/buyBack/index",
      // "app/pages/fruit/home/index",
      // "app/pages/fruit/record/index",

      'pages/tab/Home/index',
      'pages/gold/home/index',
      'pages/success/index',
      'pages/Login/index',
      'pages/bindTel/index',
      'pages/order/preview/index',
      'pages/tab/Cart/index',
      'pages/order/list/index',
      'pages/cardCharge/index',
      'pages/link/index',
      'pages/history/index',
      'pages/gold/protocol/index',
      'pages/gold/protocol/back',
      'pages/gold/buyBack/index',
      'pages/gold/record/index',
      'pages/tab/User/index',
      'pages/web/index',
      'pages/travel/order/detail/index',
      'pages/travel/order/list/index',
      'pages/phone/home/index',
      'pages/phone/record/index',
      'pages/vip/home/index',
      'pages/vip/urlView/index',
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
      'pages/ForgetPwd/index',
      'pages/Register/index',
      'pages/setting/index',
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
      custom: true,
      color: '#000',
      selectedColor: '#30ce84',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [
        { pagePath: 'pages/tab/Home/index', text: '首页' },
        { pagePath: 'pages/tab/ShoppingMall/index', text: '商城' },
        { pagePath: 'pages/tab/Classify/index', text: '分类' },
        { pagePath: 'pages/tab/Cart/index', text: '购物车' },
        { pagePath: 'pages/tab/User/index', text: '我的' },
      ]
    },
    usingComponents: {}
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
