import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import { dialog, filter } from '@/util'
import {goldLog,goldPrice,goldCode} from '../api'
import PayPassword from "@/components/PayPassword";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtIcon  } from "taro-ui";
import NoData from "@/components/NoData"

@connect(({gold,user}) => ({
  gold,
  info: user.info,
  token: user.token,
}), dispatch => ({
}))


export default class GoldRecord extends Component {
  config ={
    navigationBarTitleText: '兑换订单'
  }

  constructor(){
    super(...arguments)
    this.state = {
      logsList:[],
      start:0,
      showCode:false,
      isOpened:false,
      goldChangeVal:'',
      seeId:'',
      allLoadFlag:false
    }
  }

  componentWillMount() { //将要装载
    this.getLogs();
  }
  //黄金记录
  getLogs = async() => {
    let res= await goldLog({id:2,start:this.state.start,token:this.props.token});
    if(res.error_code!=0) return dialog.toast({title: res.message});
    res.data.forEach(item=> {    //回购信息显示
      item.backFlag = false;
    })
    this.setState({logsList:this.state.logsList.concat(res.data)});
    if(res.data.length<10){
      this.setState({allLoadFlag:true})
    }
  }

  transClick =(item,index)=>{
      for (let i=0;i<this.state.logsList.length;i++){
        if(index == i){
          this.state.logsList[index].backFlag = !this.state.logsList[index].backFlag;
          this.setState({logsList:this.state.logsList})
        }
      }
  }

  goBuyBack =(item)=>{
    Taro.navigateTo({url:`/app/pages/fruit/buyBack/index?id=${encodeURIComponent(item.id) + '&code=' + encodeURIComponent(item.code)}`})
  }

  onReachBottom(){
    if(this.state.allLoadFlag==false){
      this.setState(prevState=>{start:prevState.start++},()=>{
        this.getLogs();
      })
    }else{
      dialog.toast({title: '没有更多了'})
    }
  }


  //得到黄金兑换码
  submitOrder=async(val)=>{
    let res= await goldCode({id: 2,token:this.props.token,verify_code:val});
    this.setState({showCode:false});
    if(res.error_code!=0){
      return dialog.toast({title: res.message});
    }
    this.setState({isOpened:true,goldChangeVal:res.data})
  }

  copyClip=()=>{
    this.setState({isOpened:false})
    Taro.setClipboardData({data: this.state.goldChangeVal}).then(()=>{})
  }

  render(){
    return(
      <View className="goldRecord">
        <View className="recordW">
            <View className="recordUl">
              {
                this.state.logsList&&this.state.logsList.length?(this.state.logsList.map((item,index)=>{
                  return(
                    <View key={index} className="recordLi">
                       <View className="reName flex">
                          {item.code?
                            ( <View>卡密：{item.code.length>14?item.code.substring(item.code.length-14):item.code}
                                <Text className="see" onClick={()=>this.setState({showCode:true,seeId:item.id})}>查看</Text>
                              </View>):
                            ( <Text>卡密：— —</Text>)
                          }
                          {item.buyInfo?
                            ( <View>
                                {item.buyInfo.status==0?<Text>回购中</Text>:''}
                                {item.buyInfo.status==1?<Text>回购成功</Text>:''}
                                {item.buyInfo.status==2?<Text>回购取消</Text>:''}
                             </View>):(
                             <View >
                              {item.status==0?<Text>兑换中</Text>:''}
                              {item.status==1?<Text style={'color: #30CE84'}>兑换成功</Text>:''}
                              {item.status==2?<Text style={'color: #F23D3D'}>兑换失败</Text>:''}
                            </View>)
                          }
                      </View>

                      <View className="reInfoW">
                        <View className="reInfo">
                          <View className="infoInner">时间：{item.addDate}</View>
                          <View className="infoInner">数量：{item.weight + '张'}</View>
                          <View className="infoInner">水果卡价格：{filter.toDecimal2(item.repaymentAmount)}</View>
                          <View className="infoInner">服务费：{filter.toDecimal2(item.serviceFee)}</View>
                          <View className="total">合计：<Text className="price">{filter.toDecimal2(item.totalAmount)}</Text></View>
                        </View>
                        {(item.code && (item.buyInfo == null))?<View className="recover" onClick={()=>this.goBuyBack(item)}>立即回购</View>:''}
                        {item.buyInfo != null && item.buyInfo?
                          <View className="more">
                            <View className="gold-bnt-info" style={item.backFlag?'height:auto':'height:0'}>
                              <View className="bntInfo bntTop">银行卡号：{item.buyInfo.cardNum}</View>
                              <View className="bntInfo">开户行：{item.buyInfo.bank}</View>
                              <View className="backMoney">回购金额：{filter.toDecimal2(item.buyInfo.buyMoney)}</View>
                              <View className="bntInfo bntBottom">姓名：{item.buyInfo.name}</View>
                            </View>
                            <View className="gold-bnt" onClick={()=> this.transClick(item,index)}>
                              <View className='more-btn'>{item.backFlag?'收起': '展示完整信息'}
                                <View style={item.backFlag?'transform:rotate(180deg)':'transform:rotate(360deg)'}>
                                  <AtIcon value='chevron-down' size='15' color='#181A19'></AtIcon>
                                </View>
                              </View>
                            </View>
                          </View>:''
                        }
                      </View>
                    </View>
                  )
                })
                ): (<Image src={'https://mall.cocotc.cn/static/images/home/nothing.png'} className="notingImg"></Image>)
              }
            </View>
        </View>

        { this.state.showCode && <PayPassword isClosed onBack={() => this.setState({showCode: false})} onConfirm={(value) => this.submitOrder(value)}></PayPassword>}
          <AtModal isOpened={this.state.isOpened}>
            <AtModalContent>
              <View className="dig-title">您的黄金兑换码是：</View>
              <View className="dig-content">{this.state.goldChangeVal}</View>
            </AtModalContent>
            <AtModalAction>
              <Button onClick={()=>this.copyClip()}>复制</Button>
            </AtModalAction>
          </AtModal>
    </View>

    )
  }
}
