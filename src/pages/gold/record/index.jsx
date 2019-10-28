import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";
import {backInfoFun} from "@/pages/gold/store/action"
import {goldLog,goldPrice} from '../api'

@connect(({gold,user}) => ({
  gold,
  info: user.info,
  token: user.token,
  backInfo:gold.backInfo
}), dispatch => ({
  setBackInfo: (data) => dispatch(backInfoFun(data)),
}))


export default class GoldRecord extends Component {
  config ={
    navigationBarTitleText: '兑换记录'
  }

  constructor(){
    super(...arguments)
    this.selectList=[
      {id:0,name:"金条"},
      {id:1,name:"金砂"}
    ],
    this.state = {
      logsList:[],
      start:0
    }
  }

  selectType(id){
    this.props.setBackInfo({type:id});
    this.setState({logsList:[],start:0},()=>{
      this.getLogs();
    });
  }

  componentWillMount() { //将要装载
    this.getLogs();
    this.getPrice(1)
    this.getPrice(0)
  }
  //黄金价格
  getPrice = async(type) => {
    let res= await goldPrice({id: type});
    if(res.error_code!=0) return dialog.toast({title: res.message})
    if(type==0){
      this.props.setBackInfo({barPrice:res.data.goldPrice})
    }else{
      this.props.setBackInfo({sandPrice:res.data.goldPrice})
    }
  }
  //黄金记录
  getLogs = async() => {
    let res= await goldLog({id:this.props.backInfo.type,start:this.state.start,token:this.props.token});
    if(res.error_code!=0) return dialog.toast({title: res.message});
    res.data.forEach(item=> {    //回购信息显示
      item.backFlag = false;
    })
    this.setState({logsList:this.state.logsList.concat(res.data)});
    if(res.data.length<10){
      dialog.toast({title: '没有更多了'})
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
    this.props.setBackInfo({cardId:item.id,cardCode:item.code,weight:item.weight});
    Taro.navigateTo({url:'/pages/gold/buyBack/index'})
  }



  onReachBottom(){
    this.setState(prevState=>{start:prevState.start++},()=>{
      this.getLogs();
    })
  }

  render(){
    return(
      <View>
        <View className="headFixed">
            <View className="selectWrap">
              {
                this.selectList.map((item,index)=>{
                  return (
                    <View
                      className={this.props.backInfo.type==index?'selectOne selectActive':'selectOne'}
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
                this.state.logsList.map((item,index)=>{
                  return(
                    <View key={index} className="recordLi">
                       <View className="reName flex">
                          {item.code?
                            (<View>卡密：{item.code.length>14?item.code.substring(item.code.length-14):item.code}</View>):
                            (<Text>卡密：— —</Text>)
                          }
                          {item.buyInfo?
                            ( <View>
                                {item.buyInfo.status==0?<Text>回收中</Text>:''}
                                {item.buyInfo.status==1?<Text>回收成功</Text>:''}
                                {item.buyInfo.status==2?<Text>回收取消</Text>:''}
                             </View>):(
                             <View >
                              {item.status==0?<Text>兑换中</Text>:''}
                              {item.status==1?<Text>兑换成功</Text>:''}
                              {item.status==2?<Text>兑换失败</Text>:''}
                            </View>)
                          }
                      </View>

                      <View className="reInfoW">
                        <View className="reInfo">
                          <View className="infoInner">时间：{item.addDate}</View>
                          <View className="infoInner">数量：{this.props.backInfo.type==0?Math.round(item.weight/10)+'根':Math.round(item.weight/0.2)+'颗'}</View>
                          <View className="infoInner">{this.props.backInfo.type==0?'金条价格':'金砂价格'}：{item.repaymentAmount}</View>
                          <View className="infoInner">服务费：{item.serviceFee}</View>
                          <View className="infoInner">税费：{item.taxFee}</View>
                          <View className="total">合计：{item.totalAmount}</View>
                        </View>
                        {(item.code && (item.buyInfo == null))?<View className="recover" onClick={()=>this.goBuyBack(item)}>立即回购</View>:''}
                        {item.buyInfo != null && item.buyInfo?
                          <View>
                            <View className="gold-bnt-info" style={item.backFlag?'height:auto':'height:0'}>
                              <View className="bntInfo bntTop">银行卡号：{item.buyInfo.cardNum}</View>
                              <View className="bntInfo">开户行：{item.buyInfo.bank}</View>
                              <View className="backMoney">回购金额：{item.buyInfo.goldPrice*item.weight}</View>
                              <View className="bntInfo bntBottom">姓名：{item.buyInfo.name}</View>
                            </View>
                            <View className="gold-bnt" onClick={()=> this.transClick(item,index)}>
                              <Image
                                className="moreIcon"
                                src={'https://mall.cocogc.cn/static/images/logo/jd.png'}
                                style={item.backFlag?'transform:rotate(180deg)':'transform:rotate(360deg)'}
                                >
                              </Image>
                            </View>
                          </View>:''
                        }
                      </View>
                    </View>
                  )
                })
              }
            </View>
        </View>
    </View>

    )
  }
}
