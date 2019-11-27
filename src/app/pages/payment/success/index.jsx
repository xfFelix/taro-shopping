import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import ICON from '@/assets/img/tab/supermarket-actived.png'
import {connect} from "@tarojs/redux";

@connect(({success}) => ({
  list: success.list,
}))
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

  goHome = (path) => {

  }

  goOrder = (path) => {

  }

  render(): any {
    const { price, time, company } = this.state
    const { list } = this.props
    return (
      <View className={styles.wrapper}>
        <View className={styles.container}>
          <Image src={'https://tmall.cocogc.cn/static/images/changeSuccess.jpg'} className={styles.banner}></Image>
          <Text className={styles.text}>支付成功</Text>
          <View className={styles.number}>
            <Image src={ICON} className={styles.icon}></Image>
            <Text>{price}</Text>
          </View>
        </View>
        <View className={styles.btnWrapper}>
          <Button className={`${styles.btn} ${styles.home}`} onClick={() => this.goHome()}>回到首页</Button>
          <Button className={`${styles.btn} ${styles.order}`} onClick={() => this.goOrder()}>查看订单</Button>
        </View>
        <View className={styles.more}>
          <View className={styles.title}>更多兑换</View>
          <View className={styles.content}>
            {list.map(item => {
              return (
                <View className={styles.item} key={item.id + ''}>
                  <Image src={item.imgPath} className={styles.img}></Image>
                  <Text>{item.name}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}
