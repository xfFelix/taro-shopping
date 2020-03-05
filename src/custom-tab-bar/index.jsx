import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

const LIST = [
  { id: '0', name: 'home', iconUrl: 'home', selectIconUrl: 'home-actived', title: '首页', path: '/pages/tab/Home/index' },
  { id: '1', name: 'calssify', iconUrl: 'classify', selectIconUrl: 'classify-actived', title: '分类', path: '/pages/tab/Classify/index' },
  { id: '2', name: 'scan', iconUrl: 'scan', selectIconUrl: 'scan', title: '扫一扫' },
  { id: '3', name: 'cart', iconUrl: 'cart', selectIconUrl: 'cart-actived', title: '购物车', path: '/pages/tab/Cart/index' },
  { id: '4', name: 'mine', iconUrl: 'mine', selectIconUrl: 'mine-actived', title: '我的', path: '/pages/tab/User/index' },
]
@connect(({user, goods}) => ({
  token: user.token,
  num: goods.num
}))
class CustomTabBar extends Component {

  state = {
    select: '0'
  }

  _switchTab = (item) => {
    if (item.id !== '2') {
      Taro.switchTab({url: item.path})
    } else {
      this.goPaymentByScan()
    }
    this.setState({select: item.id})
  }

  goPaymentByScan = () => {
    const {token} = this.props
    if (!token) return Taro.showModal({title: '提示', content: '请先登录', success: res => {
      if (res.confirm) {
        Taro.redirectTo({url: '/pages/Login/index'})
      }
    }})
    Taro.scanCode({success(res) {
        let result = res.result
        if (result.indexOf('cocotc') >= 0) {
          let arr = result.split(":")
          let code = arr[1]
          let company = arr[2]
          Taro.navigateTo({url: `/app/pages/payment/index?id=${code}&company=${company}`})
        } else {
          dialog.toast({title: '此二维码无效'})
        }
      }
    })
  }

  render() {
    const { select } = this.state
    const { num } = this.props
    return (
      <View className={styles.wrapper}>
        {
          LIST.map(item => {
            return (
              <View className={styles.item} key={item.id + ''} onClick={() => this._switchTab(item)}>
                <Image src={`../assets/img/tab/${(select === item.id && item.id !== '2') ? item.selectIconUrl: item.iconUrl}.png`} className={item.id === '2'?styles.scanIcon: styles.icon}></Image>
                <View className={item.id === '2'? styles.scanTitle: (select === item.id ? styles.selectTitle: styles.title)}>{item.title}</View>
                { (item.id === '3' && num !== 0) && <View className={styles.num}>{num > 99 ? '99+' : num}</View> }
              </View>
            )
          })
        }
      </View>
    )
  }

}

export default CustomTabBar
