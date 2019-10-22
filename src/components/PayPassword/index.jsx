import Taro,{PureComponent} from "@tarojs/taro"
import styles from './index.module.scss'
import {View, Input} from "@tarojs/components";

export default class PayPassword extends PureComponent{

  constructor(){
    super(...arguments)
  }

  render(): any {
    return(
      <View className={styles.mask}>
        <View className={styles.dialog}>
          <View className={styles.title}>请输入支付密码</View>
          <View className={styles.password}>
            <View className={styles.mian}>
              <View className={styles.item}></View>
              <View className={styles.item}></View>
              <View className={styles.item}></View>
              <View className={styles.item}></View>
              <View className={styles.item}></View>
              <View className={styles.item}></View>
            </View>
            <Input className={styles.input}></Input>
          </View>
        </View>
      </View>
    )
  }

}
