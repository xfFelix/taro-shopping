import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View } from "@tarojs/components"
import { AtIcon } from 'taro-ui'
import {connect} from "@tarojs/redux"
import { action } from '../store'
import {dialog} from "@/util/index"
import {getUnitList} from './api'

@connect(({user, life}) => ({
  token: user.token,
  config: life.config
}), dispatch => ({
  setConfig: (data)=> dispatch(action.setConfigSync(data))
}))
export default class lifeHome extends Component{

  config ={
    navigationBarTitleText: '缴费单元',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
  }

  state ={
    list: []
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    // this.getLocation()
  }

  componentDidShow(): void {
    if (this.props.config.city) {
      this.getList()
    }
  }

  getLocation = async () => {
    try {
      const res= await Taro.getLocation()
      console.log(res)
    }catch (e) {
      await dialog.toast({title: '位置获取失败'})
    }
  }

  getList = async() => {
    const {type, city} = this.props.config
    const { data} = await getUnitList({type, city})
    this.setState({list: data})
  }

  goAccount = (item) => {
    this.props.setConfig({productNo: item.code, productName: item.com})
    Taro.redirectTo({url: '/pages/life/account/index'})
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.item} onClick={() => Taro.navigateTo({url: '/pages/life/city/index'})}>
          <Text>缴费单元</Text>
          <Text>{this.props.config.city? this.props.config.city: '请选择地区'}</Text>
          <View className={styles.right}>
            <AtIcon value='chevron-right' size='20' color='#000'></AtIcon>
          </View>
        </View>
        {
          this.state.list.map(item => {
            return (
              <View className={styles.item} key={item.id} onClick={() => this.goAccount(item)}>
                <Text>{item.com}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }
}
