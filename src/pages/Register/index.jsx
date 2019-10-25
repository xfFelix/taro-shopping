import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image, Input, Button } from '@tarojs/components'
import { INFO_URL } from '@/api/config'
import { register } from '@/api'
import styles from './index.module.scss'
import { dialog, validate } from '@/util'
import { connect } from '@tarojs/redux'
import SelectLocation from '@/components/SelectLocation'
@connect(({login}) => ({
  login
}))
export default class Register extends Component {

  config ={
    navigationBarTitleText: '注册'
  }

  state = {
    name: '',
    verify: '',
    code: '',
    pwd: '',
    verifyCode: `${INFO_URL}/user/captcha?${new Date()}`,
    flag: true,
    nameLocationIndex: 0,
    showActionSheet: false
  }

  getVerifyCode = () => {
    this.setState({
      verifyCode: `${INFO_URL}/user/captcha?${new Date()}`
    })
  }

  render() {
    return (
      <View className={styles.wrapper}>
        <Image src='https://mall.cocotc.cn/static/images/regist.png' className={styles.banner} />
        <View className={styles.container}>
          <View className={styles.item}>
            <Image className={`${styles.image} ${styles.tel}`} src={'https://mall.cocotc.cn/static/images/login-tel.png'} />
            <View className={styles.selectLocation} onClick={() => this.setState(preState => ({showActionSheet: !preState.showActionSheet}))}>
              <Text className={styles.locationName}>{this.props.login.locations[this.state.nameLocationIndex].label}</Text>
              <Image src={'https://tmall.cocogc.cn/static/images/select.png'} className={styles.locationImage}/>
            </View>
            <Input
              name='name'
              type='text'
              placeholder='请输入注册手机号'
              value={this.state.name}
              onChange={(e) => this.setState({name: e.detail.value})}
            />
          </View>
          <View className={styles.item}>
            <Image className={styles.image} src={'https://mall.cocotc.cn/static/images/login-vail.png'} />
            <Input
              name='verify'
              type='text'
              maxLength='4'
              placeholder='请输入图片验证码'
              value={this.state.verify}
              onChange={(e) => this.setState({verify: e.detail.value})}
            />
            <Image src={this.state.verifyCode} className={styles.verify} onClick={this.getVerifyCode}/>
          </View>
          <View className={styles.item}>
            <Image className={styles.image} src={'https://mall.cocotc.cn/static/images/login-msg.png'} />
            <Input
              name='code'
              type='number'
              maxLength='6'
              placeholder='请输入短信验证码'
              value={this.state.code}
              onChange={(e) => this.setState({code: e.detail.value})}
            />
            <Button className={styles.code} plain type='primary'>获取验证码</Button>
          </View>
          <View className={styles.item}>
            <Image className={styles.image} src={'https://mall.cocotc.cn/static/images/login-password.png'} />
            <Input
              name='pwd'
              type='text'
              password={this.state.flag ? true: false}
              placeholder='请输入登录密码'
              value={this.state.pwd}
              onInput={(e) => this.setState({pwd: e.detail.value})}
            />
            {
              this.state.pwd && <Image src={this.state.flag ? 'https://tmall.cocogc.cn/static/images/eye-open.png' : 'https://tmall.cocogc.cn/static/images/eye-close.png'} className={styles.eye} onClick={() => this.setState(preState => ({ flag: !preState.flag }))}/>
            }
          </View>
        </View>
        <Button className={styles.confirm} onClick={this.validateRegister}>注册</Button>
        <Text className={styles.login} onClick={() => Taro.navigateBack()}>已有账号</Text>
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
    if (!verify) return dialog.toast({title: '请输入图片验证码'})
    if (!code) return dialog.toast({title: '请输入短信验证码'})
    if (!pwd) return dialog.toast({title: '请输入短信验证码'})
    this.register(name, verify, code, pwd)
  }
  register = async (name, verify, code, pwd) => {
    const { data } = await register({mobile: name, captcha: verify, verify_code: code, passwd: pwd, confirm_passwd: pwd})
    console.log(data)
  }
}
