import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtNoticebar, AtIcon } from 'taro-ui'
import {connect} from '@tarojs/redux'
import Navigator from "../../../navigator";

import Goods from "@/components/goods";
import { setHomeSwiper, getHomeHot, getHomeNew } from '@/actions/home'
import './index.scss'

@connect(({home, user}) => ({
  list: home.list,
  swiperList: home.swiperList,
  hotList: home.hotList,
  newList: home.newList,
  info: user.info
}), (dispatch) => ({
  getHomeSwiper: () => dispatch(setHomeSwiper()),
  getHomeHot: () => dispatch(getHomeHot()),
  getHomeNew: () => dispatch(getHomeNew())
}))
class Home extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
  }

  componentWillMount () {
    // 判断缓存是否存在
    if (!this.props.hotList || !Object.keys(this.props.hotList).length) {
      // 获取热门爆款
      this.props.getHomeHot()
    }
    if (!this.props.newList || !Object.keys(this.props.newList).length) {
      // 获取走马灯 - 消息
      this.props.getHomeNew()
    }
    if (!this.props.swiperList || !Object.keys(this.props.swiperList).length) {
      // 获取轮播图
      this.props.getHomeSwiper()
    }
  }

  render() {
    const { list, swiperList, hotList, newList } = this.props
    return (
      <View className={'home-wrapper'}>
        <View className={'home'}>
          <Image src={'https://mall.cocotc.cn/static/images/home/bg.png'} className={'index-bg'} mode={'widthFix'}></Image>
          <View className={'notice-bar'}>
            <View className={'icon-listen'}>
              <AtIcon value='volume-plus' size='16' color='#fff'></AtIcon>
            </View>
            <View className={'notice-view'}><Text className={'notice-text'}>椰子分公告:</Text></View>
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
          <View className={'userinfo'}>
            <View><Text className={'font name'}>{this.props.info ? this.props.info.score : '登录'}</Text></View>
            <View><Text className={'font'}>积分余额</Text></View>
          </View>
        </View>
        <View className={'home-content'}>
          <View className='home-list-wrapper'>
            {
              list.map((items, index, arr) => {
                return (
                  <View key={index} className='home-list-row'>
                    {
                      items.map((item, i) => {
                        return (
                          <View key={item.id} className='home-list-column' onClick={() => Taro.navigateTo({url: '/pages/Login/index?redirect=1'})}>
                            <Image src={item.imgPath} className='home-list-column-img'></Image>
                            <Text className='home-list-column-text'>{item.name}</Text>
                          </View>
                        )
                      })
                    }
                  </View>
                )
              })
            }
          </View>
          <View className='home-swiper-wrapper'>
            <Swiper
              className='home-swiper'
              indicatorColor='#999'
              indicatorActiveColor='#333'
              circular
              indicatorDots
              autoplay>
              {
                swiperList.map((item, index) => {
                  return (
                    <SwiperItem key={index}>
                      <Image src={item.src} mode='widthFix' style="width: 100%"></Image>
                    </SwiperItem>
                  )
                })
              }
            </Swiper>
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

