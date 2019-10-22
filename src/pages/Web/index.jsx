import Taro, {Component} from '@tarojs/taro'

export default class Web extends Component {
  render () {
    return (
      <web-view src='https://tmall.cocogc.cn'></web-view>
    )
  }
}
