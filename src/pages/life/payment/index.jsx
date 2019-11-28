import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Input, Button } from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { action } from '../store'
import { AtActivityIndicator } from 'taro-ui'
import {dialog} from "@/util/index"
import {getBill, getTax, payment} from './api'
import PayPassword from "@/components/PayPassword"
import {setParams} from "@/pages/success/store/action";

@connect(({user, life}) => ({
  token: user.token,
  info: user.info,
  config: life.config,
  typeList: life.typeList,
}), dispatch => ({
  setConfig: (data)=> dispatch(action.setConfigSync(data)),
  goSuccess: (data) => dispatch(setParams(data))
}))
export default class lifePayment extends Component{

  config ={
    navigationBarTitleText: '缴费账户',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  state = {
    value: '',
    showArrears: false,
    showProgress: true,
    arrears: '0.00', // 欠费
    balance: '0.00', // 余额
    sale: 0,
    amount: 0,
    showCode: false
  }

  constructor(){
    super(...arguments)
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    this.getArrears()
  }

  getArrears = () => {
    const {token, config} = this.props
    const {pn, productNo} = config
    this.time = 30
    this.interval = setInterval(async () => {
      try {
        const { error_code, data, message } = await getBill({token, productNo, pn, oid: (new Date()).getTime()})
        this.time--
        if (error_code !== 3) {
          if (+error_code) {
            this.setState({showProgress: false})
          } else {
            if (data) {
              this.setState({arrears: data.totalamount,balance: data.wecbalance,showArrears: true})
            }
          }
          clearInterval(this.interval)
        }
        if (this.time <= 0) {
          clearInterval(this.interval)
        }
      } catch(e) {
        clearInterval(this.interval)
        this.setState({showProgress: false})
        console.log('接口超时！！！！')
      }
    }, 1000)
  }

  findNameByType(id) {
    const filter = this.props.typeList.reduce((pre, cur) => {
      pre[cur.type] = cur.name
      return pre
    }, {})
    return filter[+id]
  }

  findIconByType(id) {
    const filter = this.props.typeList.reduce((pre, cur) => {
      pre[cur.type] = cur.icon
      return pre
    }, {})
    return filter[+id]
  }

  handlerInput = (e) => {
    let token = this.props.token
    this.setState({value: e.target.value},() => {
      clearInterval(this.timeout)
      this.timeout = setTimeout(async () => {
        const { data } = await getTax({amount: e.target.value, token})
        let sale = data.sale + data.service_fee
        this.setState({sale, amount: data.amount})
      }, 1000)
    })
  }

  recharge = () => {
    const {info} = this.props
    let amount = +this.state.amount
    let pr = +this.state.value
    if (!pr || pr < 5) return dialog.toast({title: '请输入正确的金额'})
    if (amount > info.score) return dialog.toast({title: '积分余额不足'})
    this.setState({showCode: true})
  }

  handlerConfirm = async (val) => {
    try {
      const {token, config} = this.props
      const { grp, type, pn, productNo} = config
      let params = { token, grp, pn, pr: this.state.value, bt: type, productNo, verify_code: val}
      const {data} = await payment(params)
      this.props.goSuccess({price:this.state.amount, path: { home: '/pages/life/home/index', order: '/pages/life/order/index'}})
      Taro.navigateTo({url: '/pages/success/index'})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.item} style={'padding: 0 30rpx;'} onClick={() => Taro.redirectTo({url: '/pages/life/city/index'})}>
          <View className={styles.name}>
            <Image src={this.findIconByType(this.props.config.type)} className={styles.iconImg}></Image>
            <Text>{this.findNameByType(this.props.config.type)}</Text>
          </View>
          <View>积分余额：<Text className={styles.price}>{this.props.info.score}</Text></View>
        </View>
        <View className={styles.content}>
          <View className={styles.box}>
            <View className={styles.line}>
              <Text className={styles.label}>缴费单元</Text>
              <Text>{this.props.config.productName}</Text>
            </View>
            <View className={styles.line}>
              <Text className={styles.label}>用户编号</Text>
              <Text>{this.props.config.pn}</Text>
            </View>
            {
              this.state.showProgress &&<View className={styles.line}>
                <Text className={styles.label}>欠费</Text>
                <View>
                  {this.state.showArrears ? <Text>{this.state.arrears}</Text>: <AtActivityIndicator></AtActivityIndicator>}
                </View>
              </View>
            }
            {
              this.state.showArrears && <View className={styles.line}>
                <Text className={styles.label}>余额</Text>
                <View>
                  <Text>{this.state.balance}</Text>
                </View>
              </View>
            }
          </View>
          <View className={styles.box}>
            <View className={styles.input}>
              <Text className={styles.previous}>充值金额:</Text>
              <Input placeholder={'金额限制5~9999'} value={this.state.value} onInput={(e) => this.handlerInput(e)}></Input>
            </View>
            <View className={styles.line}>
              <Text className={styles.label}>售价：</Text>
              <Text>{this.state.sale}</Text>
            </View>
            <View className={styles.line}>
              <Text className={styles.label}>应付合计：</Text>
              <Text>{this.state.amount}</Text>
            </View>
          </View>
          <Button disabled={!this.state.value} className={styles.recharge} onClick={() => this.recharge()}>立即充值</Button>
        </View>
        {this.state.showCode && <PayPassword
          isClosed
          onBack={() => this.setState({showCode: false})}
          onConfirm={(val) => this.handlerConfirm(val)}>
        </PayPassword>}
      </View>
    )
  }
}
