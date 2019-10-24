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
export default class AddressList extends Component{

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
                    <Text className={styles.tel}>{item.tel}</Text>
                  </View>
                  <View className={styles.address}>{item.area}</View>
                </View>
                <View className={styles.bottom}>
                  <View className={styles.btn}>
                    <Image className={styles.pic} src={'https://tmall.cocogc.cn/static/images/edit.png'}></Image>
                    <Text>编辑</Text>
                  </View>
                  <View className={styles.btn}>
                    <Image className={styles.pic} src={'https://tmall.cocogc.cn/static/images/delete.png'}></Image>
                    <Text>删除</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
        <Button className={styles.add}>添加新地址</Button>
      </View>
    )
  }
}
