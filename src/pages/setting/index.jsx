import Taro,{PureComponent} from "@tarojs/taro"
import styles from './index.module.scss'
import {Button, Image, View} from "@tarojs/components";
import {connect} from "@tarojs/redux"
import {loginOut} from "@/actions/user";
import {action} from "@/pages/address/store";

@connect(() => ({

}), dispatch => ({
  loginOut: () => dispatch(loginOut()),
  toggleSelect: (data) => dispatch(action.toggleSelect(data))
}))
export default class Setting extends PureComponent {

  config = {
    navigationBarTitleText: '设置'
  }

  state = {
    list: [
      { id: 0, title: '地址管理', path: '/pages/address/list/index' },
      // { id: 1, title: '实名认证' },
      { id: 2, title: '修改登录密码', path: '/pages/ForgetPwd/index' },
      // { id: 3, title: '修改支付密码' },
    ]
  }

  constructor(){
    super(...arguments)
  }

  loginOut = () => {
    this.props.loginOut()
    Taro.redirectTo({url: '/pages/Login/index'})
  }

  goAddressList = (path) => {
    this.props.toggleSelect(false)
    Taro.navigateTo({url: path})
  }

  handleClick = (item) => {
    if (item.id == 0) {
      this.goAddressList(item.path)
    } else {
      Taro.navigateTo({url: item.path})
    }
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.container}>
          {
            this.state.list.map(item => {
              return (
                <View className={styles.item} key={item.id + ''} onClick={() => this.handleClick(item)}>
                  <Text>{item.title}</Text>
                  <Image src={'https://tmall.cocogc.cn/static/images/me/right.png'} className={styles.right}></Image>
                </View>
              )
            })
          }
          <Button className={styles.btn} onClick={() => this.loginOut()}>退出</Button>
        </View>
      </View>
    )
  }
}
