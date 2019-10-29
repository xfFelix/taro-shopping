import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";
import ICON from '../../assets/img/tab/supermarket-actived.png'

@connect(({cart, user, preview}) => ({

}), dispatch => ({

}))
export default class Success extends Component{

  config ={
    navigationBarTitleText: '成功'
  }

  constructor(){
    super(...arguments)
  }

  async componentDidMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index?redirect=/pages/tab/Cart/index`})
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.container}>
          <Image src={'https://tmall.cocogc.cn/static/images/changeSuccess.jpg'} className={styles.banner}></Image>
          <Text className={styles.text}>提交成功</Text>
          <View className={styles.number}>
            <Image src={ICON} className={styles.icon}></Image>
            <Text>5.25</Text>
          </View>
        </View>
        <View className={styles.btnWrapper}>
          <Button className={`${styles.btn} ${styles.home}`}></Button>
          <Button className={`${styles.btn} ${styles.order}`}></Button>
        </View>
        <View className={styles.more}>
          <View className={styles.title}>更多兑换</View>
          <View className={styles.content}>
            <View className={styles.item}>
              <Image></Image>
              <Text>黄金兑换</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
