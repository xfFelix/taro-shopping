import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import { dialog } from "@/util/index";
import NoData from "@/components/NoData"
import {getLogsByScan} from '../api'

@connect(({user, life}) => ({
  token: user.token,
}), dispatch => ({
}))
export default class GoldRecord extends Component {
  config ={
    navigationBarTitleText: '兑换记录',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#373C48'
  }

  constructor(){
    super(...arguments)
  }

  state = {
    offset: 1,
    size: 10,
    list: []
  }

  componentWillMount() { //将要装载
    let token = this.props.token
    if (!token) return Taro.redirectTo({url: '/pages/Login/index'})
    this.getList()
  }

  getList = async () => {
    try {
      const { token } = this.props
      const { offset, size } = this.state
      let config = {token, start: offset, num: size}
      const {data} = await getLogsByScan(config)
      if (data && data.length) {
        this.setState(pre => ({list: [...pre.list, ...data]}))
      }
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  onReachBottom(){
    this.setState(prevState=>({offset:prevState.offset + prevState.size}),()=>{
      this.getList();
    })
  }

  render(){
    return(
      <View>
        <View className="recordW">
          <View className="recordUl">
            {
              this.state.list && this.state.list.length ? this.state.list.map((item,index)=>{
                return(
                  <View key={index} className="recordLi">
                    <View className="reName flex">
                      <View>产品名称：{item.cardUser}</View>
                    </View>

                    <View className="reInfoW">
                      <View className="reInfo">
                        <View className="infoInner">时间：{item.addDate}</View>
                        <View className="infoInner">售价：{(item.repaymentAmount).toFixed(2)}</View>
                        <View className="infoInner">服务费：{(item.serviceFee).toFixed(2)}</View>
                        <View className="infoInner">姓名：{item.name}</View>
                        <View className="infoInner">号码：{item.mobile}</View>
                        <View className="total">合计：{item.totalAmount}</View>
                      </View>
                    </View>
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
