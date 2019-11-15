import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import {View, Image, Text} from "@tarojs/components"
import {getOrderDetail} from '../api'
import {dialog} from "@/util/index"
import {connect} from "@tarojs/redux"
import {AtIcon} from "taro-ui";

@connect(({user, travel}) => ({
  token: user.token,
  statusOptions: travel.orderStatusOptions
}))
export default class OrderDetail extends Component{

  config = {
    navigationBarTitleText: '订单详情'
  }

  state = {
    showCode: false,
    data : {}
  }

  componentWillMount(): void {
    const {id} = this.$router.params
    this.getOrder(id)
  }

  orderStatusFilter = status =>{
    let orderStatusOptionsKeyValue = this.props.statusOptions.reduce((acc, cur) => {
      acc[cur.value] = cur.label
      return acc
    }, {})
    return orderStatusOptionsKeyValue[+status]
  }

  getOrder = async (id) => {
    try {
      const {token} = this.props
      if (!token) return Taro.redirectTo({url: `/pages/Login/index`})
      const {data} = await getOrderDetail({id, token})
      this.setState({data})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  render(): any {
    const { data, showCode } = this.state
    return (
      <View className={styles.wrapper}>
        <View className={styles.ticketInfo}>
          <View className={styles.ticket}>
            <View className={styles.status}>{this.orderStatusFilter(data.status)}</View>
            <View className={styles.goods}>
              <Image src={data.imgpath}></Image>
              <View className={styles.nameWrapper}>
                <View className={styles.name}>{data.cardUser}</View>
                <View className={styles.price}>{data.orderNum}</View>
              </View>
            </View>
          </View>
          <View className={styles.line}>
            使用日期：<Text className={styles.time}>{data.useTime}</Text>
          </View>
          <View className={styles.line}>
            入园地址：<Text className={styles.time}>{data.address}</Text>
          </View>
        </View>
        <View className={styles.certWrapper}>
          <View className={styles.cert} onClick={() => this.setState(pre => ({showCode: !pre.showCode}))}>
            凭证码：
            <View className={styles.code}>{data.idBackUrl}</View>
            <View className={styles.right}>
              <AtIcon value='chevron-right' size='30' color='#ccc'></AtIcon>
            </View>
          </View>
          {showCode && <View className={styles.qrCode}>
            <Image src={data.codeImg}></Image>
          </View>}
        </View>
        <View className={styles.userWrapper}>
          <View className={styles.item}>
            <Text className={styles.label}>取票人</Text>
            <Text className={styles.value}>{data.name}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>手机号</Text>
            <Text className={styles.value}>{data.mobile}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>证件号码</Text>
            <Text className={styles.value}>{data.idNum}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>支付时间</Text>
            <Text className={styles.value}>{data.orderTime}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>订单号</Text>
            <Text className={styles.value}>{data.idUrl}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>数量</Text>
            <Text className={styles.value}>{data.cardBank}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>总票价</Text>
            <Text className={styles.value}>{data.orderNum * data.cardBank}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>服务费</Text>
            <Text className={styles.value}>{data.serviceFee}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>合计</Text>
            <Text className={styles.value}>{data.totalAmount}</Text>
          </View>
        </View>
      </View>
    )
  }
}
