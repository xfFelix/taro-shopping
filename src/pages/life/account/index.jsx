import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Input } from "@tarojs/components"
import { AtIcon } from 'taro-ui'
import {connect} from "@tarojs/redux"
import { action } from '../store'
import {dialog} from "@/util/index"

@connect(({user, life}) => ({
  token: user.token,
  config: life.config,
  typeList: life.typeList
}), dispatch => ({
  setConfig: (data)=> dispatch(action.setConfigSync(data))
}))
export default class lifeHome extends Component{

  config ={
    navigationBarTitleText: '新增缴费账户',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
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

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.item} onClick={() => Taro.navigateTo({url: '/pages/life/city/index'})}>
          <View>
            <Image src={this.findIconByType(this.props.config.type)}></Image>
            <Text>{this.findNameByType(this.props.config.type)}</Text>
          </View>
          <Text>{this.props.config.city}</Text>
          <View className={styles.right}>
            <AtIcon value='chevron-right' size='20' color='#000'></AtIcon>
          </View>
        </View>
        <View className={styles.item}>
          <Text>缴费单位</Text>
          <Text>{this.props.config.productName}</Text>
        </View>
        <View className={styles.item}>
          <Text>用户编号</Text>
          <Input placeholder={'请输入用户编号'}></Input>
        </View>
        <View className={styles.item}>
          <Text>分组</Text>
          <Text>{this.props.config.productName}</Text>
        </View>
      </View>
    )
  }
}
