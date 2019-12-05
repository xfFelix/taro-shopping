import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text, Input} from "@tarojs/components"
import { AtInput ,AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog ,validate ,filter} from "@/util/index";
import {goldTypeFun,barPriceFun,sandPriceFun} from "@/pages/gold/store/action"
import {goldbuyback} from '../api';
import PayPassword from "@/components/PayPassword";



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
      mobile:this.props.info?this.props.info.userName:'',
      realName:this.props.info?this.props.info.realName:'',
      cardNum:'',
      bank:'',
      subBank:'',
      checked: false,
      isOpened:false,
      showCode:false
    }
  }

  submitOrder = async (val) => {
    try{
      this.setState({ showCode: false});
      const {mobile, realName,cardNum, bank, subBank}=this.state;
      let res = await goldbuyback({
        token: this.props.token,
        mobile: mobile,
        bank: bank,
        subBank: subBank,
        realName: realName,
        cardNum: cardNum,
        id: this.props.backInfo.type,
        cardId:this.props.backInfo.cardId,
        verify_code: val,
      });
      if(res.error_code!=0) return dialog.toast({title: res.message});
      dialog.modal({content:res.message,showCancel:false}).then(
        res => {
          if(res){
            let currentPage = Taro.getCurrentPages().length
            Taro.navigateBack({delta: currentPage - 2})
          }
        }
      );
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }


  submitUp=()=>{
    const {mobile, realName,cardNum, bank, subBank,checked}=this.state;
    console.log(this.state);
    console.log(mobile, realName,cardNum, bank, subBank,checked)
    if (!mobile || !validate.IsMobile(mobile)) return dialog.toast({title: '请输入正确手机号'})
    if (!realName) return dialog.toast({title: '请输入真实姓名！'})
    if (!cardNum) return dialog.toast({title: '请输入有效的银行账号！'})
    if (!bank) return dialog.toast({title: '请输入开卡银行！'})
    if (!subBank) return dialog.toast({title: '请输入分行信息！'});
    if (!this.state.checked) return dialog.toast({title: '请阅读并同意协议'});
    this.setState({showCode:true})
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
                  filter.toDecimal2((this.props.backInfo.barPrice-20)*this.props.backInfo.weight):
                  filter.toDecimal2((this.props.backInfo.sandPrice-21)*this.props.backInfo.weight)
                }
              </Text>
              <Text className="yuan">元</Text>
              <Text className="qmark" onClick={()=>this.setState({isOpened:true})}>?</Text>
            </View>
          </View>
          <View className="backLi">卡密<Input type="text" name="code" maxlength="14" placeholder="请输入兑换码"  disabled value={this.props.backInfo.cardCode}/></View>
          <View className="backLi">联系电话<Input type="text" name="mobile" maxlength="12" placeholder="请输入联系人电话" value={this.state.mobile}  onInput={(e) => this.setState({mobile: e.detail.value})}/></View>
          <View className="backLi">姓名<Input type="text" name="name" maxlength="10" placeholder="请输入户主姓名" value={this.state.realName} onInput={(e) => this.setState({realName: e.detail.value})} /></View>
          <View className="backLi">银行卡号<Input type="text" name="cardNum" maxlength="20" placeholder="请输入银行卡号" value={this.state.cardNum} onInput={(e) => this.setState({cardNum: e.detail.value})}/></View>
          <View className="backLi">开户行<Input type="text" name="bank" maxlength="20" placeholder="请输入开卡银行" value={this.state.bank} onInput={(e) => this.setState({bank: e.detail.value})} /></View>
          <View className="backLi">开户支行<Input type="text" name="subBank" maxlength="20" placeholder="请输入开户支行" value={this.state.subBank}  onInput={(e) => this.setState({subBank: e.detail.value})}/></View>
        </View>

        <View className="agreeWrap">
          <Label className='checkbox-list__label'>
              <Checkbox className='checkbox-list__checkbox' checked={this.state.checked} onClick={()=>this.setState(pre => ({checked: !pre.checked}))}>
                <Text>我已阅读并同意</Text>
                <Text onClick={()=>Taro.navigateTo({url:'/pages/gold/protocol/back'})} className="file">《黄金回购协议》</Text>
              </Checkbox>
            </Label>
        </View>

        <View class="needTime">1-3个工作日内到账，请耐心等待</View>
        <View className="submitUp" onClick={()=>this.submitUp()} >提交</View>
        { this.state.showCode && <PayPassword isClosed onBack={() => this.setState({showCode: false})} onConfirm={(value) => this.submitOrder(value)}></PayPassword>}
           <AtModal isOpened={this.state.isOpened} closeOnClickOverlay={false}>
            <AtModalHeader>回购说明</AtModalHeader>
            <AtModalContent>
              <View>本服务由深圳市金宇阳光文化发展有限公司提供。</View>
              <View>回购价格=基础金价-3元/克，基础金价为上海黄金交易所Au99.99当日开盘价。</View>
            </AtModalContent>
            <AtModalAction><Button onClick={()=>this.setState({isOpened:false})}>确定</Button> </AtModalAction>
          </AtModal>
      </View>
    )
  }
}
