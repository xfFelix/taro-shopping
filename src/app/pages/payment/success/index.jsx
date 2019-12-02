import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import ICON from '@/assets/img/tab/supermarket-actived.png'

export default class PaymentSuccess extends Component{

  config ={
    navigationBarTitleText: '成功'
  }

  constructor(){
    super(...arguments)
  }

  state = {
    price: '',
    time: '',
    company: ''
  }

  componentWillMount(): void {
    const { price, time, company } = this.$router.params
    this.setState({price, time, company})
  }

  goHome = () => {
    Taro.navigateBack()
  }

  goOrder = () => {
    Taro.navigateBack().then((res) => {
      setTimeout(() => {
        Taro.navigateTo({url: '/app/pages/payment/order/index'})
      }, 1000)
    })
  }

  render(): any {
    const { price, time, company } = this.state
    return (
      <View className={styles.wrapper}>
        <View className={styles.container}>
          <Image src={'https://tmall.cocogc.cn/static/images/changeSuccess.jpg'} className={styles.banner}></Image>
          <Text className={styles.text}>支付成功</Text>
          <View className={styles.number}>
            <Image src={ICON} className={styles.icon}></Image>
            <Text>{price}</Text>
          </View>
          <View className={styles.params}>
            <Text>支付时间：</Text>
            <Text>{time}</Text>
          </View>
          <View className={styles.params}>
            <Text>商家名称：</Text>
            <Text>{company}</Text>
          </View>
        </View>
        <View className={styles.btnWrapper}>
          <Button className={`${styles.btn} ${styles.home}`} onClick={() => this.goHome()}>回到首页</Button>
          <Button className={`${styles.btn} ${styles.order}`} onClick={() => this.goOrder()}>查看订单</Button>
        </View>
      </View>
    )
  }
}
