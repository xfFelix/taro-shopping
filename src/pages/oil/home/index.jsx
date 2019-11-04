import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button, RichText } from "@tarojs/components"
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import {connect} from "@tarojs/redux"
import { action } from '../store'

@connect(({user}) => ({
  token: user.token,
  info: user.info
}), dispatch => ({
}))
export default class OrderList extends Component{

  config ={
    navigationBarTitleText: '加油卡充值',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
  }

  state = {
    priceList: [
      { id: '0', value: 100 },
      { id: '1', value: 200 },
      { id: '2', value: 500 },
      { id: '3', value: 1000 }
    ],
    typeList: [
      {type: 1, value:
          `1. 本业务仅支持有实名加油卡的情况，如无加油卡，须办理加油卡并进行首次充值后，方可进行本业务的充值活动（提示：新开卡用户需24小时后才可办理自助充值）；<br/>
        2. 中石化加油卡号是以100011开头的19位数字，暂仅支持状态正常的主卡充值，副卡及损坏卡、挂失卡、过期卡、注销卡等均不能充值。中石化官方客服热线：区号+95105888/91505988；<br/>
        3. 中石油加油卡号是以90开头的16位数字，暂仅支持个人卡记名卡的充值，挂失卡、过期卡、注销卡等均不能充值。中石油官方客服热线：95504；<br/>
        4. 24小时内到账；<br/>
        5. 提示：根据中石油/中石化规定，为确保账户资金安全，充值后金额自动存储在“待圈存金额中”，使用时只需到任意中石油/中石化售卡充值网点或自助终端设备上进行加油卡圈存操作，即可充值成功；<br/>
        6. 根据中石油/中石化规定，同一张实名加油卡每天仅支持在一个或多个平台累计充值8次，例如：在中石油充值1次，在某东充值2次，在椰子分充值3次，那么您当日的充值次数仅剩余2次；<br/>
        7. 本业务不支持7天无理由退货退款，请知晓。`},
      {type: 2, value:
          `1. 本卡密可为中石油/中石化加油卡充值使用，如无加油卡，须办理加油卡并进行首次充值后，方可进行本业务的充值活动（提示：新开卡用户需24小时后才可办理自助充值）；<br/>
        2. 卡密有效期为自发放之日起一年；<br/>
        3. 此卡密可在中石油/中石化所属售卡充值网点 充值，也可登陆中国石化加油卡网站在线充值<span class="price-color">www.sinopecsales.com</span>以及登陆中国石油加油卡网站在线充值<span class="price-color">www.95504.net</span>或<span class="price-color">www.card.petrochina.com.cn</span><br/>
        4.  提示：根据中石油/中石化规定，为确保账户资金安全，充值后金额自动存储在“待圈存金额中”，使用时只需到任意中石油/中石化售卡充值网点或自助终端设备上进行加油卡圈存操作，即可充值成功；<br/>
        5. 根据中石油/中石化规定，同一张实名加油卡每天仅支持在一个或多个平台累计充值8次，例如：在中石油充值1次，在某东充值2次，在椰子分充值3次，那么您当日的充值次数仅剩余2次；<br/>
        6. 本业务不支持7天无理由退货退款，请知晓。<br/>`}
    ],
    rechargeType: 1,
    price: 100,
    showType: false
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index?redirect=/pages/tab/Cart/index`})
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.black}>
          <View className={styles.banner}>
            <View
              className={this.state.rechargeType == 1 ? `${styles.rechargeType} ${styles.active}`: styles.rechargeType}
              onClick={() => this.setState({rechargeType: 1})}
            >直充</View>
            <View
              className={this.state.rechargeType == 2 ? `${styles.rechargeType} ${styles.active}`: styles.rechargeType}
              onClick={() => this.setState({rechargeType: 2})}
            >充值卡</View>
          </View>
          <View className={styles.info}>
            <View>旅游分余额：<Text className={styles.price}>{this.props.info.score}</Text></View>
            <View>兑换记录&gt;</View>
          </View>
        </View>
        <View className={styles.container}>
          {
            this.state.priceList.map(item => {
              return (
                <View
                  className={this.state.price == item.value ? `${styles.item} ${styles.checked}`: styles.item} key={item.id}
                  onClick={() => this.setState({price: item.value})}
                >
                  {item.value}
                  <Text className={styles.price}>元</Text>
                </View>
              )
            })
          }
        </View>
        <View className={styles.desc}>
          <View className={styles.title}>温馨提示</View>
          <RichText nodes={this.state.typeList[this.state.rechargeType - 1].value}></RichText>
        </View>
        <View className={styles.fixed}>
          <View
            className={styles.exchange}
            onClick={()=> this.setState({showType: true})}
          >立即兑换</View>
          <View className={styles.recovery}>回收</View>
        </View>
        <AtActionSheet isOpened={this.state.showType} cancelText='取消' title='选择加油卡类型'>
          <AtActionSheetItem>
            中石化
          </AtActionSheetItem>
          <AtActionSheetItem>
            中石油
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
