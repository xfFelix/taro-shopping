import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import {View, Text} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {dialog} from "@/util/index"
import {getList} from './api'

@connect(({user}) => ({
  token: user.token
}))
export default class History extends Component{

  config ={
    navigationBarTitleText: '积分日志'
  }

  state = {
    list: [],
    id: ''
  }

  componentWillMount(): void {
    this.getList()
  }

  getList = async () => {
    try {
      const {token} = this.props
      const {id} = this.state
      const {data} = await getList({token, id})
      this.setState(pre => ({list: [...pre.list, ...data], id: data[data.length - 1].id}))
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  onReachBottom(): void {
    this.getList()
  }

  render(): any {
    const {list} = this.state
    return (
      <View className={styles.wrapper}>
        {
          list.map(item => {
            return (
              <View className={styles.item} key={item.id}>
                <View className={styles.line}>
                  <View className={styles.name}>{item.type}</View>
                  <View className={item.value > 0? styles.success: styles.warn}>{item.value > 0 ? `+${item.value}`: item.value}</View>
                </View>
                <View className={styles.line}>
                  <View className={styles.time}>
                    <Text className={'iconfont icon-time'} style={'font-size: 16px;margin-right: 4px'}></Text>
                    {item.date}
                  </View>
                  <View className={styles.total}>余额：{item.total}</View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}
