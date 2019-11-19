import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import {AtIcon} from 'taro-ui'
import styles from './index.module.scss'
import {connect} from "@tarojs/redux"
import { action } from './store'

@connect(({user, me}) => ({
  token: user.token,
  info: user.info,
  bannerList: me.bannerList,
}), dispatch => ({
  getBannerList: () => dispatch(action.getTopSwiperSync()),
}))
class User extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  constructor(props) {
    super(props)
  }

  componentDidShow() {
    if (!this.props.token) return Taro.redirectTo({url: '/pages/Login/index?redirect=/pages/tab/User/index'})
    this.props.getBannerList()
  }

  goOrders = (status) => {
    Taro.navigateTo({url: `/pages/order/list/index?status=${status}`})
  }

  goPath = (path) => {
    Taro.navigateTo({url: path})
  }

  render() {
    const orderList = [
      { id: '0', text: '全部订单', icon: 'https://tmall.cocogc.cn/static/images/personal/order-1.png', status: 0 },
      { id: '1', text: '未完成', icon: 'https://tmall.cocogc.cn/static/images/personal/order-2.png', status: 2 },
      { id: '2', text: '已完成', icon: 'https://tmall.cocogc.cn/static/images/personal/order-3.png', status: 1 },
      { id: '3', text: '已退货', icon: 'https://tmall.cocogc.cn/static/images/personal/order-4.png', status: 3 },
    ]
    const appList = [
      { id: '0', text: '黄金兑换', icon: 'https://tmall.cocogc.cn/static/images/personal/gold.png', path: '/pages/gold/record/index'},
      { id: '1', text: '话费充值', icon: 'https://tmall.cocogc.cn/static/images/personal/phone.png', path: '/pages/phone/record/index'},
      { id: '2', text: '加油卡充值', icon: 'https://tmall.cocogc.cn/static/images/personal/oil.png', path: '/pages/oil/order/index'},
      { id: '3', text: '生活缴费', icon: 'https://tmall.cocogc.cn/static/images/personal/life.png', path: '/pages/life/order/index'},
      { id: '4', text: '会员卡券', icon: 'https://tmall.cocogc.cn/static/images/personal/vipCard.png', path: '/pages/vip/record/index'},
      { id: '5', text: '海南旅游', icon: 'https://tmall.cocogc.cn/static/images/personal/travel.png', path: '/pages/travel/order/list/index'},
    ]
    const list = [
      { id: '0', text: '积分日志', icon: 'https://mall.cocotc.cn/static/images/home/supermarket-actived.png', path: '/pages/history/index'},
      { id: '1', text: '卡密充值', icon: 'https://tmall.cocogc.cn/static/images/personal/kami.png', path: '/pages/cardCharge/index'},
      { id: '2', text: '帮助中心', icon: 'https://tmall.cocogc.cn/static/images/personal/help.png', path: '/pages/help/index'},
      { id: '3', text: '联系我们', icon: 'https://tmall.cocogc.cn/static/images/personal/contact.png', path: '/pages/link/index'},
      { id: '4', text: '设置', icon: 'https://tmall.cocogc.cn/static/images/personal/setUp.png', path: '/pages/setting/index'},
    ]
    return (
      <View className={styles.wrapper}>
        {/*banner wrapper start*/}
        <View className={styles.bannerContainer}>
          <Swiper
            indicatorColor={'#999'}
            indicatorActiveColor={'#333'}
            indicatorDots
            circular
            autoplay
            className={styles.bannerSwiper}
          >
            {
              this.props.bannerList.map((item, index) => {
                return (
                  <SwiperItem key={index}>
                    <Image src={item.src} className={styles.bannerImg}></Image>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
          <View className={styles.infoWrapper}>
            <Image src={'https://mall.cocotc.cn/static/images/home/jd.png'} className={styles.logoImg}></Image>
            <View className={styles.infoContainer}>
              <Text className={styles.mobile}>{this.props.info.userName}</Text>
              <View className={styles.hint}>
                <Image src={'https://tmall.cocogc.cn/static/images/me/hands.png'} className={styles.handIcon}></Image>
                <Text className={styles.hintText}>专业选手</Text>
              </View>
            </View>
          </View>
        </View>
        { /* banner wrapper end*/}
        {/*order all waiting finished back end*/}
        <View className={styles.orderWrapper}>
          <View className={styles.orderContainer}>
            {
              orderList.map((item) => {
                return (
                  <View key={item.id} className={styles.orderItem} onClick={() => this.goOrders(item.status)}>
                    <Image src={item.icon} className={styles.orderIcon}></Image>
                    <Text className={styles.orderText}>{item.text}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
        {/*order all waiting finished back end*/}
        <View className={styles.container}>
          <View className={styles.title}>兑换服务订单</View>
          <View className={styles.appList}>
            {
              appList.map(item => {
                return (
                  <View className={styles.item} key={item.id} onClick={() => this.goPath(item.path)}>
                    <Image src={item.icon}></Image>
                    <View className={styles.appText}>{item.text}</View>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View className={styles.container}>
          {
            list.map(item => {
              return (
                <View className={styles.line} key={item.id} onClick={() => this.goPath(item.path)}>
                  <Image src={item.icon}></Image>
                  <View className={styles.text}>{item.text}</View>
                  <View className={styles.right}>
                    <AtIcon value='chevron-right' size='30' color='#ccc'></AtIcon>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }

}

export default User


