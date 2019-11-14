import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text, Input, Label, Checkbox, CheckboxGroup, Picker} from "@tarojs/components"
import { AtIcon } from 'taro-ui'
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog ,validate} from "@/util/index";
import {action} from '@/pages/protocol/store'
import {getOrderInfo, getPrice, submitApply} from "./api";
import PayPassword from "@/components/PayPassword"

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
    this.bankList = [
      { text: "邮储银行 " },
      { text: "浦发银行 " },
      { text: "工商银行 " },
      { text: "农业银行 " },
      { text: "中国银行 " },
      { text: "建设银行 " },
      { text: "交通银行 " },
      { text: "中信银行 " },
      { text: "光大银行 " },
      { text: "华夏银行 " },
      { text: "民生银行 " },
      { text: "平安银行 " },
      { text: "招商银行 " },
      { text: "兴业银行 " },
      { text: "上海银行 " },
      { text: "北京银行 " }
    ]
    this.state = {
      id: '',
      faceValue: '',
      orderNo: '',
      price: 0,
      idCard: '',
      name: '',
      number: '',
      pwd: '',
      bankNo: '',
      bankName: '',
      checked: true,
      showCode: false
    }
  }

  componentWillMount(): void {
    let id = this.$router.params.id
    this.setState({id}, () => {
      this.getOrderInfo()
    })
  }

  getOrderInfo = async() => {
    try {
      const {data} = await getOrderInfo({id: this.state.id, token: this.props.token})
      let res = await getPrice({faceValue: data.orderNum})
      let config = {price: res.data.discount_price, idCard: data.idNum, name: data.name, number: data.idBackUrl, pwd: data.memo, faceValue: data.orderNum, orderNo: data.idUrl}
      this.setState(config)
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  goProcotol = () => {
    this.props.setProtocol(this.props.protocol)
    Taro.navigateTo({url: '/pages/protocol/index'})
  }

  handlerChange = e => {
    this.setState({bankName: this.bankList[e.detail.value].text})
  }

  submitUp = () => {
    const { name, idCard, bankNo, bankName, checked } = this.state
    if (!name) return dialog.toast({title: '请输入姓名'})
    if (!idCard) return dialog.toast({title: '请输入身份证'})
    if (!bankNo) return dialog.toast({title: '请输入银行卡号'})
    if (!bankName) return dialog.toast({title: '请选择开户行'})
    if (!checked) return dialog.toast({title: '阅读并同意加油卡协议'})
    this.setState({showCode: true})
  }

  handlerConfirm = async (val) => {
    try {
      const { token } = this.props
      const {price, orderNo, faceValue, number, pwd, name, idCard, bankNo, bankName} = this.state
      let config = {token, code: val, orderNo, faceValue, salePrice: price, cardNum: number, cardPwd: pwd, userIdCard: idCard, userBankNo: bankNo, name, userBankName: bankName}
      await Taro.showLoading({mask: true, title: 'loading'})
      const { data } = await submitApply(config)
      await Taro.hideLoading()
      if (data) {
        await Taro.showToast({title: '成功',icon: 'success', duration: 2000})
        let currentPage = Taro.getCurrentPages().length
        Taro.navigateBack({delta: currentPage - 2})
      }
    } catch (e) {
      await Taro.hideLoading()
      dialog.toast({title: e.message})
    }
  }

  render(){
    return (
      <View className="goldBuyBack">
        <View className="back-info">
          <View className="money-wrap">
            回购金额:
            <View className="money-inner">
              <Text className="money">
                {this.state.price}
              </Text>
              <Text className="yuan">元</Text>
              <Text className="qmark" onClick={()=>this.setState({isOpened:true})}>?</Text>
            </View>
          </View>
          <View className="backLi">卡号<View>{this.state.number}</View></View>
          <View className="backLi">卡密<View>{this.state.pwd}</View></View>
          <View className="backLi">姓名<Input type="text" name="name" maxlength="10" placeholder="请输入姓名" value={this.state.name} onInput={(e) => this.setState({name: e.detail.value})} /></View>
          <View className="backLi">身份证号码<Input type="text" name="cardNum" maxlength="20" placeholder="请输入身份证号" value={this.state.idCard} onInput={(e) => this.setState({idCard: e.detail.value})}/></View>
          <View className="backLi">银行卡号<Input type="text" name="cardNum" maxlength="20" placeholder="请输入银行卡号" value={this.state.bankNo} onInput={(e) => this.setState({bankNo: e.detail.value})}/></View>
          <View className="backLi">开户行
            <Picker mode='selector' onChange={(e) => this.handlerChange(e)} rangeKey={'text'} range={this.bankList}>
              <View>{this.state.bankName|| '请选择开户行'}<AtIcon value='chevron-right' size='30' color='#ccc'></AtIcon></View>

            </Picker>
          </View>
        </View>

        <View className="agreeWrap">
           <CheckboxGroup onChange={() => this.setState(pre => ({checked:!pre.checked}))}>
              <Label className="checkLabel">
                  <Checkbox checked={this.state.checked}></Checkbox>
                  <Text>我已阅读并同意</Text>
                  <Text onClick={()=> this.goProcotol()} className="file">《加油卡回收协议》</Text>
              </Label>
           </CheckboxGroup>
        </View>

        <View class="needTime">1个工作日内到账，请耐心等待</View>

        <View className="submitUp" onClick={()=>this.submitUp()} >提交</View>
        {this.state.showCode &&
        <PayPassword
          isClosed
          onBack={() => this.setState({showCode: false})}
          onConfirm={(val) => this.handlerConfirm(val)}
        ></PayPassword>}
      </View>
    )
  }
}
