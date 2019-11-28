import Taro, {Component} from '@tarojs/taro'
import {WebView} from '@tarojs/components'
import {connect} from "@tarojs/redux";

@connect(({user}) => ({
  token: user.token
}))
export default class Web extends Component {

  config = {
    navigationBarTitleText: 'Web'
  }

  state = {
    url: ''
  }

  componentWillMount(): void {
    const { url } = this.$router.params
    let path = ''
    if (/api[.]cocotc[.]cn/.test(url)){
      const {token} = this.props
      path = url + '?token=' + token
    } else {
      path = url
    }
    this.setState({url: path})
  }

  render () {
    const { url } = this.state
    return (
      <WebView src={url}/>
    )
  }
}
