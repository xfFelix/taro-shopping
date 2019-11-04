import Taro,{PureComponent} from "@tarojs/taro"
import styles from './index.module.scss'
import {View, Input, Text} from "@tarojs/components";
import SendCode from "@/components/SendCode"
import {connect} from "@tarojs/redux";

@connect(({user}) => ({
  info: user.info
}))
export default class PayPassword extends PureComponent{

  constructor(){
    super(...arguments)
  }

  state = {
    value: ''
  }

  handleInput = (value) => {
    if (value.length <= 4) {
      this.setState({value})
      if (value.length == 4) {
        this.props.onConfirm(value)
      }
    }
  }

  render(): any {
    return(
      <View className={styles.mask}>
        <View className={styles.dialog}>
          <View className={styles.title}>请输入验证码</View>
          <View className={styles.tel}>
            <Text>号码：{this.props.info.userName}</Text>
            <SendCode isPay></SendCode>
          </View>
          <View className={styles.password}>
            <View className={styles.main}>
              <View className={this.state.value.length == 0 ? `${styles.item} ${styles.active}` : styles.item}><Text className={styles.text}>{this.state.value[0] ? this.state.value[0] : ''}</Text></View>
              <View className={this.state.value.length == 1 ? `${styles.item} ${styles.active}` : styles.item}><Text className={styles.text}>{this.state.value[1] ? this.state.value[1] : ''}</Text></View>
              <View className={this.state.value.length == 2 ? `${styles.item} ${styles.active}` : styles.item}><Text className={styles.text}>{this.state.value[2] ? this.state.value[2] : ''}</Text></View>
              <View className={this.state.value.length == 3 ? `${styles.item} ${styles.active}` : styles.item}><Text className={styles.text}>{this.state.value[3] ? this.state.value[3] : ''}</Text></View>
              {/*<View className={this.state.value.length == 4 ? `${styles.item} ${styles.active}` : styles.item}><Text className={styles.text}>{this.state.value[4] ? this.state.value[4] : ''}</Text></View>*/}
              {/*<View className={this.state.value.length == 5 ? `${styles.item} ${styles.active}` : styles.item}><Text className={styles.text}>{this.state.value[5] ? this.state.value[5] : ''}</Text></View>*/}
            </View>
            <Input className={styles.input} type={'number'} onInput={(e) => this.handleInput(e.target.value)} autoFocus></Input>
          </View>
        </View>
      </View>
    )
  }

}
