import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text, Input, Label} from "@tarojs/components"
import { AtInput ,AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog ,validate} from "@/util/index";
import {action} from '@/pages/protocol/store'

@connect(({oil,user}) => ({
  token: user.token,
  info: user.info,
  protocol: oil.protocol
}), dispatch => ({
  setProtocol: (data) => dispatch(action.getContentSync(data))
}))


export default class GoldBuyBack extends Component {
  config ={
    navigationBarTitleText: '回收申请',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#373C48'
  }

  constructor(){
    super(...arguments)
    this.state = {
      mobile:this.props.info?this.props.info.userName:'',
      realName:this.props.info?this.props.info.realName:'',
      cardNum:'',
      bank:'',
      subBank:'',
      check:false,
      verify_code:'',
      isOpened:false
    }
  }


  //黄金回购
  buyGold = async() => {
    const {mobile, realName,cardNum, bank, subBank,verify_code}=this.state;
    let res= await goldbuyback({
      token: this.props.token,
      mobile: mobile,
      bank: bank,
      subBank: subBank,
      realName: realName,
      cardNum: cardNum,
      id: this.props.backInfo.type,
      cardId:this.props.backInfo.cardId,
      verify_code: verify_code,
    });
    if(res.error_code!=0) return dialog.toast({title: res.message});
  }

  submitUp=()=>{
    const {mobile, realName,cardNum, bank, subBank,check}=this.state;
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

  goProcotol = () => {
    this.props.setProtocol(this.props.protocol)
    Taro.navigateTo({url: '/pages/protocol/index'})
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
              <Text className="qmark" onClick={()=>this.setState({isOpened:true})}>?</Text>
            </View>
          </View>
          <View className="backLi">卡号<Input type="text" name="mobile" maxlength="12" placeholder="请输入联系人电话" value={this.state.mobile}  onChange={(e) => this.setState({mobile: e.detail.value})}/></View>
          <View className="backLi">卡密<Input type="text" name="code" maxlength="14" placeholder="请输入兑换码"  disabled value={this.props.backInfo.cardCode}/></View>
          <View className="backLi">姓名<Input type="text" name="name" maxlength="10" placeholder="请输入户主姓名" value={this.state.realName} onChange={(e) => this.setState({realName: e.detail.value})} /></View>
          <View className="backLi">身份证号码<Input type="text" name="cardNum" maxlength="20" placeholder="请输入银行卡号" value={this.state.cardNum} onChange={(e) => this.setState({cardNum: e.detail.value})}/></View>
          <View className="backLi">银行卡号<Input type="text" name="cardNum" maxlength="20" placeholder="请输入银行卡号" value={this.state.cardNum} onChange={(e) => this.setState({cardNum: e.detail.value})}/></View>
          <View className="backLi">开户行<Input type="text" name="bank" maxlength="20" placeholder="请输入开卡银行" value={this.state.bank} onChange={(e) => this.setState({bank: e.detail.value})} /></View>
        </View>

        <View className="agreeWrap">
          {/* <checkbox-group> */}
            <Label className="checkLabel" >
                <checkbox onChange={this.setState({check:this.state.check})} checked={this.state.check} > </checkbox>
                <Text>我已阅读并同意</Text>
                <Text onClick={()=> this.goProcotol()} className="file">《加油卡回收协议》</Text>
            </Label>
          {/* </checkbox-group> */}
        </View>

        <View class="needTime">1-3个工作日内到账，请耐心等待</View>

        <View className="submitUp" onClick={()=>this.submitUp()} >提交</View>

          {/* <AtModal isOpened={this.state.isOpened} closeOnClickOverlay={false}>
            <AtModalHeader>回购说明</AtModalHeader>
            <AtModalContent>
              <View>本服务由深圳市金宇阳光文化发展有限公司提供。</View>
              <View>回购价格=基础金价-3元/克，基础金价为上海黄金交易所Au99.99当日开盘价。</View>
            </AtModalContent>
            <AtModalAction><Button onClick={()=>this.setState({isOpened:false})}>确定</Button> </AtModalAction>
          </AtModal> */}
      </View>
    )
  }
}
