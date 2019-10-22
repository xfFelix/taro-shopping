import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { setCurrent } from '../../actions/tab'
import {getInfo} from '../../api'
import { AtTabBar } from 'taro-ui'
import Home from '../../pages/tab/Home'
import ShoppingMall from '../../pages/tab/ShoppingMall'
import Classify from '../../pages/tab/Classify'
import Cart from '../../pages/tab/Cart'
import User from '../../pages/tab/User'

import './index.scss'

@connect(({ tab }) => ({
  current: tab.current,
  tabList: tab.tabList
}), (dispatch) => ({
  setCurrent: (current) => dispatch(setCurrent(current))
}))
class TabBar extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  static options = {
    addGlobalClass: true
  }

  componentWillReceiveProps (nextProps) {
  }

  componentDidMount() {}

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  constructor() {
    super(...arguments)
  }

  render() {
    const { current, tabList } = this.props
    return (
      <View className='index'>
        <AtTabBar
          fixed
          tabList={tabList}
          fontSize={14}
          iconSize={22}
          onClick={this.handlerClick}
          current={current}
        />
      </View>
    )
  }

  handlerClick = (value) => {
    const { setCurrent, tabList, current } = this.props
    if (value !== current) {
      setCurrent(value)
      Taro.redirectTo({url: tabList[value].path})
    }
  }

  getInfo = async () => {
    const data = await getInfo({token: '7486d4c70d5545fc36c2367460edf298'})
    console.log(data)
  }
}

export default TabBar
