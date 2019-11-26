import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button, RichText, Input } from "@tarojs/components"
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import {connect} from "@tarojs/redux"
import { action } from '../store'
import Dialog from "@/components/dialog"
import ICON from '@/assets/img/tab/supermarket-actived.png'
import PayPassword from "@/components/PayPassword"
import {dialog} from "@/util/index";
import {setParams} from "@/pages/success/store/action";

@connect(({user, oil}) => ({
  token: user.token,
  info: user.info,
  costInfo: oil.costInfo,
  total: oil.price
}), dispatch => ({
  getCostInfo: (data) => dispatch(action.getCostInfoSync(data)),
  submit: (data) => dispatch(action.submitSync(data)),
  setParams: (data) => dispatch(setParams(data))
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
        6. 根据中石油/中石化规定，同一张实名加油卡每天仅支持在一个或多个平台累计充值8次，例如：在中石油充值1次，在某东充值2次，在积分充值3次，那么您当日的充值次数仅剩余2次；<br/>
        7. 本业务不支持7天无理由退货退款，请知晓。`},
      {type: 2, value:
          `1. 本卡密可为中石油/中石化加油卡充值使用，如无加油卡，须办理加油卡并进行首次充值后，方可进行本业务的充值活动（提示：新开卡用户需24小时后才可办理自助充值）；<br/>
        2. 卡密有效期为自发放之日起一年；<br/>
        3. 此卡密可在中石油/中石化所属售卡充值网点 充值，也可登陆中国石化加油卡网站在线充值<span style="color: #30ce84">www.sinopecsales.com</span>以及登陆中国石油加油卡网站在线充值<span style="color: #30ce84">www.95504.net</span>或<span style="color: #30ce84">www.card.petrochina.com.cn</span><br/>
        4.  提示：根据中石油/中石化规定，为确保账户资金安全，充值后金额自动存储在“待圈存金额中”，使用时只需到任意中石油/中石化售卡充值网点或自助终端设备上进行加油卡圈存操作，即可充值成功；<br/>
        5. 根据中石油/中石化规定，同一张实名加油卡每天仅支持在一个或多个平台累计充值8次，例如：在中石油充值1次，在某东充值2次，在积分充值3次，那么您当日的充值次数仅剩余2次；<br/>
        6. 本业务不支持7天无理由退货退款，请知晓。<br/>`}
    ],
    showType: false,
    showNumber: false,
    showInfo: false,
    showCode: false,
    rechargeType: 1,
    price: 100,
    type: 1,
    number: ''
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index?redirect=/pages/tab/Cart/index`})
  }

  getType = (type) => {
    this.setState({type})
    const {rechargeType} = this.state
    if (rechargeType == 1) {
      this.onShowNumber()
    } else {
      if (type == 2) {
        return dialog.toast({title: '中石油未开通充值卡'})
      }
      this.getInfo()
    }
  }

  getInfo = async () => {
    const {price, rechargeType, type} = this.state
    let token = this.props.token
    await this.props.getCostInfo({faceValue: price, type, token, rechargeType})
    this.onShowInfo()
  }

  submit = async (code) => {
    const {rechargeType, type, number, price} = this.state
    let token = this.props.token
    let config = {rechargeType, oilCardType: type,cardNum: number, code, faceValue: price, token}
    await this.props.submit(config)
    // 设置成功信息
    let params = {price: this.props.total, path:{ home: '/pages/oil/home/index', order: '/pages/oil/order/index'}}
    await this.props.setParams(params)
    Taro.redirectTo({url: '/pages/success/index'})
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
            <View>积分余额：<Text className={styles.price}>{this.props.info.score}</Text></View>
            <View onClick={() => Taro.navigateTo({url: '/pages/oil/order/index'})}>兑换记录&gt;</View>
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
            onClick={()=> this.onShowType()}
          >立即兑换</View>
          <View className={styles.recovery} onClick={() => Taro.navigateTo({url: '/pages/oil/recovery/index'})}>立即回收</View>
        </View>
        {/* type类型选择 1 中石化 2 中石油 */}
        <AtActionSheet isOpened={this.state.showType} cancelText='取消' title='选择加油卡类型' onCancel={() =>this.onClose()}>
          <AtActionSheetItem onClick={() => this.getType(1)}>
            中石化
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => this.getType(2)}>
            中石油
          </AtActionSheetItem>
        </AtActionSheet>
        {/*卡号弹窗*/}
        {
          this.state.showNumber && <Dialog
            renderHeader={<View>输入加油卡卡号</View>}
            renderFooter={<Button className={styles.confirm} onClick={() => this.getInfo()}>确认</Button>}
            onClose={() => this.onClose()}
            onBack={() => this.onShowType()}
          >
            <View className={styles.code}>
              <Text className={styles.label}>卡号</Text>
              <Input className={styles.input} placeholder={'请输入卡号'} value={this.state.number} onInput={(e) => this.setState({number: e.target.value})}></Input>
            </View>
          </Dialog>
        }
        {
          this.state.showInfo && <Dialog
            renderHeader={<View>确认兑换</View>}
            renderFooter={<Button className={styles.confirm} onClick={() => this.onShowCode()}>确认</Button>}
            onClose={() => this.onClose()}
            onBack={() => this.goBack()}
          >
            <View className={styles.content}>
              <View className={styles.total}>
                <Image src={ICON} className={styles.icon}></Image>
                <Text>{this.props.costInfo.total}</Text>
              </View>
              <View className={styles.flex}>
                <Text className={styles.name}>产品名称</Text>
                <Text className={styles.value}>{this.props.costInfo.productName}</Text>
              </View>
              {
                this.state.rechargeType == 1 && <View className={styles.flex}>
                  <Text className={styles.name}>充值账号</Text>
                  <Text className={styles.value}>{this.state.number}</Text>
                </View>
              }
              <View className={styles.flex}>
                <Text className={styles.name}>服务费</Text>
                <Text className={styles.value}>{this.props.costInfo.service_fee.toFixed(2)}</Text>
              </View>
              <View className={styles.flex}>
                <Text className={styles.name}>应付合计</Text>
                <Text className={styles.value}>{this.props.costInfo.total}</Text>
              </View>
            </View>
          </Dialog>
        }
        {this.state.showCode && <PayPassword isClosed onBack={() => this.onShowInfo()} onConfirm={this.submit}></PayPassword>}
      </View>
    )
  }

  goBack = () => {
    const { rechargeType } = this.state
    if (rechargeType == 1) {
      this.onShowNumber()
    } else {
      this.onShowType()
    }
  }

  onShowInfo = () => {
    this.setState({showNumber: false, showType: false, showInfo: true, showCode: false})
  }

  onShowType = () => {
    this.setState({showNumber: false, showInfo: false, showType: true, showCode: false })
  }

  onShowNumber = () => {
    this.setState({showType: false, showNumber: true, showInfo: false, showCode: false})
  }

  onShowCode = () => {
    this.setState({showType: false, showNumber: false,  showInfo: false, showCode: true})
  }

  onClose = () => {
    this.setState({
      showType: false,
      showNumber: false,
      showInfo: false,
      showCode: false,
      number: '',
    })
  }
}
