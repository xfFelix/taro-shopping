import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import { dialog, filter } from '@/util/index'
import {backInfoFun} from "@/pages/phone/store/action"
import {phoneLogs} from '../api'
import PayPassword from "@/components/PayPassword";
import NoData from "@/components/NoData"

@connect(({phone,user}) => ({
  phoneType:phone.phoneType,
  token: user.token,
}), dispatch => ({

}))


export default class phoneRecord extends Component {
  config ={
    navigationBarTitleText: '话费充值',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
    this.selectList=[
      {id:0,name:"直充"},
      {id:1,name:"充值卡"}
    ],
    this.state = {
      typeId:0,
      logsList:[],
      start:0,
      allLoadFlag:false
    }
  }

  selectType(id){
    this.setState({typeId:id});
    this.setState({logsList:[],start:0},()=>{
      this.getLogs();
    });
  }

  componentWillMount() { //将要装载
    this.setState({typeId:this.props.phoneType})
    this.getLogs();
  }



  //话费记录
  getLogs = async() => {
    let res= await phoneLogs({history_type:this.state.typeId,start:this.state.start,token:this.props.token});
    if(res.error_code!=0) return dialog.toast({title: res.message});
    for(var i=0;i<res.data.length;i++){
      if(res.data[i].orderNum && res.data[i].orderNum.indexOf('https')!=-1){
        res.data[i]['number'] = this.getUrlParam("number",res.data[i].orderNum);
        res.data[i]['password'] = this.getUrlParam("password",res.data[i].orderNum)
      }
    }
    this.setState({logsList:this.state.logsList.concat(res.data)});
    if(res.data.length<10){
      this.setState({allLoadFlag:true})
    }
  }

  //截取
  getUrlParam(name,locationUrl){
    var arr = locationUrl.toString().split("?")[1].split('&')
    var res = {}
    for (var i = 0; i < arr.length; i++) {
      res[arr[i].split('=')[0]] = arr[i].split('=')[1]
    }
    return res[name]
  }

  onReachBottom(){
    if(this.state.allLoadFlag==false){
      this.setState(prevState=>{start:prevState.start+=10},()=>{
        this.getLogs();
      })
    }else{
      dialog.toast({title: '没有更多了'})
    }
  }

  statusInfo(status){
    switch (status){
      case 0:
        return "兑换中";
        break;
      case 1:
        return "兑换成功";
        break;
      case 2:
        return "兑换失败";
        break;
      case 4:
        return "已兑换";
        break;
      case 5:
        return "已过期";
        break;
      case 6:
        return "已废弃";
        break;
      case 7:
        return "已转卖";
        break;
    }
  }


  render(){
    return(
      <View className="phoneRecord">
        <View className="headFixed">
            <View className="selectWrap">
              {
                this.selectList.map((item,index)=>{
                  return (
                    <View
                      className={this.state.typeId==index?'selectOne selectActive':'selectOne'}
                      onClick={() => this.selectType(index)}
                      key={index}
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
                this.state.logsList&&this.state.logsList.length?(this.state.logsList.map((item,index)=>{
                  return(
                    <View key={index} className="recordLi">
                      <View className="reName flex">
                        <View>产品名称：{this.state.typeId==0?item.cardBank+'元话费直充':item.cardBank+'元话费充值卡'}</View>
                        <View>{this.statusInfo(item.status)}</View>
                      </View>
                      <View className="reInfoW">
                        <View className="reInfo">
                          <View className="infoInner">时间：{item.addDate}</View>
                          { this.state.typeId==0 &&<View className="infoInner">充值账号：{item.cardUser}</View> }
                          { this.state.typeId==1 &&<View className="infoInner">卡号：{item.number?item.number:'— —'}</View> }
                          { this.state.typeId==1 &&<View className="infoInner">卡密：{item.number?item.password:'— —'}</View>}
                          <View className="infoInner">服务费：{filter.toDecimal2((item.totalAmount-item.cardBank-item.taxFee))}</View>
                          <View className="infoInner">税费：{filter.toDecimal2(item.taxFee)}</View>
                          <View className="total">合计：{filter.toDecimal2(item.totalAmount)}</View>
                        </View>

                      </View>
                    </View>
                  )
                })
                ): (<Image src={'https://mall.cocotc.cn/static/images/home/nothing.png'} className="notingImg"></Image>)
              }
            </View>
        </View>
    </View>
    )
  }
}
