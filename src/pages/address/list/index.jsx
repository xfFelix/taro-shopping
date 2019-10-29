import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import {action} from '../store'
import { setDefault, getAddress } from '@/pages/tab/Cart/store/action'
import {removeAddress} from '../api'
import {dialog} from "@/util/index";

@connect(({user, address}) => ({
  token: user.token,
  list: address.list,
  isSelect: address.isSelect
}), dispatch => ({
  getList: (data) => dispatch(action.getAddressListSync(data)),
  addAddress: () => dispatch(action.addAddress()),
  editAddress: (data) => dispatch(action.editAddress(data)),
  setDefault: (data) => dispatch(setDefault(data)),
  setAddress: (data) => dispatch(getAddress(data))
}))
export default class AddressList extends Component{

  config ={
    navigationBarTitleText: '地址管理'
  }

  constructor(){
    super(...arguments)
  }

  componentDidShow() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    let token = this.props.token
    this.props.getList({token})
  }

  addAddress = () => {
    this.props.addAddress()
    Taro.navigateTo({url: '/pages/address/detail/index'})
  }

  editAddress = (item) => {
    this.props.editAddress(item)
    Taro.navigateTo({url: '/pages/address/detail/index'})
  }

  selectAddress = (item) => {
    if (this.props.isSelect) {
      this.props.setDefault(false)
      this.props.setAddress(item)
      Taro.navigateBack()
    }
  }

  deleteAddress = async (id) => {
    let res = await dialog.modal({ content: '是否删除？' })
    try {
      if (res) {
        let token = this.props.token
        const {message} = await removeAddress({id, token})
        await dialog.toast({title: message})
        this.props.getList({token})
      }
    } catch (e) {
      await dialog.toast({title: e})
    }
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        {
          this.props.list.map(item => {
            return (
              <View className={styles.item} key={item.id} onClick={() => this.selectAddress(item)}>
                <View className={styles.top}>
                  <View className={styles.name}>
                    <Text>{item.name}</Text>
                    <Text className={styles.tel}>{item.tel}</Text>
                  </View>
                  <View className={styles.address}>{item.area}</View>
                </View>
                <View className={styles.bottom}>
                  <View className={styles.btn} onClick={() => this.editAddress(item)}>
                    <Image className={styles.pic} src={'https://tmall.cocogc.cn/static/images/edit.png'}></Image>
                    <Text>编辑</Text>
                  </View>
                  <View className={styles.btn} onClick={() => this.deleteAddress(item.id)}>
                    <Image className={styles.pic} src={'https://tmall.cocogc.cn/static/images/delete.png'}></Image>
                    <Text>删除</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
        <Button className={styles.add} onClick={() => this.addAddress()}>添加新地址</Button>
      </View>
    )
  }
}
