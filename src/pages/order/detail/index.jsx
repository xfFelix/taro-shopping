import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { action } from '../list/store'
import Address from "@/pages/tab/Cart/components/address"
import Goods from "@/pages/order/detail/components/goods";

@connect(({user, order}) => ({
  token: user.token,
  detail: order.detail
}), dispatch => ({
  getOrder: (data) => dispatch(action.getOrderDetailSync(data))
}))
export default class OrderList extends Component{

  config ={
    navigationBarTitleText: '订单详情'
  }

  constructor(){
    super(...arguments)
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    let token = this.props.token
    let code = this.$router.params.id
    this.props.getOrder({code, token})
  }

  render(): any {
    const { detail } = this.props
    return (
      <View className={styles.wrapper}>
        <View className={styles.status}>
          <Image className={styles.statusPic} src={'https://mall.cocotc.cn/static/images/cart/supermarket.png'}></Image>
          <Text>{detail.orderStatus}</Text>
        </View>
        <View className={styles.address}>
          <Address address={detail.address} disabled></Address>
        </View>
        <View className={styles.order}>
          <View className={styles.orderItem}>
            <Text className={styles.label}>订单编号：</Text>
            <Text className={styles.value}>{detail.orderId}</Text>
          </View>
          <View className={styles.orderItem}>
            <Text className={styles.label}>下单时间：</Text>
            <Text className={styles.value}>{detail.addTime}</Text>
          </View>
        </View>
        <View className={styles.goods}>
          {
            detail.goodsList && detail.goodsList.map(item => {
              return (
                <Goods key={item.id+ ''} item={item}></Goods>
              )
            })
          }
        </View>
        <View className={styles.stream} onClick={() => Taro.navigateTo({url: '/pages/order/stream/index?id=' + detail.orderId})}>
          <View className={styles.vendorId}>{detail.vendorId}</View>
          <View className={styles.vendorId}>{detail.orderId}</View>
          <View className={styles.goStream}><Text>查看物流</Text><Image className={styles.right} src={'https://tmall.cocogc.cn/static/images/me/right.png'}></Image></View>
        </View>
        <View className={styles.bottom}>
          <View className={styles.amount}>
            <View className={styles.amountItem}>
              <View className={styles.label}>商品总额</View>
              <View className={styles.label}>{detail.sellMoney}</View>
            </View>
            <View className={styles.amountItem}>
              <View className={styles.label}>运费</View>
              <View className={styles.label}>{detail.shippingFee}</View>
            </View>
            <View className={styles.amountItem}>
              <View className={styles.label}>服务费</View>
              <View className={styles.label}>{detail.serviceMoney}</View>
            </View>
          </View>
          <View className={styles.total}>实付：<Text className={styles.price}>{detail.totalMoney}</Text></View>
        </View>
      </View>
    )
  }
}
