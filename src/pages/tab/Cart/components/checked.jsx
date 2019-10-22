import Taro,{PureComponent} from "@tarojs/taro"
import styles from './checked.module.scss'
import {Image, View} from "@tarojs/components"

export default class Checked extends PureComponent{

  defaultProps = {
    check: false
  }

  constructor() {
    super(...arguments)
  }

  render() {
    return (
      this.props.check ? <Image className={styles.checkedImg} src={'https://mall.cocotc.cn/static/images/cart/checked.png'} onClick={() => this.props.onToggle()}></Image> :
        <View className={styles.checked} onClick={() => this.props.onToggle()}></View>
    )
  }
}
