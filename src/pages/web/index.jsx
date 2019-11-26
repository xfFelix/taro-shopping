import Taro, {Component} from '@tarojs/taro'
import {WebView} from '@tarojs/components'

export default class Web extends Component {

  config = {
    navigationBarTitleText: 'Web'
  }

  state = {
    url: ''
  }

  componentWillMount(): void {
    const { url } = this.$router.params
    this.setState({url})
  }

  render () {
    const { url } = this.state
    return (
      <WebView src={url}/>
    )
  }
}
