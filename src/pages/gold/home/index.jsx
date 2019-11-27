import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input,Checkbox } from "@tarojs/components"
import './index.scss'
import { AtInput  } from 'taro-ui'
import GoldInfo from "@/pages/gold/home/components/goldinfo"
import { dialog, filter } from '@/util'


import {connect} from "@tarojs/redux"
import {goldTypeFun,barPriceFun,sandPriceFun} from "@/pages/gold/store/action"
import {goldPrice,goldTax,goldBuy} from '../api'
import PayPassword from "@/components/PayPassword";
import {setParams} from "@/pages/success/store/action";


@connect(({gold,user}) => ({
  gold,
  info: user.info,
  token: user.token,
}), dispatch => ({
  setGoldId: (data) => dispatch(goldTypeFun(data)),
  setBarPrice: (data) => dispatch(barPriceFun(data)),
  setSandPrice: (data) => dispatch(sandPriceFun(data)),
  setParams: (data) => dispatch(setParams(data))
}))


export default class GoldHome extends Component {
  config ={
    navigationBarTitleText: '黄金兑换'
  }

  constructor(){
    super(...arguments)
    this.getPrice =this.getPrice.bind(this),
    this.timer = null,
    this.tabList=[
      { id: 0, name: "金条", show:true },
      { id: 1, name: "金砂", show:true }
    ],
    this.state = {
      inpNum:'',
      timeInp:null,
      taxList:{
        amount:0,
        service_fee:0,
        tax_total:0,
        total:0
      },
      showCode:false,
      checked: false
    }
  }

  componentWillMount() { //将要装载
    this.getPrice();
  }

  tabChange=(id)=>{
    this.setState({inpNum:'',taxList:{}});
    this.props.setGoldId(id);
    this.getPrice();
  }

  //输入数量
  handleChange=(value,event)=>{
    if(event.type=="input"){
      this.setState({inpNum:value})
      if (this.timer){
        clearTimeout(this.timer);
      }
      if(value){
        this.timer=setTimeout(()=>{
          this.getTax(value);
        },500)
      }else{
        this.getTax(0);
      }
      return value
    }
  }

  //黄金价格
  getPrice = async() => {
    let res= await goldPrice({id: this.props.gold.id});
    if(res.error_code!=0) return dialog.toast({title: res.message})
    if(this.props.gold.id==0){
      this.props.setBarPrice(res.data.goldPrice)
    }else{
      this.props.setSandPrice(res.data.goldPrice)
    }
  }

  getTax= async(value) => {
    let res= await goldTax({amount:value,id: this.props.gold.id,token: this.props.token});
    if(res.error_code!=0) return dialog.toast({title: res.message});
    this.setState({taxList:res.data})
  }

  //下单
  submitOrder = async (val) => {
    try{
      this.setState({ showCode: false})
      let res= await goldBuy({token:this.props.token,amount:this.state.inpNum,verify_code:val,id:this.props.gold.id});
      if(res.error_code!=0) return dialog.toast({title: res.message});
      // 设置成功页面的展示信息
      let config = {price: res.data.totalAmount, path:{ home: '/pages/tab/Home/index', order: '/pages/gold/record/index'}}
      await this.props.setParams(config)
      Taro.redirectTo({url: '/pages/success/index'})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  changeNow = ()=>{
    if (!this.state.checked) return dialog.toast({title: '请阅读并同意协议'});
    this.state.inpNum&&this.state.checked?this.setState({showCode:true}):'';
  }

  render(){
    return (
      <View className="goldHome">
        <View className="goldBanner">
          <View className="goldSelect">
            {
              this.tabList.map((item,index)=>{
                return(
                  <Text
                  onClick={() => this.tabChange(item.id)}
                  key={item.id}
                  className={this.props.gold.id==index?"active tab":'tab'}
                  >
                  {item.name}</Text>
                )
              })
            }
          </View>

          <View className="compare">
            <View className="priceWrap">
              <View className="typeName">{this.props.gold.id==0?'今日金条价：':'今日金砂价：'}</View>
              <View className="priceInfo">
                <Text className="goldPrice">{this.props.gold.id==0?this.props.gold.barPrice:this.props.gold.sandPrice}</Text>
                <Text className="ratio">元/克</Text>
              </View>
            </View>
          </View>

          <View className="buy">
          <Image src={'https://mall.cocogc.cn/static/images/logo/jd.png'} className="logoGreen"></Image>
            <View className="input-flex">
              <AtInput
                name='inpNum'
                type='number'
                placeholder={this.props.gold.id==0?'1根起购，仅限整数':'1颗起购，仅限整数'}
                value={this.state.inpNum}
                onChange={this.handleChange.bind(this)}
                border={false}
              />
            </View>
            <Text className="unit">{this.props.gold.id==0?'根':'颗'}</Text>
            <Text className="explain">{this.props.gold.id==0?'(1根=10克)':'(1颗=0.2克)'}</Text>
          </View>
        </View>

        <View className="recodeWrap">
          <View className="score">
            <Text>积分余额：</Text> <Text className="score">{this.props.info.score}</Text>
          </View>
          <Text className="goRecode" onClick={()=>Taro.navigateTo({url:'/pages/gold/record/index'})}>兑换记录 ></Text>
        </View>

        <View className="msg">
          <View>金条价格<Text>{filter.toDecimal2(this.state.taxList.amount)}</Text></View>
          <View>服务费<Text>{filter.toDecimal2(this.state.taxList.service_fee)}</Text></View>
          <View>合计<Text>{filter.toDecimal2(this.state.taxList.total)}</Text></View>
        </View>

        <View className="agreeWrap">
            <Label className='checkbox-list__label'>
              <Checkbox className='checkbox-list__checkbox' checked={this.state.checked} onClick={()=>this.setState(pre => ({checked: !pre.checked}))}>
                <Text>我已阅读并同意</Text>
                <Text onClick={()=>Taro.navigateTo({url:'/pages/gold/protocol/index'})} className="file">《黄金兑换协议》</Text>
              </Checkbox>
            </Label>
        </View>

        <View className="goldBnt">
          <View className={this.state.inpNum?'goldBnt-left flex bntCan':'goldBnt-left flex bntNo'}
              onClick = {()=>this.changeNow()}>立即兑换
          </View>
          <View className="goldBnt-right flex" onClick={()=>Taro.navigateTo({url:'/pages/gold/record/index'})}>立即回购</View>
        </View>
        <Image src="https://tmall.cocogc.cn/static/images/goTop.png" className="goTop" onClick={()=>Taro.pageScrollTo({scrollTop:0})}></Image>
        <GoldInfo></GoldInfo>
        { this.state.showCode && <PayPassword isClosed onBack={() => this.setState({showCode:false})} onConfirm={(val)=>this.submitOrder(val)}></PayPassword>}
      </View>
    )
  }
}
