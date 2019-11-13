import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import {View, Swiper, SwiperItem, Image} from "@tarojs/components"
import { AtSearchBar } from 'taro-ui'
import {connect} from "@tarojs/redux"
import {getSwiperList, getTravelList, searchTravelList} from './api'
import {dialog} from "@/util/index";
import NoData from "@/components/NoData";

@connect(({user}) => ({
  token: user.token
}))
export default class TravelHome extends Component{

  config = {
    navigationBarTitleText: '海南旅游'
  }

  state = {
    swiperList: [],
    list: [],
    n: 1,
    m: 10,
    offset: 0,
    isMore: true,
    value: ''
  }

  componentWillMount(): void {
    let token = this.props.token
    if (!token) return Taro.redirectTo({url: '/pages/Login/index'})
    this.getSwiperList()
    this.getList()
  }

  getSwiperList = async () => {
    try {
      const { data } = await getSwiperList({catId: 207, startNum: 0, num: 10 })
      this.setState({swiperList: data})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  onReachBottom(): void {
    if (this.state.isMore) {
      if (this.state.value) {
        this.setState(pre => ({offset: pre.offset + pre.m}), () => {
          this.onSearch()
        })
      } else {
        this.setState(pre => ({n: ++pre.n}), () => {
          this.getList()
        })
      }
    }
  }

  getList = async () => {
    try {
      const {n, m} = this.state
      const { data } = await getTravelList({n, m })
      if (data.length != this.state.m) {
        this.setState({isMore: false})
      }
      this.setState(pre => ({list: [...pre.list, ...data]}))
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  splitUrl = (url) => {
    let id = url.split('=')[1]
    this.goDetail(id)
  }

  goDetail = (id) => {
    Taro.navigateTo({url: '/pages/travel/detail/index?id=' + id})
  }

  onChange = (e) => {
    this.setState({value: e})
  }

  onActionClick = (e) => {
    this.setState({list: [], isMore: true}, () => {
      if (this.state.value) {
        this.onSearch()
      } else {
        this.getList()
      }
    })
  }

  onSearch = async () => {
    try {
      const {value, offset} = this.state
      const { data } = await searchTravelList({keyword: value, offset})
      if (data.length != this.state.m) {
        this.setState({isMore: false})
      }
      this.setState(pre => ({list: [...pre.list, ...data]}))
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <AtSearchBar
          showActionButton
          value={this.state.value}
          fixed
          onChange={this.onChange.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
        />
        <Swiper
          className={styles.swiper} indicatorDots
          indicatorColor={'#fff'}
          indicatorActiveColor={'#30ce84'}
          autoplay>
          {
            this.state.swiperList.map((item, index) => {
              return (
                <SwiperItem key={index + ''}>
                  <Image src={item.img} style={'width: 100%;height: 100%'} onClick={() => this.splitUrl(item.url)}></Image>
                </SwiperItem>
              )
            })
          }
        </Swiper>
        <View className={styles.container}>
          {
            this.state.list && this.state.list.length ? this.state.list.map(item => {
              return (
                <View className={styles.item} key={item.uuid} onClick={() => this.goDetail(item.uuid)}>
                  <View className={styles.image}>
                    <Image src={item.uuimgpath}></Image>
                  </View>
                  <View className={styles.content}>
                    <View className={styles.name}>{`【${item.uujtype}级景区】${item.uutitle}`}</View>
                    <View className={styles.address}>详细地址：{item.uuaddress}</View>
                    {item.uuruntime!=0 && <View className={styles.address}>开放时间：{item.uuruntime}</View>}
                    <View className={styles.price}>{(+item.uutprice).toFixed(2)}</View>
                  </View>
                </View>
              )
            }) : <NoData></NoData>
          }
        </View>
      </View>
    )
  }

}
