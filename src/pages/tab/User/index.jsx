import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import styles from './index.module.scss'
import {connect} from "@tarojs/redux"
import { action } from './store'

@connect(({user, me}) => ({
  token: user.token,
  bannerList: me.bannerList,
  info: user.info,
  bottomSwiper: me.bottomList
}), dispatch => ({
  getBannerList: () => dispatch(action.getTopSwiperSync()),
  getBottomList: () => dispatch(action.getBottomSwiperSync())
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
    this.props.getBottomList()
    this.props.getBannerList()
  }

  goOrders = (status) => {
    Taro.navigateTo({url: `/pages/order/list/index?status=${status}`})
  }

  render() {
    const orderList = [
      { id: '0', text: '全部订单', icon: 'https://tmall.cocogc.cn/static/images/personal/order-1.png', status: 0 },
      { id: '1', text: '未完成', icon: 'https://tmall.cocogc.cn/static/images/personal/order-2.png', status: 2 },
      { id: '2', text: '已完成', icon: 'https://tmall.cocogc.cn/static/images/personal/order-3.png', status: 1 },
      { id: '3', text: '已退货', icon: 'https://tmall.cocogc.cn/static/images/personal/order-4.png', status: 3 },
    ]
    const list = [
      [
        { id: '0', title: '我的椰子分', icon: 'yezi'},
        { id: '1', title: '话费充值', icon: 'mobile'},
        { id: '2', title: '门票兑换记录', icon: 'ticket'},
        { id: '7', title: '设置', icon: 'ticket'}
      ],
      [
        { id: '3', title: '卡密充值', icon: 'ticket'},
        { id: '4', title: '帮助中心', icon: 'question'},
        { id: '5', title: '联系客服', icon: 'listen'},
        { id: '6', title: '商务合作', icon: 'card'},
      ]
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
          {
            list.map((items, index) => {
              return (
                <View key={index} className={styles.content}>
                  {
                    items.map((item) => {
                      return(
                        <View key={item.id} className={styles.item}>
                          <Image src={`https://tmall.cocogc.cn/static/images/me/${item.icon}.png`} className={styles.icon}></Image>
                          <View className={styles.title}>
                            <Text>{item.title}</Text>
                            {
                              item.id === '0' && <Text>旅游分：{this.props.info.score}</Text>
                            }
                          </View>
                          <Image src={'https://tmall.cocogc.cn/static/images/me/right.png'} className={styles.right}></Image>
                        </View>
                      )
                    })
                  }
                </View>
              )
            })
          }
        </View>
        <Swiper className={styles.bottomSwiper}>
          {
            this.props.bottomSwiper.map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <Image src={item.src} className={styles.bannerImg}></Image>
                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    )
  }

}

export default User


