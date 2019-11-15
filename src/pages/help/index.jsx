import Taro, {Component} from '@tarojs/taro'
import {WebView} from '@tarojs/components'

export default class Web extends Component {
  render () {
    return (
      <WebView src='https://mp.weixin.qq.com/s/YjTWs8Ep1lpIYeSXJTH03Q'/>
    )
  }
}
