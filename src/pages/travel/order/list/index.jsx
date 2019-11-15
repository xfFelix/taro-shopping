import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { AtTabBar } from 'taro-ui'
import NoData from "@/components/NoData"
import {dialog} from "@/util/index"
import {getOrderList} from '../api'

@connect(({user, travel}) => ({
  token: user.token,
  statusOptions: travel.orderStatusOptions
}))
export default class OrderList extends Component{

  config ={
    navigationBarTitleText: '兑换记录'
  }

  constructor(){
    super(...arguments)
    this.statusList = [
      { title: '全部', status: 8},
      { title: '未使用', status: 0},
      { title: '已使用', status: 1},
      { title: '已过期', status: 2},
      { title: '取消', status: 3}
    ]
  }

  state = {
    list: [],
    offset: 1,
    rows: 10,
    status: 8,
    isMore: true,
    current: 0
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    this.getOrders()
  }

  orderStatusFilter = status =>{
    let orderStatusOptionsKeyValue = this.props.statusOptions.reduce((acc, cur) => {
      acc[cur.value] = cur.label
      return acc
    }, {})
    return orderStatusOptionsKeyValue[+status]
  }

  getOrders = async () => {
    try {
      const {token} = this.props
      const {status, offset, rows} = this.state
      let config = {status, offset, rows, token}
      const { data } = await getOrderList(config)
      if (data.length !== rows) {
        this.setState({isMore: false})
      }
      this.setState(pre => ({list: [...pre.list, ...data]}))
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  onReachBottom(): void {
    if (this.state.isMore) {
      this.setState(pre => ({offset: pre.offset + 10}), () => {
        this.getOrders()
      })
    }
  }

  handleClick (value) {
    this.setState({current: value, status: this.statusList[value].status, list: [], offset: 1, isMore: true}, () => {
      this.getOrders()
    })
  }

  goDetail = (id) => {
    Taro.navigateTo({url: `/pages/travel/order/detail/index?id=${id}`})
  }

  render(): any {
    const { list } = this.state
    return (
      <View className={styles.wrapper}>
        <AtTabBar
          tabList={this.statusList}
          onClick={(value) => this.handleClick(value)}
          current={this.state.current}
        />
        {
          (list && list.length) ?
            list.map(item => {
              return(
                <View className={styles.order} key={item.id}>
                  <View className={styles.title}>
                    <View className={styles.number}>
                      <Text className={styles.classify}>门票</Text>
                      <Text>订单号：{item.idUrl}</Text>
                    </View>
                    <View className={styles.status}>{this.orderStatusFilter(item.status)}</View>
                  </View>
                  <View className={styles.goods}>
                    <Image src={item.imgpath} className={styles.pic}></Image>
                    <View className={styles.info}>
                      <View className={styles.name}>{item.cardUser}</View>
                      <View className={styles.num}><Text>{item.orderNum}</Text><Text>x{item.cardBank}</Text></View>
                    </View>
                  </View>
                  <View className={styles.total}>
                    <Text>共{item.cardBank}件商品</Text>
                    <View className={styles.allTotal}>合计：<Text className={styles.price}>{item.totalAmount}</Text></View>
                  </View>
                  <View className={styles.btnWrapper}>
                    <Button className={styles.stream} onClick={() => this.goDetail(item.id)}>订单详情</Button>
                  </View>
                </View>
              )
            })
            : <NoData></NoData>
        }

      </View>
    )
  }
}
