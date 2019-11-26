import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input,RichText} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog,filter} from "@/util/index";
import { getVipList,vipCostInfo,vipSubmit} from '../api';
import { AtInput} from 'taro-ui';
import Dialog from "@/components/dialog";
import ICON from '@/assets/img/tab/supermarket-actived.png'
import {productTypeFun,costTypeFun,productIdFun} from  "@/pages/vip/store/action"
import PayPassword from "@/components/PayPassword"
import {setParams} from "@/pages/success/store/action";


@connect(({user,vip}) => ({
  token: user.token,
  info: user.info,
  vip,
}), dispatch => ({
  setProductType: (data) => dispatch(productTypeFun(data)),
  setCostType:(data)=> dispatch(costTypeFun(data)),
  setProductId:(data)=> dispatch(productIdFun(data)),
  submit: (data) => dispatch(action.submitSync(data)),
  setParams: (data) => dispatch(setParams(data))
}))


export default class VipHome extends Component {
  config ={
    navigationBarTitleText: '会员卡券',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
    this.state = {
      inpNum:'',
      selectType:0,
      typeIndex:0,
      selectList:[],
      selectInfo:{},
      showInfo: false,
      showCode: false,
      number: '',
      rechargeType:''
    }
  }

  componentWillMount() { //将要装载
    this.getList();
  }


  handleChange=(value)=>{
    this.setState({inpNum:value})
  }

  //拿到列表信息
  getList = async()=>{
    let res= await getVipList({productType:this.props.vip.productType});
    if(res.code!=1) return dialog.toast({title: res.message});
    this.setState({selectList:res.data})
    this.props.setProductId(res.data[0][1][0].productId)
  }

  //立即兑换
  changeNow=async()=>{
    if(this.props.vip.costType==1&&this.state.inpNum=='') return;
    let res= await vipCostInfo({productId:this.props.vip.productId,token:this.props.token});
    if(res.code!=1) return dialog.toast({title: res.message});
    this.setState({selectInfo:res.data,showInfo:true});
  }

  //下单
  submitOrder=async(value)=>{
    let res= await vipSubmit({accountNo:this.state.inpNum, code:value, productId:this.props.vip.productId, token:this.props.token});
    if(res.code!=1) return dialog.toast({title: res.message});
    this.onClose();
    // 设置成功信息
    let params = {price: this.state.selectList.total, path:{ home: '/pages/vip/home/index', order: '/pages/vip/record/index'}}
    await this.props.setParams(params)
    Taro.redirectTo({url: '/pages/success/index'})
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

  //选择种类
  typeType=(item,index)=>{
    this.setState({selectType:index,typeIndex:0});
    this.props.setProductId(item[1][0].productId)
  }
  //选择面值
  faceType=(item,index)=>{
    this.props.setProductId(item.productId)
    this.setState({typeIndex:index});
  }

  changeWord(val){
    if(val){
      let str = val.replace(/<\/br>/g,'\r');
      return str
    }
  }

  render(){
    const {selectList, selectType, typeIndex, showCode, inpNum} = this.state
    return(
      <View className="vipCard">
        { this.props.vip.costType==1?
          (<View className="headTop">
            <View className="buy">
              <Image src={'https://mall.cocogc.cn/static/images/logo/jd.png'} className="logoGreen"></Image>
              <View className="input-flex">
                <AtInput
                  name='inpNum'
                  type='number'
                  value={inpNum}
                  placeholder="请输入账号"
                  onChange={this.handleChange.bind(this)}
                  border={false}
                />
              </View>
            </View>
          </View>):''
        }

        <View className="selectWrap">
          <View className="yezifen">椰子分余额：<Text className="score">{this.props.info.score}</Text></View>
          <View className="typeWrap">
            <View className="typeTitle">种类：</View>
              {
                selectList.map((items,indexs)=>{
                  return(
                    <View
                      key={indexs}
                      className={selectType==indexs?'select isSelect':'select noSelect'}
                      onClick={() =>this.typeType(items,indexs)}
                    >{items[0]}</View>
                  )
                })
              }
          </View>

          <View  className="faceWrap">
            <View className="faceTitle">面值：</View>
            {
              selectList[selectType] && selectList[selectType][1].map((item,index)=>{
                return(
                  <View key={index} className="faceInfo"  onClick={()=>this.faceType(item,index)}>
                      <View className={typeIndex==index?"faceOne isSelect":'faceOne noSelect'}>
                        <View className="faceType">{this.timeType(item.productType)}</View>
                        <View className="faceValue">售价：{filter.toDecimal2(item.sellingPrice)}</View>
                      </View>
                      <View className="faceMarket">刊例价：{filter.toDecimal2(item.marketPrice)}</View>
                    </View>
                )
              })
            }
          </View>

          <View  className="tipWrap">
            <View className="tipTitle">温馨提示：</View>
            <Text className="tipConten">{this.changeWord(this.state.selectList[this.state.selectType] && this.state.selectList[this.state.selectType][2])}</Text>
          </View>
        </View>

          <View
            className={(this.props.vip.costType==2||(this.props.vip.costType==1&& inpNum!=''))?'vipBnt bntCan':'vipBnt bntNo'}
            onClick={()=>this.changeNow()}>立即兑换
          </View>


         {
           this.state.showInfo && <Dialog
             renderHeader={<View>确认兑换</View>}
             renderFooter={<Button className="confirm" onClick={() => this.onShowCode()}>确认</Button>}
             onClose={() => this.onClose()}
             onBack={() => this.onClose()}
           >
            <View className="content">
              <View className="total">
                <Image src={ICON} className="icon"></Image>
                <Text>{filter.toDecimal2(this.state.selectInfo.total)}</Text>
              </View>
              <View className="flex">
                <Text className="name">产品名称</Text>
                <Text className="value">{this.state.selectInfo.productName}</Text>
              </View>
              {
                this.props.vip.costType==1 && <View className="flex">
                  <Text className="name">充值账号</Text>
                  <Text className="value">{this.state.inpNum}</Text>
                </View>
              }
              <View className="flex">
                <Text className="name">类型</Text>
                <Text className="value">{this.timeType(this.state.selectInfo.productType)}</Text>
              </View>
              <View className="flex">
                <Text className="name">售价</Text>
                <Text className="value">{filter.toDecimal2(this.state.selectInfo.sellingPrice)}</Text>
              </View>
              <View className="flex">
                <Text className="name">税费</Text>
                <Text className="value">{filter.toDecimal2(this.state.selectInfo.tax_total)}</Text>
              </View>
              <View className="flex">
                <Text className="name">应付合计</Text>
                <Text className="value">{filter.toDecimal2(this.state.selectInfo.total)}</Text>
              </View>
            </View>
          </Dialog>
        }
        { showCode && <PayPassword isClosed onBack={() => this.onShowInfo()} onConfirm={(val)=>this.submitOrder(val)}></PayPassword>}
      </View>
    )
  }


  onShowInfo = () => {
    this.setState({showInfo: true, showCode: false})
  }

  onShowCode = () => {
    this.setState({showInfo: false, showCode: true})
  }

  onClose = () => {
    this.setState({
      showInfo: false,
      showCode: false,
    })
  }
}
