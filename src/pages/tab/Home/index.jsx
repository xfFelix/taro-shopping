import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtNoticebar, AtIcon, AtButton } from 'taro-ui'
import {connect} from '@tarojs/redux'
import Goods from "@/components/goods";
import { getHomeHot, getHomeNew } from '@/actions/home'
import './index.scss'
import {getInfoSync} from "@/actions/user";
import {dialog} from "@/util/index";

@connect(({home, user}) => ({
  list: home.list,
  hotList: home.hotList,
  newList: home.newList,
  info: user.info,
  token: user.token
}), (dispatch) => ({
  getHomeHot: () => dispatch(getHomeHot()),
  getHomeNew: () => dispatch(getHomeNew()),
  getInfo: (token) => dispatch(getInfoSync(token))
}))
class Home extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
  }

  onPullDownRefresh() {
    Taro.stopPullDownRefresh()
    if (this.props.token) this.props.getInfo(this.props.token)
    this.props.getHomeHot()
  }

  componentWillMount () {
    Taro.showShareMenu()
  }

  componentDidShow () {
    this.setSelect()
    this.props.getInfo(this.props.token)
    // 获取热门爆款
    this.props.getHomeHot()
    // 获取走马灯 - 消息
    this.props.getHomeNew()
  }

  setSelect () {
    if (typeof this.$scope.getTabBar === 'function' &&
      this.$scope.getTabBar()) {
      this.$scope.getTabBar().$component.setState({
        select: '0'
      })
    }
  }

  goApplication = (path) => {
    if (path) {
      if (/\/pages\/tab\/ShoppingMall\/index/.test(path)) {
        Taro.switchTab({url: '/pages/tab/ShoppingMall/index'})
      } else {
        if (this.props.token) {
          Taro.navigateTo({url: path})
        } else {
          Taro.showModal({title: '提示', content: '请先登录', success: res => {
            if (res.confirm) {
              Taro.redirectTo({url: '/pages/Login/index'})
            }
          }})
        }
      }
    }
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
    const { list, hotList, newList, token, info } = this.props
    return (
      <View className={'home-wrapper'}>
        {/*<Button openType={"getUserInfo"} onGetUserInfo={(e) => this.getUserInfo(e)}>获取用户信息</Button>*/}
        <View className={'home'}>
          <Image src={'https://tmall.cocogc.cn/static/images/weapp/home_bg.png'} className={'index-bg'} mode={'widthFix'}></Image>
          <View className={'notice-bar'}>
            <View className={'icon-listen'}>
              <AtIcon value='volume-plus' size='18' color='#fff'></AtIcon>
            </View>
            {/* <View className={'notice-view'}><Text className={'notice-text'}>积分公告:</Text></View> */}
            <View className={'notice'}>
              <AtNoticebar marquee className={'home-notice-bar'}>
                {
                  newList.map((item, index) => {
                    return (
                      <Text key={index} style={{marginRight: '100px'}}>{item.noticeTitle}</Text>
                    )
                  })
                }
              </AtNoticebar>
            </View>
            <View className={'icon-listen'}>
              <AtIcon value='chevron-right' size='17' color='#fff'></AtIcon>
            </View>
          </View>
          <View className={token ? 'userinfo' : 'login'}>
            <View>
              {
                token ?
                  <Text className={'font name'}>{info.score}</Text> :
                  <Text className={'font name'} onClick={()=> Taro.redirectTo({url: '/pages/Login/index'})}>登录</Text>
              }
            </View>
            {token && <View><Text className={'font'}>积分余额</Text></View>}
          </View>
        </View>
        <View className={'home-content'}>
          <View className='home-list-wrapper'>
            {
              list.map((item) => {
                return (
                  !(info.showPhone == 1 && item.id == 2) && <View key={item.id} className='home-list-column' onClick={() => this.goApplication(item.path)}>
                    <Image src={item.imgPath} className='home-list-column-img'></Image>
                    <Text className='home-list-column-text'>{item.name}</Text>
                  </View>
                )
              })
            }
          </View>
          <View className='home-swiper-wrapper'>
            <Image src={'https://tmall.cocogc.cn/static/images/scan.png'} onClick={() => this.goPaymentByScan()}></Image>
            {/*<AtButton type={"primary"} circle onClick={() => this.goPaymentByScan()}>扫码支付</AtButton>*/}
          </View>
        </View>
        <View className='home-hot-wrapper'>
          <View className='home-hot-title'>热门爆款</View>
          <View className='home-hot-container'>
            {
              hotList.map((item, index) => {
                return (
                  <View key={index} className={'home-hot-item'}>
                    <Goods item={item}></Goods>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

export default Home


