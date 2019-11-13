import Taro,{Component} from "@tarojs/taro"
import {View, Text, Button} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import { dialog } from "@/util/index";
import {action} from '../store'
import NoData from "@/components/NoData"

@connect(({user, oil}) => ({
  token: user.token,
  list: oil.list,
  statusList: oil.statusList
}), dispatch => ({
  getOrderList: (data) => dispatch(action.getOrderListSync(data)),
  loadMoreList: (data) => dispatch(action.loadMoreList((data)))
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
      {id: 0, name:"直充", value: 1},
      {id: 1, name:"充值卡", value: 2}
    ]
  }

  state = {
    type: 1,
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
    this.setState(prevState=>({offset: prevState.offset + 10}),()=>{
      let token = this.props.token
      const { type, offset, size } = this.state
      let config = {token, type, offset, rows: size}
      this.props.loadMoreList(config);
    })
  }

  selectType = async (item) => {
    this.setState({type: item.value, offset: 1},()=> this.getList() )
  }

  statusFilter = (status) => {
    const statusOption = this.props.statusList.reduce((pre, cur) => {
      if (this.state.type == 1) {
        pre[cur.value] = cur.label
      } else {
        pre[cur.value] = cur.label2
      }
      return pre
    }, {})
    return statusOption[status]
  }

  goApply = (id) => {
    Taro.navigateTo({url: '/pages/oil/apply/index?id=' + id})
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
                        {this.state.type == 1 && <View className="infoInner">充值账号：{item.cardNum}</View>}
                        {this.state.type == 2 && <View className="infoInner">卡号：{item.idBackUrl}</View>}
                        {this.state.type == 2 && <View className="infoInner">卡密：{item.memo}</View>}
                        <View className="infoInner">服务费：{item.serviceFee.toFixed(2)}</View>
                        <View className="total">合计：{item.totalAmount}</View>
                      </View>
                    </View>
                    {this.state.type == 2 && <Button className={'btn-recovery'} disabled={item.status!=0} onClick={() => this.goApply(item.id)}>立即回收</Button>}
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
