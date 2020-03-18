import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import {View, Image, Text, Input, Button} from "@tarojs/components"
import {getPriceByScan, paymentByScan} from './api'
import {dialog} from "@/util/index";
import PayPassword from "@/components/PayPassword"
import {connect} from "@tarojs/redux";
import {getInfoSync} from "@/actions/user";

@connect(({user}) => ({
  token: user.token,
  info: user.info
}), dispatch => ({
  getInfo: (token) => dispatch(getInfoSync(token))
}))
export default class Payment extends Component{

  config = {
    navigationBarTitleText: '扫码消费',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  state = {
    id: '',
    data: {
      service_fee: '0',
      total: '0'
    },
    value: '',
    showCode: false,
    company: ''
  }

  componentWillMount(): void {
    const { id, company } = this.$router.params
    this.setState({id, company})
  }

  getPrice = (e) => {
    const {token} = this.props
    let value = e.detail.value
    if (value) {
      this.setState({value}, () => {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(async() => {
          try{
            const {data} = await getPriceByScan({token, amount: value})
            this.setState({data})
          } catch (e) {
            dialog.toast({title: e.message})
          }
        }, 1000)
      })
    } else {
      this.setState({value,data: {service_fee: '0', total: '0'}})
    }
  }

  payment = async(code) => {
    Taro.showLoading({mask: true})
    const {token} = this.props
    const {value, id, company} = this.state
    try {
      const { data } = await paymentByScan({token, amount: value, verifyCode: code, vendorUserId: id, mchName: company})
      Taro.navigateTo({url: `/app/pages/payment/success/index?company=${company}&time=${data.addDate}&price=${data.totalAmount}`})
      this.setState({showCode: false}, () => {Taro.hideLoading()})
      this.props.getInfo(token)
    } catch (e) {
      this.setState({showCode: false}, () => {
        dialog.toast({title: e.message})
      })
    }
  }

  goOrder = () => {
    Taro.navigateTo({url: '/app/pages/payment/order/index'})
  }

  onHandlerPayment = () => {
    const { value, data } = this.state
    const { info } = this.props
    if (!value || +value < 0.1) return dialog.toast({title: '请输入0.1~100w之间金额'})
    if (info.score < data.total) return dialog.toast({title: '积分余额不足'})
    this.setState({showCode: true})
  }

  render(): any {
    const { data, value, showCode, company } = this.state
    const { info } = this.props
    return (
      <View className={styles.wrapper}>
        <View className={styles.header}></View>
        <View className={styles.input}>
          <View className={styles.image}>
            <Image src={'https://mall.cocotc.cn/static/images/cart/icon.png'}></Image>
          </View>
          <Input type='digit' placeholder={'请输入金额'} value={value} onInput={this.getPrice}></Input>
        </View>
        <View className={styles.container}>
          <View className={styles.box}>
            <View className={styles.item}>
              <View className={styles.label}>积分余额：<Text className={styles.price}>{info.score}</Text></View>
              <View className={styles.value} onClick={() => this.goOrder()}>消费记录&gt;</View>
            </View>
          </View>
          <View className={styles.box}>
            <View className={styles.item}>
              <View className={styles.label}>商户名称</View>
              <View className={styles.value}>{company}</View>
            </View>
            <View className={styles.item}>
              <View className={styles.label}>服务费</View>
              <View className={styles.value}>{data.service_fee}</View>
            </View>
            <View className={styles.item}>
              <View className={styles.label}>合计</View>
              <View className={styles.value}>{data.total}</View>
            </View>
          </View>
        </View>
        <Button className={styles.btn} onClick={() => this.onHandlerPayment()}>立即支付</Button>
        {showCode && <PayPassword
          isClosed
          onBack={() => this.setState({showCode: false})}
          onConfirm={(code) => this.payment(code)}>
        </PayPassword>}
      </View>
    )
  }
}
