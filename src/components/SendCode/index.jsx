import Taro,{Component} from '@tarojs/taro'
import {Button} from "@tarojs/components";
import styles from './index.module.scss'
import {dialog, validate} from '@/util'
import {sms} from '@/api'
import {connect} from "@tarojs/redux";

@connect(({user}) => ({
  token: user.token
}))
class SendCode extends Component{

  defaultProps ={
    name: '',
    verify: '',
    isPwd: false,
    isPay: false
  }

  constructor(){
    super(...arguments)
  }

  state = {
    disabled: false,
    downInfo: '获取验证码'
  }

  getSmsCode = async() => {
    let params = {}
    if (!this.props.isPay) {
      const { verify, name, nameLocationIndex, isPwd } = this.props;
      if (!name || !validate.IsMobile(name)) return dialog.toast({title: '请输入正确手机号'});
      if (!nameLocationIndex && !validate.IsChinaMobile(name)) return dialog.toast({title: '请输入大陆手机号'});
      if (nameLocationIndex && !validate.IsHKMobile(name)) return dialog.toast({title:'请输入香港手机号'});
      params.mobile = name
      if (!isPwd) {
        if (!verify) return dialog.toast({title:'请输入图片验证码'});
        params.captcha = verify
      }
    } else {
      params.token = this.props.token
    }
    let res= await sms(params);
    if(res.error_code===0){
      let timeInit = 120;
      let countDown = setInterval(()=>{
        let i = 1;
        timeInit = timeInit - i;
        if (timeInit > 0) {
          this.setState({
            downInfo: timeInit + 's 重新获取',
            disabled:true
          })
        } else {
          this.setState({
            downInfo:'重新获取',
            disabled:false
          })
          clearInterval(countDown)
        }
      }, 1000)
    }
  }

  render() {
    return (
      this.state.isPay ?
        <Button
          className={`${this.state.disabled?styles.noClick:styles.canClick} ${styles.sms}`}
          plain
          type='primary'
          onClick={() => this.getSmsCode()} disabled={this.state.disabled}>
          {this.state.downInfo}
        </Button>
        : <Button
          className={`${this.state.disabled?styles.noClick:styles.canClick} ${styles.code}`}
          plain
          type='primary'
          onClick={() => this.getSmsCode()} disabled={this.state.disabled}>
          {this.state.downInfo}
        </Button>
    )
  }
}

export default SendCode
