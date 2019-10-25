import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import './index.scss'
import { AtInput  } from 'taro-ui'
import GoldInfo from "@/pages/gold/home/components/goldinfo"


import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";
import {goldTypeFun,barPriceFun,sandPriceFun} from "@/pages/gold/store/action"

import {goldPrice,goldTax} from '../api'


@connect(({gold,user}) => ({
  gold,
  info: user.info,
  token: user.token,
}), dispatch => ({
  setGoldId: (data) => dispatch(goldTypeFun(data)),
  setBarPrice: (data) => dispatch(barPriceFun(data)),
  setSandPrice: (data) => dispatch(sandPriceFun(data)),
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
      taxList:{}
    }
  }

  componentWillMount() { //将要装载
    this.getPrice();
  }

  tabChange=(id)=>{
    this.props.setGoldId(id);
    this.getPrice();
  }

  //输入数量
  handleChange=(value,event)=>{
    this.setState({
      value
    })
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
            <Text>椰子分余额：</Text> <Text className="score">{this.props.info.score}</Text>
          </View>
          <Text className="goRecode" onClick={()=>Taro.navigateTo({url:'/pages/gold/record/index'})}>兑换记录 ></Text>
        </View>

        <View className="msg">
          <View>金条价格<Text>{this.state.taxList.amount}</Text></View>
          <View>服务费<Text>{this.state.taxList.service_fee}</Text></View>
          <View>税费<Text>{this.state.taxList.tax_total}</Text></View>
          <View>合计<Text>{this.state.taxList.total}</Text></View>
        </View>

        <View className="agreeWrap">
          <checkbox-group>
            <label className="checkLabel">
                <checkbox></checkbox>
                <Text>我已阅读并同意</Text>
                <Text onClick={()=>Taro.navigateTo({url:'/pages/gold/protocol/index'})} className="file">《黄金兑换协议》</Text>
            </label>
          </checkbox-group>
        </View>

        <GoldInfo></GoldInfo>
      </View>
    )
  }
}
