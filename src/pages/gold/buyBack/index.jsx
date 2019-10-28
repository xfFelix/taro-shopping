import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text, Input} from "@tarojs/components"
import { AtInput  } from 'taro-ui'
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog ,validate} from "@/util/index";
import {goldTypeFun,barPriceFun,sandPriceFun} from "@/pages/gold/store/action"
import {goldbuyback} from '../api'



@connect(({gold,user}) => ({
  gold,
  info: user.info,
  token: user.token,
  backInfo:gold.backInfo
}), dispatch => ({
  setGoldId: (data) => dispatch(goldTypeFun(data)),
  setBarPrice: (data) => dispatch(barPriceFun(data)),
  setSandPrice: (data) => dispatch(sandPriceFun(data)),
}))


export default class GoldBuyBack extends Component {
  config ={
    navigationBarTitleText: '黄金回购'
  }

  constructor(){
    super(...arguments)
    this.state = {
      mobile:this.props.info.userName,
      realName:this.props.info.realName,
      cardNum:'',
      bank:'',
      subBank:'',
      check:false,
      verify_code:''
    }
  }


  //黄金回购
  buyGold = async() => {
    let res= await goldbuyback({
      token: this.getToken,
      mobile: this.inpInfo.mobile,
      bank: this.inpInfo.bank,
      subBank: this.inpInfo.subBank,
      realName: this.inpInfo.name,
      cardNum: this.inpInfo.cardNum,
      id: this.backInfo.type,
      cardId:this.backInfo.cardId,
      verify_code: val,
    });
    if(res.error_code!=0) return dialog.toast({title: res.message});
  }

  submitUp=()=>{

    const{mobile, realName,cardNum, bank, subBank,check}=this.state;
    console.log(check)
    if (!mobile || !validate.IsMobile(mobile)) return dialog.toast({title: '请输入正确手机号'})
    if (!realName) return dialog.toast({title: '请输入真实姓名！'})
    if (!cardNum) return dialog.toast({title: '请输入有效的银行账号！'})
    if (!bank) return dialog.toast({title: '请输入开卡银行！'})
    if (!subBank) return dialog.toast({title: '请输入分行信息！'})
  }

  checkboxChange=(e)=>{
    console.log(e)
  }

  render(){
    return (
      <View className="goldBuyBack">
        <View className="back-info">
          <View className="money-wrap">
            回购金额:
            <View className="money-inner">
              <Text className="money">
                {this.props.backInfo.type==0?
                  ((this.props.backInfo.barPrice-20)*this.props.backInfo.weight):
                  ((this.props.backInfo.sandPrice-21)*this.props.backInfo.weight)
                }
              </Text>
              <Text className="yuan">元</Text>
              <Text className="qmark">?</Text>
            </View>
          </View>
          <View className="backLi">卡密<Input type="text" name="code" maxlength="14" placeholder="请输入兑换码"  disabled value={this.props.backInfo.cardCode}/></View>
          <View className="backLi">联系电话<Input type="text" name="mobile" maxlength="12" placeholder="请输入联系人电话" value={this.state.mobile}  onChange={(e) => this.setState({mobile: e.detail.value})}/></View>
          <View className="backLi">姓名<Input type="text" name="name" maxlength="10" placeholder="请输入户主姓名" value={this.state.realName} onChange={(e) => this.setState({realName: e.detail.value})} /></View>
          <View className="backLi">银行卡号<Input type="text" name="cardNum" maxlength="20" placeholder="请输入银行卡号" value={this.state.cardNum} onChange={(e) => this.setState({cardNum: e.detail.value})}/></View>
          <View className="backLi">开户行<Input type="text" name="bank" maxlength="20" placeholder="请输入开卡银行" value={this.state.bank} onChange={(e) => this.setState({bank: e.detail.value})} /></View>
          <View className="backLi">开户支行<Input type="text" name="subBank" maxlength="20" placeholder="请输入开户支行" value={this.props.info.subBank}  onChange={(e) => this.setState({subBank: e.detail.value})}/></View>
        </View>

        <View className="agreeWrap">
          {/* <checkbox-group> */}
            <label className="checkLabel" >
                <checkbox onChange = {this.setState({check:this.state.check})} checked={this.state.check} > </checkbox>
                <Text>我已阅读并同意</Text>
                <Text onClick={()=>Taro.navigateTo({url:'/pages/gold/protocol/back'})} className="file">《黄金回购协议》</Text>
            </label>
          {/* </checkbox-group> */}
        </View>

        <View class="needTime">1-3个工作日内到账，请耐心等待</View>

        <View className="submitUp" onClick={()=>this.submitUp()} >提交</View>

      </View>
    )
  }
}