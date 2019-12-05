import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { action } from '../list/store'
import Goods from "@/pages/order/detail/components/goods"
import { AtTimeline } from 'taro-ui'

@connect(({user, order}) => ({
  token: user.token,
  detail: order.detail,
  stream: order.stream
}), dispatch => ({
  getOrder: (data) => dispatch(action.getOrderDetailSync(data)),
  getStream: (data) => dispatch(action.getStreamSync(data))
}))
export default class OrderList extends Component{

  config ={
    navigationBarTitleText: '物流详情'
  }

  constructor(){
    super(...arguments)
  }

  async componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    let token = this.props.token
    let code = this.$router.params.id
    await this.props.getOrder({code, token})
    this.props.getStream({token, id: this.props.detail.id})
  }

  render(): any {
    const { detail, stream } = this.props
    return (
      <View className={styles.wrapper}>
        <View className={styles.info}>
          <View className={styles.number}>
            订单编号：
            <Text className={styles.orderId}>{detail.orderId}</Text>
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
          <View className={styles.vendorId}>
            <Text>快递</Text>
            <Text>{detail.vendorId}</Text>
          </View>
        </View>
        <View className={styles.stream}>
          {
            (stream && stream.length !== 0) ? <AtTimeline items={stream}></AtTimeline> : <Text>暂无物流信息</Text>
          }
        </View>
      </View>
    )
  }
}
