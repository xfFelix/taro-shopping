import Taro, {Component} from '@tarojs/taro'
import { View, Text, Image, Input, Button } from '@tarojs/components'
import styles from './index.module.scss'
import { dialog, validate } from '@/util'
import { connect } from '@tarojs/redux'
import SelectLocation from '@/components/SelectLocation'
import { bindTelByWechat } from './api'
import {getInfoSync, setToken} from "@/actions/user"
import SendCode from "@/components/SendCode"

@connect(({login, user}) => ({
  login,
  token: user.token
}), dispatch => ({
  getInfo: (token) => dispatch(getInfoSync(token)),
  setTokenSync: (token) => dispatch(setToken(token))
}))
export default class BindTel extends Component {

  config ={
    navigationBarTitleText: '绑定手机号'
  }

  state = {
    id: '',
    name: '',
    code: '',
    nameLocationIndex: 0,
    showActionSheet: false,
  }

  componentWillMount(): void {
    const { id } = this.$router.params
    this.setState({id})
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
              <Image src={'https://tmall.cocogc.cn/static/images/select.png'} className={!this.state.showActionSheet ? styles.locationImage : styles.selecting}/>
            </View>
            <Input
              name='name'
              type='number'
              placeholder='请输入绑定手机号'
              value={this.state.name}
              onInput={(e) => this.setState({name: e.detail.value})}
            />
          </View>
          <View>
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
              <SendCode name={this.state.name} isPwd nameLocationIndex={this.state.nameLocationIndex}></SendCode>
            </View>
          </View>
        </View>
        <Button className={styles.confirm} onClick={this.validateRegister}>绑定</Button>
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
    const { code, name, nameLocationIndex } = this.state
    if (!name || !validate.IsMobile(name)) return dialog.toast({title: '请输入正确手机号'})
    if (!nameLocationIndex && !validate.IsChinaMobile(name)) return dialog.toast({title: '请输入大陆手机号'})
    if (nameLocationIndex && !validate.IsHKMobile(name)) return dialog.toast({title:'请输入香港手机号'})
    if (!code) return dialog.toast({title:'请输入验证码'})
    this.login()
  }

  login = async () => {
    try {
      const { id, name, code} = this.state
      const { getInfo, setTokenSync } = this.props
      const { data } = await bindTelByWechat({mobile: name, verifyCode: code, wxOpenId: id})
      Promise.all([
        setTokenSync(data.token),
        getInfo(data.token)
      ]).then(res => {
        Taro.switchTab({url: '/pages/tab/Home/index'})
      })
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }
}
