import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog,filter} from "@/util/index";
import { vipOrderList } from '../api';
import { exchangeFun } from "@/pages/vip/store/action"

@connect(({user,vip}) => ({
  token: user.token,
}), dispatch => ({
  setExchange: (data) => dispatch(exchangeFun(data))
}))

export default class VipHome extends Component {
  config ={
    navigationBarTitleText: '兑换记录',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
    this.state={
      recordList:[],
      offset:1,
      allLoadFlag:false
    }
  }

  componentWillMount() { //将要装载
    this.getRecord();
  }

  //拿到列表信息
  getRecord = async()=>{
    let res= await vipOrderList({offset:this.state.offset,rows:10,token:this.props.token});
    if(res.code!=1) return dialog.toast({title: res.message});
    this.setState({recordList:this.state.recordList.concat(res.data)});
    if(res.data.length<10){
      this.setState({allLoadFlag:true})
    }
  }

  onReachBottom(){
    if(this.state.allLoadFlag==false){
      this.setState(prevState=>{offset:prevState.offset+=10},()=>{
        this.getRecord();
      })
    }else{
      dialog.toast({title: '没有更多了'})
    }
  }

  stateType=(val)=>{
    switch (val){
      case 0:
        return '兑换中';
      case 1:
        return '兑换成功';
      default:
        return '兑换失败'
    }
  }

  timeType=(val)=>{
    switch (val){
      case '1':
        return '周卡';
      case '2':
        return '月卡';
      case '3':
        return '季卡';
      case '4':
        return '半年卡';
      default:
        return '年卡';
    }
  }

  copyClip=(val)=>{
    this.setState({isOpened:false})
    Taro.setClipboardData({data: val}).then(()=>{});
  }

  urlView=(memo)=>{
    this.props.setExchange(memo)
    Taro.navigateTo({url:'/pages/vip/urlView/index'});
  }

  render(){
    return(
      <View className="vipRecord">
         <View className="recordW">
            <View className="recordUl">
              {
                this.state.recordList&&this.state.recordList.length>1?(
                this.state.recordList.map((item,index)=>{
                    return(
                      <View className="recordLi" key={index} >
                        <View className="reName flex">
                          <View>产品名称：{item.cardUser}</View>
                          <Text>{this.stateType(item.status)}</Text>
                        </View>
                        <View className="reInfoW">
                          <View className="reInfo">
                            <View className="infoInner">订单编号:{item.idUrl}</View>
                            <View className="infoInner">时间：{item.orderTime}</View>
                            {(item.idUrl.length==30 && item.orderNum)&& <View className="infoInner">卡密：{item.orderNum} <Text className="copyClip" onClick={()=>this.copyClip(item.orderNum)}>复制</Text></View>}
                            {(item.idUrl.length==30 && item.idBackUrl)&& <View className="infoInner">卡号：{item.idBackUrl} </View>}
                            {(item.idUrl.length==30 && item.cardNum)&& <View className="infoInner">有效日期：{item.cardNum} </View>}
                            {(item.idUrl.length==30 && item.memo && item.memo!='兑换卡券成功')&& <View className="infoInner changeCode">兑换码：<Text onClick={()=>this.urlView(item.memo)} className="memo">{item.memo}</Text></View>}
                            {(item.idUrl.length==32 && item.cardNum)&& <View className="infoInner">充值账号：{item.cardNum} </View>}
                            {(item.idUrl.length==32 && item.cardBank )&& <View className="infoInner">类型：{this.timeType(item.cardBank)} </View>}
                            <View className="infoInner">售价：{filter.toDecimal2(item.repaymentAmount)}</View>
                            <View className="infoInner">税费：{filter.toDecimal2(item.taxFee)}</View>
                            <View className="total">合计：{filter.toDecimal2(item.totalAmount)}</View>
                          </View>
                        </View>
                    </View>
                    )
                })):(<Image src={'https://mall.cocotc.cn/static/images/home/nothing.png'} className="notingImg"></Image>)
              }
            </View>
        </View>
      </View>
    )
  }

}
