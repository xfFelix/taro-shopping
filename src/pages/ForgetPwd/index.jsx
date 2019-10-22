import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image, Input, Button } from '@tarojs/components'
import { register } from '@/api'
import styles from './index.module.scss'
import { dialog, validate } from '@/util';
import { connect } from '@tarojs/redux'
import SelectLocation from '@/components/SelectLocation'

import openEye from '@/assets/img/login/eye-open.png'
import closeEye from '@/assets/img/login/eye-close.png'

@connect(({login}) => ({
  login
}))
export default class Register extends Component {

  config ={
    navigationBarTitleText: '忘记密码'
  }

  state = {
    name: '',
    code: '',
    pwd: '',
    newPwd: '',
    flag: true,
    newflag: true,
    nameLocationIndex: 0,
    showActionSheet: false
  }

  render() {
    return (
      <View className={styles.wrapper}>
        <Image src='../../assets/img/login/banner.png' className={styles.banner} />
        <View className={styles.container}>
          <View className={styles.item}>
            <Image className={`${styles.image} ${styles.tel}`} src={'../../assets/img/login/tel.png'} />
            <View className={styles.selectLocation} onClick={() => this.setState(preState => ({showActionSheet: !preState.showActionSheet}))}>
              <Text className={styles.locationName}>{this.props.login.locations[this.state.nameLocationIndex].label}</Text>
              <Image src={'../../assets/img/login/select.png'} className={styles.locationImage}/>
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
            <Image className={styles.image} src={'../../assets/img/login/password.png'} />
            <Input
              name='pwd'
              type='text'
              password={this.state.flag ? true: false}
              placeholder='设置新密码(6-20位数字+字母)'
              value={this.state.pwd}
              onInput={(e) => this.setState({pwd: e.detail.value})}
            />
            {
              this.state.pwd && <Image src={this.state.flag ? openEye : closeEye} className={styles.eye} onClick={() => this.setState(preState => ({ flag: !preState.flag }))}/>
            }
          </View>
          <View className={styles.item}>
            <Image className={styles.image} src={'../../assets/img/login/new-pwd.png'} />
            <Input
              name='newPwd'
              type='text'
              password={this.state.newflag ? true : false}
              placeholder='确认密码'
              value={this.state.newPwd}
              onInput={(e) => this.setState({newPwd: e.detail.value})}
            />
            {
              this.state.newPwd && <Image src={this.state.newflag ? openEye : closeEye} className={styles.eye} onClick={() => this.setState(preState => ({ newflag: !preState.newflag }))}/>
            }
          </View>
          <View className={styles.item}>
            <Image className={styles.image} src={'../../assets/img/login/code.png'} />
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
        </View>
        <Button className={styles.confirm} onClick={this.validateRegister}>下一步</Button>
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
    const { code, newPwd, name, pwd } = this.state
    if (!name || !validate.IsMobile(name)) return dialog.toast({title: '请输入正确手机号'})
    if (!pwd) return dialog.toast({title: '请输入密码'})
    if (!newPwd) return dialog.toast({title: '请确认密码'})
    if (!code) return dialog.toast({title: '请输入短信验证码'})
    this.register(name, newPwd, code, pwd)
  }
  register = async (name, newPwd, code, pwd) => {
    const { data } = await register({mobile: name, captcha: newPwd, verify_code: code, passwd: pwd, confirm_passwd: pwd})
    console.log(data)
  }
}
