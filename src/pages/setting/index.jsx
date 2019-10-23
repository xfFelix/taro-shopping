import Taro,{PureComponent} from "@tarojs/taro"
import styles from './index.module.scss'
import {Button, Image, View} from "@tarojs/components";
import {connect} from "@tarojs/redux"
import {loginOut} from "@/actions/user";

@connect(() => ({

}), dispatch => ({
  loginOut: () => dispatch(loginOut())
}))
export default class Setting extends PureComponent {

  config = {
    navigationBarTitleText: '设置'
  }

  state = {
    list: [
      { id: 0, title: '地址管理' },
      { id: 0, title: '实名认证' },
      { id: 0, title: '修改登录密码' },
      { id: 0, title: '修改支付密码' },
    ]
  }

  constructor(){
    super(...arguments)
  }

  loginOut = () => {
    this.props.loginOut()
    Taro.redirectTo({url: '/pages/Login/index'})
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.container}>
          {
            this.state.list.map(item => {
              return (
                <View className={styles.item} key={item.id + ''}>
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
