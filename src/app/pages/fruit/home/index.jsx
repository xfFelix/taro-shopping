import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input,Checkbox } from "@tarojs/components"
import './index.scss'
import { AtInput  } from 'taro-ui'
import GoldInfo from "./components/goldinfo"
import { dialog, filter } from '@/util'
import {connect} from "@tarojs/redux"
import {goldPrice,goldTax,goldBuy} from '../api'
import PayPassword from "@/components/PayPassword";
import {setParams} from "@/pages/success/store/action";
import * as protocolAction from "@/pages/protocol/store/action"

@connect(({user, fruit}) => ({
  fruit,
  info: user.info,
  token: user.token,
}), dispatch => ({
  setParams: (data) => dispatch(setParams(data)),
  getContentSync: (data) => dispatch(protocolAction.getContentSync(data))
}))


export default class FruitHome extends Component {
  config ={
    navigationBarTitleText: '水果兑换',
  }

  constructor(){
    super(...arguments)
    this.timer = null,
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

  getTax= async(value) => {
    let res= await goldTax({amount:value,id: 2,token: this.props.token});
    if(res.error_code!=0) return dialog.toast({title: res.message});
    this.setState({taxList:res.data})
  }

  //下单
  submitOrder = async (val) => {
    try{
      this.setState({ showCode: false})
      let res= await goldBuy({token:this.props.token,amount:this.state.inpNum,verify_code:val, id:2});
      this.setState({inpNum: ''})
      this.getTax(0)
      // 设置成功页面的展示信息
      let config = {price: res.data.totalAmount, path:{ home: '/app/pages/fruit/home/index', order: '/app/pages/fruit/record/index'}}
      await this.props.setParams(config)
      Taro.navigateTo({url: '/pages/success/index'})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  changeNow = ()=>{
    const {taxList} = this.state
    const { info } = this.props
    if (!this.state.checked) return dialog.toast({title: '请阅读并同意协议'})
    if (+this.state.inpNum < 6) return dialog.toast({title: '至少为6张'})
    if (info.score < taxList.total) return dialog.toast({title: '积分余额不足'})
    this.state.inpNum&&this.state.checked?this.setState({showCode:true}):'';
  }

  goProtocol = () => {
    const { fruit, getContentSync } = this.props
    getContentSync(fruit.protocol)
    Taro.navigateTo({url: '/pages/protocol/index'})
  }

  goRecord = () => {
    this.setState({inpNum: ''})
    this.getTax(0)
    Taro.navigateTo({url:'/app/pages/fruit/record/index'})
  }

  render(){
    return (
      <View className="goldHome">
        <View className="goldBanner">
          <View className="compare">
            <Image src={'https://mall.cocotc.cn/ticket/static/img/banner.c88fa731.png'} className="fruit_home_banner"></Image>
          </View>

          <View className="buy">
          <Image src={'https://mall.cocotc.cn/static/images/cart/icon.png'} className="logoGreen"></Image>
            <View className="input-flex">
              <AtInput
                name='inpNum'
                type='number'
                placeholder={'购买数量'}
                value={this.state.inpNum}
                onChange={this.handleChange.bind(this)}
                border={false}
              />
            </View>
            <Text className="unit">{'张'}</Text>
            <Text className="explain">{'(6张起购，仅限整数)'}</Text>
          </View>
        </View>

        <View className="recodeWrap">
          <View className="goRecode">
            <Text>积分余额：</Text> <Text className="score">{this.props.info.score}</Text>
          </View>
          <Text className="goRecode" onClick={()=>this.goRecord()}>兑换记录 ></Text>
        </View>

        <View className="msg">
          <View>售价<Text>100元/张</Text></View>
          <View>服务费<Text>{filter.toDecimal2(this.state.taxList.service_fee)}</Text></View>
          <View>合计<Text style={'color: red;'}>{filter.toDecimal2(this.state.taxList.total)}</Text></View>
        </View>

        <View className="agreeWrap">
            <Label className='checkbox-list__label'>
              <Checkbox className='checkbox-list__checkbox' checked={this.state.checked} onClick={()=>this.setState(pre => ({checked: !pre.checked}))}>
                <Text>我已阅读并同意</Text>
                <Text onClick={()=>this.goProtocol()} className="file">《水果回购协议》</Text>
              </Checkbox>
            </Label>
        </View>

        <View className="goldBnt">
          <View className="goldBnt-right flex" onClick={()=>this.goRecord()}>立即回购</View>
          <View
            className={this.state.inpNum?'goldBnt-left flex bntCan':'goldBnt-left flex bntNo'}
            onClick={()=>this.changeNow()}>立即兑换
          </View>
        </View>
        <Image src="https://tmall.cocogc.cn/static/images/goTop.png" className="goTop" onClick={()=>Taro.pageScrollTo({scrollTop:0})}></Image>
        <GoldInfo></GoldInfo>
        { this.state.showCode && <PayPassword isClosed onBack={() => this.setState({showCode:false})} onConfirm={(val)=>this.submitOrder(val)}></PayPassword>}
      </View>
    )
  }
}
