import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtNoticebar, AtIcon, AtSearchBar, AtGrid, AtTag } from 'taro-ui'
import Goods from '@/components/goods'
import Integral from "@/pages/tab/ShoppingMall/components/integral"

import { getShoppingSwiper } from '@/actions/shopping'
import { getHomeHot, getHomeNew } from '@/actions/home'
import styles from './index.module.scss'
import './index.scss'

@connect(({shopping, home}) => ({
  swiperList: shopping.swiperList,
  newList: home.newList,
  hotList: home.hotList,
  shopping
}), dispatch => ({
  getShoppingSwiper: () => dispatch(getShoppingSwiper()),
  getHomeHot: () => dispatch(getHomeHot()),
  getHomeNew: () => dispatch(getHomeNew()),
}))
class ShoppingMall extends Component {

  static options = {
    addGlobalClass: true
  }

  config = {
    navigationBarTitleText: '商城'
  }

  state = {
    value: '',
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!this.props.swiperList || !Object.keys(this.props.swiperList).length) {
      // 获取轮播图
      this.props.getShoppingSwiper()
    }
    if (!this.props.hotList || !Object.keys(this.props.hotList).length) {
      // 热门爆款
      this.props.getHomeHot()
    }
    if (!this.props.newList || !Object.keys(this.props.newList).length) {
      // 走马灯
      this.props.getHomeNew()
    }
  }

  onChange = (value) => {
    this.setState({value: value})
  }

  onActionClick = () => {
    const { value } = this.state
    Taro.navigateTo({url: '/pages/goods/list/index?name=' + value})
  }

  onHandlerClick = (item, index) => {
    Taro.navigateTo({url: '/pages/goods/list/index?productId=' + item.id})
  }

  goPath = (url) => {
    Taro.navigateTo({url: '/pages/web/index?url='+ url})
  }

  render() {
    const { swiperList, newList, hotList } = this.props
    return (
      <View className={styles.wrapper}>
        {/* 顶部轮播图 swiper */}
        <View className={styles.swiper}>
          {/* 轮播图 */}
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            {
              swiperList.map((item, index) => {
                return (
                  <SwiperItem key={index}>
                    <Image src={item.src} onClick={() => this.goPath(item.url)}></Image>
                  </SwiperItem>
                )
              })
            }
          </Swiper>
          {/* 搜索框 */}
          <View className={styles.searchWrapper}>
            <AtSearchBar
              value={this.state.value}
              onChange={this.onChange.bind(this)}
              onActionClick={this.onActionClick.bind(this)}
            />
          </View>
          {/* 走马灯 */}
          <View className={styles.noticeWrapper}>
            <View className={styles.iconListen}>
              <AtIcon value='volume-plus' size='18' color='#333'></AtIcon>
            </View>
            <Text className={styles.noticeText}>积分公告:</Text>
            <View className={styles.noticeContainer}>
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
            <View className={styles.iconListen}>
              <AtIcon value='chevron-right' size='18' color='#333'></AtIcon>
            </View>
          </View>
        </View>
        {/* 分类 calssify */}
        <View className={styles.classify}>
          <AtGrid data={
            [
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: '日用超市',
                id: '1620'
              },
              {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '手机数码',
                id: '9987'
              },
              {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '家用电器',
                id: '737'
              },
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: '美妆护肤',
                id: '1316'
              }
            ]
          } columnNum={4} hasBorder={false} onClick={this.onHandlerClick}/>
        </View>
        {/* 热门爆款 hot */}
        <View className={styles.hotBg}>
          <View className={styles.hot}>
            <Text className={styles.title}>热门爆款</Text>
            <Text className={styles.titleEN}>BEST SELLERS EXPLOSIVE MONEY</Text>
            <View className={styles.container}>
              <Swiper
                circular
                interval={2000}
                displayMultipleItems={3}
                autoplay>
                  {
                    hotList.map((item, index) => {
                      return (
                        <SwiperItem key={index}>
                          <Goods item={item}></Goods>
                        </SwiperItem>
                      )
                    })
                  }
              </Swiper>
            </View>
          </View>
        </View>
        {/* 积分区间 integral */}
        <Integral></Integral>
      </View>
    )
  }

}

export default ShoppingMall


