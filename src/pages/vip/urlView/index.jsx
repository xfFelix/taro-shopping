import Taro, {Component} from '@tarojs/taro'
import {WebView, View} from '@tarojs/components'
import {connect} from "@tarojs/redux"

@connect(({vip}) => ({
  exchangeUrl: vip.exchangeUrl,
}))


export default class Web extends Component {
  render () {
    return (
      <WebView src={this.props.exchangeUrl}/>
    )
  }
}
