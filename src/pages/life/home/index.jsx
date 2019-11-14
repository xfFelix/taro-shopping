import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View } from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { action } from '../store'
import {dialog} from "@/util/index"
import { getGrps } from './api'
import { AtIcon } from 'taro-ui'

@connect(({user, life}) => ({
  token: user.token,
  info: user.info,
  typeList: life.typeList,
  groupList: life.groupList
}), dispatch => ({
  setConfig: (data)=> dispatch(action.setConfigSync(data))
}))
export default class lifeHome extends Component{

  config ={
    navigationBarTitleText: '缴费账户',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  state = {
    list: {},
    showHistory: false
  }

  constructor(){
    super(...arguments)
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    console.log(Taro.getCurrentPages().length)
    this.getHistory()
  }

  getHistory = async () => {
    const { token } = this.props
    const {data} = await getGrps({token})
    if (data && Object.keys(data).length) {
      this.setState({list: data, showHistory: true})
    }
  }

  goUnit = (type) => {
    this.props.setConfig({type})
    Taro.navigateTo({url: '/pages/life/unit/index'})
  }

  goPayment = (item) => {
    const {bt, comp, pn, productNo} = item
    this.props.setConfig({type:bt,productNo,pn, productName: comp})
    Taro.navigateTo({url: '/pages/life/payment/index'})
  }

  goOrder = () => {
    Taro.navigateTo({url: '/pages/life/order/index'})
  }

  render(): any {
    const { info, typeList } = this.props
    const { list } = this.state
    return (
      <View className={styles.wrapper}>
        {
          this.state.showHistory && <View>
            <View className={styles.addPay}>
              <Text>我的缴费</Text>
            </View>
            {
              Object.keys(list).map(key => {
                return (
                  <View className={styles.container} key={key+ ''}>
                    <View className={styles.title}>{this.findNameByGroup(key)}</View>
                    {
                      list[key].map((i,index)=> {
                        return (
                          <View className={styles.content} key={index + ''} onClick={() => this.goPayment(i)}>
                            <Image src={this.findImgByType(i.bt)}></Image>
                            <View className={styles.info}>
                              <View>{this.findNameByType(i.bt)}</View>
                              <View>{i.pn}</View>
                            </View>
                            <View className={styles.right}>
                              <AtIcon value='chevron-right' size='30' color='#ccc'></AtIcon>
                            </View>
                          </View>
                        )
                      })
                    }
                  </View>
                )
              })
            }
          </View>
        }
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
        <View className={styles.homeHelp} onClick={()=>this.goOrder()}>缴费记录</View>
      </View>
    )
  }

  findNameByType(id) {
    const filter = this.props.typeList.reduce((pre, cur) => {
      pre[cur.type] = cur.name
      return pre
    }, {})
    return filter[+id]
  }

  findImgByType(id) {
    const filter = this.props.typeList.reduce((pre, cur) => {
      pre[cur.type] = cur.imgUrl
      return pre
    }, {})
    return filter[+id]
  }

  findNameByGroup(id) {
    const filter = this.props.groupList.reduce((pre, cur) => {
      pre[cur.id] = cur.label
      return pre
    }, {})
    return filter[+id]
  }
}
