import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import {View, Image, Text, Input, Button} from "@tarojs/components"
import Storage from '@/assets/js/storage'
import ICON from '@/assets/img/tab/supermarket-actived.png'

export default class Payment extends Component{

  config = {
    navigationBarTitleText: '扫码消费',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  state = {
    id: '',
    token: '',
    info: '',
    data: ''
  }

  componentWillMount(): void {
    const { id } = this.$router.params
    let storage = new Storage()
    let token = storage.get('token')
    let info = storage.get('user_info')
    this.setState({id, token, info})
  }

  render(): any {
    const { info, data } = this.state
    return (
      <View className={styles.wrapper}>
        <View className={styles.header}></View>
        <View className={styles.input}>
          <View className={styles.image}>
            <Image src={ICON}></Image>
          </View>
          <Input placeholder={'请输入金额'}></Input>
        </View>
        <View className={styles.container}>
          <View className={styles.box}>
            <View className={styles.item}>
              <View className={styles.label}>积分余额：<Text className={styles.price}>{info.score}</Text></View>
              <View className={styles.value}>消费记录&gt;</View>
            </View>
          </View>
          <View className={styles.box}>
            <View className={styles.item}>
              <View className={styles.label}>服务费</View>
              <View className={styles.value}>0</View>
            </View>
            <View className={styles.item}>
              <View className={styles.label}>合计</View>
              <View className={styles.value}>0</View>
            </View>
          </View>
        </View>
        <Button className={styles.btn}>立即兑换</Button>
      </View>
    )
  }
}
