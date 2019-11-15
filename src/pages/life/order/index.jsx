import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import { dialog } from "@/util/index";
import NoData from "@/components/NoData"
import {getOrderList} from './api'

@connect(({user, life}) => ({
  token: user.token,
  typeList: life.typeList
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
    this.selectList=[
      {id: '0', name:"全部", value: ''},
      {id: '1', name:"电费", value: 13},
      {id: '2', name:"水费", value: 12},
      {id: '3', name:"燃煤费", value: 14},
    ]
    this.statusList = [
      {id: '0', name:"兑换中", value: 0},
      {id: '1', name:"兑换成功", value: 1},
      {id: '2', name:"兑换失败", value: 2}
    ]
  }

  state = {
    type: '',
    offset: 0,
    size: 10,
    list: [
    ]
  }

  componentWillMount() { //将要装载
    let token = this.props.token
    if (!token) return Taro.redirectTo({url: '/pages/Login/index'})
    this.getList()
  }

  getList = async () => {
    let token = this.props.token
    const { offset, type } = this.state
    let config = {token, start: offset}
    if (type) {
      config.type = type
    }
    const {data} = await getOrderList(config)
    if (data && data.length) {
      this.setState(pre => ({list: [...pre.list, ...data]}))
    }
  }

  onReachBottom(){
    this.setState(prevState=>({offset:prevState.offset + 10}),()=>{
      this.getList();
    })
  }

  selectType = async (item) => {
    this.setState({type: item.value, list: [], offset: 0}, () => this.getList())
  }

  statusFilter = (status) => {
    const statusOption = this.statusList.reduce((pre, cur) => {
      pre[cur.value] = cur.name
      return pre
    }, {})
    return statusOption[status]
  }

  render(){
    return(
      <View>
        <View className="headFixed">
          <View className="selectWrap">
            {
              this.selectList.map((item)=>{
                return (
                  <View
                    className={this.state.type==item.value?'selectOne selectActive':'selectOne'}
                    onClick={() => this.selectType(item)}
                    key={item.id + ''}
                  >
                    <Text className="selectName" >{item.name}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>


        <View className="recordW">
          <View className="recordUl">
            {
              this.state.list && this.state.list.length ? this.state.list.map((item,index)=>{
                return(
                  <View key={index} className="recordLi">
                    <View className="reName flex">
                      <View>产品名称：{item.cardBank + '元' + this.findNameByType(item.cardSubBank) + '直充'}</View>
                      <View>{this.statusFilter(item.status)}</View>
                    </View>

                    <View className="reInfoW">
                      <View className="reInfo">
                        <View className="infoInner">时间：{item.addDate}</View>
                        <View className="infoInner">充值账号：{item.cardNum}</View>
                        <View className="infoInner">售价：{(item.repaymentAmount + item.serviceFee).toFixed(2)}</View>
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

  findNameByType(id) {
    const filter = this.props.typeList.reduce((pre, cur) => {
      pre[cur.type] = cur.name
      return pre
    }, {})
    return filter[+id]
  }
}
