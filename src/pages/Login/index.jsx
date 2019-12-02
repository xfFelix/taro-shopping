import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image, Input, Button } from '@tarojs/components'
import { INFO_URL } from '@/api/config'
import styles from './index.module.scss'
import { dialog, validate } from '@/util'
import { connect } from '@tarojs/redux'
import SelectLocation from '@/components/SelectLocation'
import { sms, captcha, loginByWechat } from '@/api'
import {getInfoSync, setTokenAsync, setToken} from "@/actions/user"
import SendCode from "@/components/SendCode"

@connect(({login, user}) => ({
  login,
  user
}), dispatch => ({
  setToken: (data) => dispatch(setTokenAsync(data)),
  setTokenSync: (data) => dispatch(setToken(data)),
  getInfo: (token) => dispatch(getInfoSync(token))
}))
export default class Login extends Component {

  config ={
    navigationBarTitleText: '登录'
  }

  state = {
    name: '',
    verify: '',
    code: '',
    pwd: '',
    verifyCode: '',
    flag: true,
    nameLocationIndex: 0,
    showActionSheet: false,
    showPassword: true,
  }

  componentWillMount(): void {
    this.getVerifyCode()
  }

  getVerifyCode = async () => {
    let res = await captcha()
    let url = ('data:image/png;base64,' + res).replace(/[\r\n]/g, "")
    this.setState({
      verifyCode: url
    })
  }

  getWxLogin = () => {
    const { getInfo, setTokenSync } = this.props
    try {
      Taro.showLoading({mask: true})
      Taro.login({
        success(res) {
          let code = res.code
          if (code) {
            loginByWechat({jsCode: code}).then(({error_code, data, message}) => {
              if (+error_code === 12) {
                Taro.redirectTo({url: '/pages/bindTel/index?id=' + data.openId})
              } else if(+error_code === 0) {
                Promise.all([
                  setTokenSync(data.token),
                  getInfo(data.token)
                ]).then(r => {
                  Taro.switchTab({url: '/pages/tab/Home/index'})
                })
              } else {
                dialog.toast({title: message})
              }
            }).catch(e => {
              dialog.toast({title: e.message})
            })
          } else {
            dialog.toast({title: '登录失败！' + res.errMsg})
          }
        },
        complete() {
          Taro.hideLoading()
        }
      })
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  render() {
    return (
      <View className={styles.wrapper}>
        {/*<Text className={styles.register} onClick={() => Taro.navigateTo({url: '../Register/index'})}>注册</Text>*/}
        <Image src='https://mall.cocotc.cn/static/images/regist.png' className={styles.banner} />
        <View className={styles.container}>
          <View className={styles.item}>
            <Image className={`${styles.image} ${styles.tel}`} src={'https://mall.cocotc.cn/static/images/login-tel.png'} />
            <View className={styles.selectLocation} onClick={() => this.setState(preState => ({showActionSheet: !preState.showActionSheet}))}>
              <Text className={styles.locationName}>{this.props.login.locations[this.state.nameLocationIndex].label}</Text>
              <Image src={'https://tmall.cocogc.cn/static/images/select.png'} className={!this.state.showActionSheet ? styles.locationImage : styles.selecting}/>
            </View>
            <Input
              name='name'
              type='number'
              placeholder='请输入登录手机号'
              value={this.state.name}
              onInput={(e) => this.setState({name: e.detail.value})}
            />
          </View>
          {
            this.state.flag ?
            (<View>
              <View className={styles.item}>
                <Image className={styles.image} src={'https://mall.cocotc.cn/static/images/login-vail.png'} />
                <Input
                  name='verify'
                  type='text'
                  maxLength='4'
                  placeholder='请输入图片验证码'
                  value={this.state.verify}
                  onInput={(e) => this.setState({verify: e.detail.value})}
                />
                <Image src={this.state.verifyCode} className={styles.verify} onClick={() => this.getVerifyCode()}/>
              </View>
              <View className={styles.item}>
                <Image className={styles.image} src={'https://mall.cocotc.cn/static/images/login-msg.png'} />
                <Input
                  name='code'
                  type='number'
                  maxLength='6'
                  placeholder='请输入短信验证码'
                  value={this.state.code}
                  onInput={(e) => this.setState({code: e.detail.value})}
                />
                <SendCode name={this.state.name} verify={this.state.verify} nameLocationIndex={this.state.nameLocationIndex}></SendCode>
              </View>
            </View>) :
            (<View className={styles.item}>
              <Image className={styles.image} src={'https://mall.cocotc.cn/static/images/login-password.png'} />
              <Input
                name='pwd'
                type='text'
                password={this.state.showPassword ? true : false}
                placeholder='请输入登录密码'
                value={this.state.pwd}
                onInput={(e) => this.setState({pwd: e.detail.value})}
              />
              {
                this.state.pwd && <Image src={this.state.showPassword ? 'https://tmall.cocogc.cn/static/images/eye-open.png' : 'https://tmall.cocogc.cn/static/images/eye-close.png'} className={styles.eye} onClick={() => this.setState(preState => ({ showPassword: !preState.showPassword }))}/>
              }
              <Text className={styles.text} onClick={() => Taro.navigateTo({url: '../ForgetPwd/index'})}>忘记密码?</Text>
            </View>)
          }
        </View>
        <Button className={styles.confirm} onClick={this.validateRegister}>登录</Button>
        {
          this.state.flag ?
            <View className={styles.passwordType}>
              <Text className={styles.text} onClick={() => this.setState(preState => ({flag: !preState.flag}))}>使用密码登录</Text>
              <Text className={styles.text} onClick={() => this.getWxLogin()}>使用微信登录</Text>
            </View> :
            <View className={styles.passwordType}>
              <Text className={styles.text} onClick={() => this.setState(preState => ({flag: !preState.flag}))}>使用短信登录</Text>
              <Text className={styles.text} onClick={() => this.getWxLogin()}>使用微信登录</Text>
            </View>
        }
        <SelectLocation
          list={this.props.login.locations}
          show={this.state.showActionSheet}
          closeSheet={() => this.setState({showActionSheet: false})}
          onClick={(index) => this.setMobileLocation(index)}
        />
      </View>
    )
  }

  setMobileLocation = (index) => {
    this.setState({
      nameLocationIndex: index,
      showActionSheet: false
    })
  }

  validateRegister = () => {
    const { code, verify, name, pwd } = this.state
    if (!name || !validate.IsMobile(name)) return dialog.toast({title: '请输入正确手机号'})
    if (!this.state.nameLocationIndex && !validate.IsChinaMobile(name)) return dialog.toast({title: '请输入大陆手机号'})
    if (this.state.nameLocationIndex && !validate.IsHKMobile(name)) return dialog.toast({title:'请输入香港手机号'})
    if (this.state.flag) {
      if (!verify) return dialog.toast({title: '请输入图片验证码'})
      if (!code) return dialog.toast({title: '请输入短信验证码'})
    } else {
      if (!pwd) return dialog.toast({title: '请输入密码'})
    }
    this.login(name, code, pwd)
  }

  login = async (name, code, pwd) => {
    try {
      const { setToken, getInfo } = this.props
      await setToken({mobile: name, verify_code: code, passwd: pwd})
      if (this.props.user.token) {
        await getInfo(this.props.user.token)
        let redirect = this.$router.params.redirect
        if (!redirect) {
          Taro.switchTab({url: '/pages/tab/Home/index'})
        } else {
          Taro.switchTab({url: redirect})
        }
      }
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }
}
