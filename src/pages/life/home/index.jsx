import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View } from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { action } from '../store'
import {dialog} from "@/util/index"

@connect(({user, life}) => ({
  token: user.token,
  info: user.info,
  typeList: life.typeList
}), dispatch => ({
  setConfig: (data)=> dispatch(action.setConfigSync(data))
}))
export default class lifeHome extends Component{

  config ={
    navigationBarTitleText: '缴费账户',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
  }

  goUnit = (type) => {
    this.props.setConfig({type})
    Taro.navigateTo({url: '/pages/life/unit/index'})
  }

  render(): any {
    const { info, typeList } = this.props
    return (
      <View className={styles.wrapper}>
        <View className={styles.addPay}>
          <Text>新增缴费</Text>
          <View>椰子分余额：
            <Text className={styles.price}>{info.score}</Text>
          </View>
        </View>
        <View className={styles.payWrap}>
          {typeList.map(item => {
            return (
              <View className={styles.item} key={item.type + ''} onClick={() => this.goUnit(item.type)}>
                <Image src={item.icon} className={styles.addImg}></Image>
                <View>{item.name}</View>
              </View>
            )
          })}
        </View>
        <View className={styles.homeHelp}>缴费记录</View>
      </View>
    )
  }
}
