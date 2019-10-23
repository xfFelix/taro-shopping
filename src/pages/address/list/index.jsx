import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import {action} from '../store'


@connect(({user, address}) => ({
  token: user.token,
  list: address.list
}), dispatch => ({
  getList: (data) => dispatch(action.getAddressListSync(data))
}))
export default class Preview extends Component{

  config ={
    navigationBarTitleText: '地址管理'
  }

  constructor(){
    super(...arguments)
  }

  componentDidMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    let token = this.props.token
    this.props.getList({token})
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        {
          this.props.list.map(item => {
            return (
              <View className={styles.item} key={item.id}>
                <View className={styles.top}>
                  <View className={styles.name}>
                    <Text>{item.name}</Text>
                    <Text>{item.tel}</Text>
                  </View>
                  <View>{item.area}</View>
                </View>
                <View className={styles.bottom}>
                  <View>
                    <Image></Image>
                    <Text>编辑</Text>
                  </View>
                  <View>
                    <Image></Image>
                    <Text>删除</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}
