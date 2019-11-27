import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import {View, Image, Text, Input, Button} from "@tarojs/components"
import ICON from '@/assets/img/tab/supermarket-actived.png'
import {getPriceByScan, paymentByScan} from './api'
import {dialog} from "@/util/index";
import PayPassword from "@/components/PayPassword"
import {connect} from "@tarojs/redux";

@connect(({user}) => ({
  token: user.token,
  info: user.info
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
      amount: '0'
    },
    value: '',
    showCode: false
  }

  componentWillMount(): void {
    const { id } = this.$router.params
    this.setState({id})
  }

  getPrice = (e) => {
    const {token} = this.props
    let value = e.detail.value
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
  }

  payment = async(code) => {
    Taro.showLoading({mask: true})
    const {token} = this.props
    const {value, id} = this.state
    try {
      const { data } = await paymentByScan({token, amount: value, verifyCode: code, vendorUserId: id})
      Taro.showToast({title: '支付成功'})
    } catch (e) {
      dialog.toast({title: e.message})
    } finally {
      this.setState({showCode: false}, () => {Taro.hideLoading()})
    }
  }

  goOrder = () => {
    Taro.navigateTo({url: '/app/pages/payment/order/index'})
  }

  render(): any {
    const { data, value, showCode } = this.state
    const { info } = this.props
    return (
      <View className={styles.wrapper}>
        <View className={styles.header}></View>
        <View className={styles.input}>
          <View className={styles.image}>
            <Image src={ICON}></Image>
          </View>
          <Input placeholder={'请输入金额'} value={value} onInput={this.getPrice}></Input>
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
              <View className={styles.label}>服务费</View>
              <View className={styles.value}>{data.service_fee}</View>
            </View>
            <View className={styles.item}>
              <View className={styles.label}>合计</View>
              <View className={styles.value}>{data.amount}</View>
            </View>
          </View>
        </View>
        <Button className={styles.btn} onClick={() => this.setState({showCode: true})}>立即兑换</Button>
        {showCode && <PayPassword
          isClosed
          onBack={() => this.setState({showCode: false})}
          onConfirm={(code) => this.payment(code)}>
        </PayPassword>}
      </View>
    )
  }
}
