import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image, Input, Button } from '@tarojs/components'
import { INFO_URL } from '@/api/config'
import styles from './index.module.scss'
import { dialog, validate } from '@/util'
import { connect } from '@tarojs/redux'
import SelectLocation from '@/components/SelectLocation'

import openEye from '@/assets/img/login/eye-open.png'
import closeEye from '@/assets/img/login/eye-close.png'
import {getInfoSync, setTokenAsync} from "@/actions/user"

@connect(({login, user}) => ({
  login,
  user
}), dispatch => ({
  setToken: (data) => dispatch(setTokenAsync(data)),
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
    verifyCode: `${INFO_URL}/user/captcha?${new Date()}`,
    flag: true,
    nameLocationIndex: 0,
    showActionSheet: false,
    showPassword: true
  }

  getVerifyCode = () => {
    this.setState({
      verifyCode: `${INFO_URL}/user/captcha?${new Date()}`
    })
  }

  render() {
    return (
      <View className={styles.wrapper}>
        <Text className={styles.register} onClick={() => Taro.navigateTo({url: '../Register/index'})}>注册</Text>
        <Image src='../../assets/img/login/banner.png' className={styles.banner} />
        <View className={styles.container}>
          <View className={styles.item}>
            <Image className={`${styles.image} ${styles.tel}`} src={'../../assets/img/login/tel.png'} />
            <View className={styles.selectLocation} onClick={() => this.setState(preState => ({showActionSheet: !preState.showActionSheet}))}>
              <Text className={styles.locationName}>{this.props.login.locations[this.state.nameLocationIndex].label}</Text>
              <Image src={'../../assets/img/login/select.png'} className={!this.state.showActionSheet ? styles.locationImage : styles.selecting}/>
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
                <Image className={styles.image} src={'../../assets/img/login/verify.png'} />
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
                <Image className={styles.image} src={'../../assets/img/login/code.png'} />
                <Input
                  name='code'
                  type='number'
                  maxLength='6'
                  placeholder='请输入短信验证码'
                  value={this.state.code}
                  onInput={(e) => this.setState({code: e.detail.value})}
                />
                <Button className={styles.code} plain type='primary'>获取验证码</Button>
              </View>
            </View>) :
            (<View className={styles.item}>
              <Image className={styles.image} src={'../../assets/img/login/password.png'} />
              <Input
                name='pwd'
                type='text'
                password={this.state.showPassword ? true : false}
                placeholder='请输入登录密码'
                value={this.state.pwd}
                onInput={(e) => this.setState({pwd: e.detail.value})}
              />
              {
                this.state.pwd && <Image src={this.state.showPassword ? openEye : closeEye} className={styles.eye} onClick={() => this.setState(preState => ({ showPassword: !preState.showPassword }))}/>
              }
            </View>)
          }
        </View>
        <Button className={styles.confirm} onClick={this.validateRegister}>登录</Button>
        {
          this.state.flag ?
            <Text className={styles.login} onClick={() => this.setState(preState => ({flag: !preState.flag}))}>使用密码登录</Text> :
            <View className={styles.passwordType}>
              <Text className={styles.text} onClick={() => this.setState(preState => ({flag: !preState.flag}))}>使用短信登录</Text>
              <Text className={styles.text} onClick={() => Taro.navigateTo({url: '../ForgetPwd/index'})}>忘记密码?</Text>
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
        console.log(this.$router.params.redirect)
        Taro.switchTab({url: this.$router.params.redirect})
      }
    } catch (e) {
      dialog.toast({title: e})
    }
  }
}
