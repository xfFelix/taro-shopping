import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image, Input, Button } from '@tarojs/components'
import './index.scss'
import { dialog } from '@/util';
import { connect } from '@tarojs/redux'
import { charge, captcha } from '@/api'


@connect(({user}) => ({
  token: user.token
}))

export default class cardCharge extends Component {
  config ={
    navigationBarTitleText: '卡密充值',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
    this.state = {
      verifyCode: '',
      passWord:'',
      code:''
    }
  }

  componentWillMount(){
    this.getVerifyCode()
  }

  getVerifyCode = async () => {
    let res = await captcha()
    let url = ('data:image/png;base64,' + res).replace(/[\r\n]/g, "")
    this.setState({
      verifyCode: url
    })
  }

  async charge(){
    if(!this.state.passWord){
      return dialog.toast({title: '请输入卡密'});
    }
    if(!this.state.code){
      return dialog.toast({title: '请输入图片验证码!'});
    }
    let res = await charge({token:this.props.token,passwd:this.state.passWord,captcha:this.state.code});
    if(res.error_code==0){
      dialog.modal({content:'卡密充值成功！',showCancel:false}).then(
        info => {
          if(info){
            Taro.navigateTo({url:'pages/tab/Home/index'})
          }
        }
      );
    }else{
      dialog.modal({content:res.message,showCancel:false}).then(
        info => {
          if(info && res.error_code==2){
            this.getVerifyCode()
          }
        }
      );
    }
  }





  render(){
    return(
      <View className="chargeWrap">
        <View className="charge-content">

            <View className="chargeBanner">
              <Image src="https://mall.cocogc.cn/ticket/static/img/charge.3eca7cf8.png" alt="椰子积分" />
            </View>

            <View className="chargeInfo" >
              <View className="chargeUl">
                <View className="chargeViewLi">
                  <Text className="iconImg chargeli_01"></Text>
                  <Input placeholder={'卡密'} value={this.state.passWord} onInput={(e) => this.setState({passWord: e.target.value})}></Input>
                </View>
                <View className="chargeViewLi">
                    <Text className="iconImg chargeli_02"></Text>
                    <Input placeholder={'验证码'} value={this.state.code} onInput={(e) => this.setState({code: e.target.value})}></Input>
                    <Image src={this.state.verifyCode} className="img_captcha" onClick={() => this.getVerifyCode()}/>
                </View>
              </View>
              <View className="certBnt" onClick={() => this.charge()}>充值</View>
            </View>

          </View>
        </View>
    )
  }
}

