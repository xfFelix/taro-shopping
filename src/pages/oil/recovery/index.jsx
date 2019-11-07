import Taro,{Component} from "@tarojs/taro"
import {View, Text, Button} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import { dialog } from "@/util/index";
import {action} from '../store'
import NoData from "@/components/NoData"

@connect(({user, oil}) => ({
  token: user.token,
  list: oil.recoveryList,
  statusList: oil.statusList
}), dispatch => ({
  getOrderList: (data) => dispatch(action.getRecoveryListSync(data))
}))
export default class GoldRecord extends Component {
  config ={
    navigationBarTitleText: '加油卡回收',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#373C48'
  }

  constructor(){
    super(...arguments)
  }

  state = {
    offset: 1,
    size: 10
  }

  componentWillMount() { //将要装载
    let token = this.props.token
    if (!token) return Taro.redirectTo({url: '/pages/Login/index'})
    this.getList()
  }

  getList = () => {
    let token = this.props.token
    const { type, offset, size } = this.state
    let config = {token, type, offset, rows: size}
    this.props.getOrderList(config)
  }

  onReachBottom(){
    this.setState(prevState=>{start:prevState.start++},()=>{
      this.getLogs();
    })
  }

  statusFilter = (status) => {
    const statusOption = this.props.statusList.reduce((pre, cur) => {
      pre[cur.value] = cur.label2
      return pre
    }, {})
    return statusOption[status]
  }

  render(){
    return(
      <View>
        <View className="recordW">
          <View className="recordUl">
            {
              this.props.list && this.props.list.length ? this.props.list.map((item,index)=>{
                return(
                  <View key={index} className="recordLi">
                    <View className="reName flex">
                      <View>产品名称：{item.cardUser}</View>
                      <View>{this.statusFilter(item.status)}</View>
                    </View>

                    <View className="reInfoW">
                      <View className="reInfo">
                        <View className="infoInner">订单编号：{item.idUrl}</View>
                        <View className="infoInner">时间：{item.orderTime}</View>
                        <View className="infoInner">卡号：{item.idBackUrl}</View>
                        <View className="infoInner">卡密：{item.memo}</View>
                        <View className="infoInner">服务费：{item.serviceFee.toFixed(2)}</View>
                        <View className="total">合计：{item.totalAmount}</View>
                      </View>
                    </View>
                    <Button disabled={item.status==0 ? true : false} className={'recovery'}>立即回收</Button>
                  </View>
                )
              }) : <NoData></NoData>
            }
          </View>
        </View>
      </View>

    )
  }
}
