import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { getDirByFirstAsync, getSwiperByClassify } from '@/actions/classify'
import styles from './index.module.scss'

@connect(({ classify }) => ({
  classify
}), dispatch => ({
  getDirByFirstAsync: () => dispatch(getDirByFirstAsync()),
  getSwiperByClassify: () => dispatch(getSwiperByClassify())
}))
class Classify extends Component {

  config = {
    navigationBarTitleText: '分类'
  }

  state = {
    value: '',
    storeName: '天涯严选'
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getDirByFirstAsync()
    if (!this.props.classify.swiperList || !Object.keys(this.props.classify.swiperList).length) {
      this.props.getSwiperByClassify()
    }
  }

  onChange (value) {
    this.setState({
      value: value
    })
  }

  _store = () => {
    const { classify } = this.props
    let store = classify[this.state.storeName]
    if (!store) {
      store = []
    }
    return store
  }

  changeStoreName = (name) => {
    this.setState({
      storeName: name
    })
  }

  goList = (id) => {
    Taro.navigateTo({url: `/pages/goods/list/index?id=${id}`})
  }

  onActionClick = () => {
    const { value } = this.state
    Taro.navigateTo({url: '/pages/goods/list/index?name=' + value})
  }

  goPath = (url) => {
    Taro.navigateTo({url: '/pages/web/index?url='+ url})
  }

  render() {
    const { firstDir, swiperList } = this.props.classify
    let secoundDir = this._store()
    return (
      <View className={styles.classifyWrapper}>
        <View className={styles.searchWrapper}>
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onActionClick={() => this.onActionClick()}
          />
        </View>
        <View className={styles.container}>
          <ScrollView
            className={styles.leftWrapper}
            scrollY
            scrollWithAnimation
          >
            {
              firstDir.map((item) => {
                return (
                  <View className={item.name === this.state.storeName ? styles.active: styles.item} key={item.id} onClick={() => this.changeStoreName(item.name)}>
                    { item.name === this.state.storeName && <View className={styles.before}></View> }
                    { item.name }
                  </View>
                )
              })
            }
          </ScrollView>
          <ScrollView
            scrollY
            scrollWithAnimation
            className={styles.rightWrapper}>
            <View className={styles.swiper}>
              <Swiper
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular
                indicatorDots
                autoplay>
                {
                  swiperList.map((item, index) => {
                    return (
                      <SwiperItem key={index}>
                        <Image className={styles.image} src={item.src} onClick={() => this.goPath(item.url)}/>
                      </SwiperItem>
                    )
                  })
                }
              </Swiper>
            </View>
            <View className={styles.content}>
              {
                secoundDir.map((items) => {
                  return (
                    <View className={styles.li} key={items.id}>
                      <View className={styles.title}>{items.name}</View>
                      <View className={styles.itemWrapper}>
                        {
                          items.childCategory.map(item => {
                            return (
                              <View className={styles.item} key={item.id} onClick={() => this.goList(item.id)}>
                                <Image className={styles.image} src={item.picUrl} />
                                <Text className={styles.name}>{item.name}</Text>
                              </View>
                            )
                          })
                        }
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

}

export default Classify


