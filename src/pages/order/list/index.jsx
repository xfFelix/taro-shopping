import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { AtTabBar } from 'taro-ui'
import { action } from './store'
import NoData from "@/components/NoData";

@connect(({user, order}) => ({
  token: user.token,
  store: order.store,
  list: order.list
}), dispatch => ({
  getOrderList: (data) => dispatch(action.getOrdersSync(data))
}))
export default class OrderList extends Component{

  config ={
    navigationBarTitleText: '订单管理'
  }

  constructor(){
    super(...arguments)
    this.state = {
      current: 0
    }
  }

  componentDidMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index?redirect=/pages/tab/Cart/index`})
    let status = Number(this.$router.params.status) || 0
    let store = this._store()
    let current = status == 1 ? 2 : (status == 2 ? 1 : status )
    this.setState({current})
    this.getOrders({...store, status})
  }

  _store = () => {
    let token = this.props.token
    let store = this.props.store[this.state.current]
    if (!store){
      store = {
        offset: 1,
        token,
        status: 0
      }
    }
    return store
  }

  getOrders = (data) => {
    this.props.getOrderList(data)
  }

  handleClick (value) {
    let status = value == 1 ? 2 : (value == 2 ? 1 : value )
    let store = this._store()
    this.getOrders({...store, status})
    this.setState({
      current: value
    })
    console.log(this.props.store)
  }

  goDetail = (id) => {
    Taro.navigateTo({url: `/pages/order/detail/index?id=${id}`})
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <AtTabBar
          tabList={[
            { title: '全部', status: 0},
            { title: '未完成', status: 2},
            { title: '已完成', status: 1},
            { title: '已退货', status: 3}
          ]}
          onClick={(value) => this.handleClick(value)}
          current={this.state.current}
        />
        {
          (this.props.list && this.props.list.length) ?
            this.props.list.map(item => {
              return(
                <View className={styles.order} key={item.orderId}>
                  <View className={styles.title}>
                    <View className={styles.number}>
                      <Text className={styles.classify}>{item.vendorId}</Text>
                      <Text>订单号：{item.orderId}</Text>
                    </View>
                    <View className={styles.status}>{item.orderStatus}</View>
                  </View>
                  {
                    item.goodsList.map(i => {
                      return (
                        <View className={styles.goods} key={i.id + ''} onClick={() => this.goDetail(item.orderId)}>
                          <Image src={i.picUrl} className={styles.pic}></Image>
                          <View className={styles.info}>
                            <View className={styles.name}>{i.goodsName}</View>
                            <View className={styles.num}>{i.buyNum}</View>
                          </View>
                        </View>
                      )
                    })
                  }
                  <View className={styles.total}>
                    <Text>共{item.goodsList && item.goodsList.length}件商品</Text>
                    <View className={styles.allTotal}>合计：<Text className={styles.price}>{item.totalMoney}</Text></View>
                  </View>
                  <View className={styles.btnWrapper}>
                    <Button className={styles.stream}>查看物流</Button>
                    <Button className={styles.finished}>确认收货</Button>
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
