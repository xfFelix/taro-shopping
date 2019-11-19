import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { AtTabBar } from 'taro-ui'
import { action } from './store'
import NoData from "@/components/NoData";
import {confirmOrder} from "@/pages/order/list/api";
import {dialog} from "@/util/index";

@connect(({user, order}) => ({
  token: user.token,
  list: order.list
}), dispatch => ({
  getOrderList: (data) => dispatch(action.getOrdersSync(data)),
  loadMoreList: (data) => dispatch(action.loadMoreSync(data))
}))
export default class OrderList extends Component{

  config ={
    navigationBarTitleText: '订单管理'
  }

  constructor(){
    super(...arguments)
    this.statusList = [
      { title: '全部', status: 0},
      { title: '未完成', status: 2},
      { title: '已完成', status: 1},
      { title: '已退货', status: 3}
    ]
    this.state = {
      current: 0,
      offset: 1,
    }
  }

  componentDidMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index?redirect=/pages/tab/Cart/index`})
    let status = Number(this.$router.params.status) || 0
    let current = status == 1 ? 2 : (status == 2 ? 1 : status )
    this.setState({current }, () => {
      this.getOrders()
    })
  }

  getOrders = () => {
    const { offset, current } = this.state
    const { token } = this.props
    let status = this.statusList[current].status
    this.props.getOrderList({ offset, status, token})
  }

  handleClick (value) {
    this.setState({current: value, offset: 1}, () => {
      this.getOrders()
    })
  }

  loadMoreList = () => {
    const { offset, current } = this.state
    const { token } = this.props
    let status = this.statusList[current].status
    this.props.loadMoreList({ offset, status, token})
  }

  onReachBottom(): void {
    this.setState(pre => ({offset: pre.offset + 10}), () => {
      this.loadMoreList()
    })
  }

  goDetail = (id) => {
    Taro.navigateTo({url: `/pages/order/detail/index?id=${id}`})
  }

  goStream = (id) => {
    Taro.navigateTo({url: `/pages/order/stream/index?id=${id}`})
  }

  confirmOrder = async (id) => {
    let res = await Taro.showModal({title: '提示', content: '确认收货？'})
    if (res.confirm) {
      try {
        const { data } = await confirmOrder({token: this.props.token, id})
        this.setState({offset: 0}, () => this.getOrders())
      } catch (e) {
        dialog.toast({title: e.message})
      }
    }
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <AtTabBar
          tabList={this.statusList}
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
                    <Button className={styles.stream} onClick={() => this.goStream(item.orderId)}>查看物流</Button>
                    {item.orderStatus === '已确认' && <Button className={styles.finished} onClick={() => this.confirmOrder(item.id)}>确认收货</Button>}
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
