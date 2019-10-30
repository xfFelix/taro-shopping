import Taro, {Component} from "@tarojs/taro"
import {Button, Image, ScrollView, Text, View} from "@tarojs/components"
import styles from './buy_dialog.module.scss'
import {dialog} from "@/util/index";

export default class BuyDialog extends Component{
  constructor(){
    super(...arguments)
  }

  state = {
    num: 1
  }
  dropNum = () => {
    if (this.state.num > 1) {
      this.setState(pre => ({num: pre.num - 1}))
    }
  }

  render() {
    return (
      <View className={styles.wrapper} onClick={this.props.onClose}>
        <View className={styles.container} onClick={(e) => e.stopPropagation()}>
          <View className={styles.flex}>
            <Image src={this.props.data.picUrl} className={styles.productImg}></Image>
            <View className={styles.infoWrapper}>
              <Text className={styles.price}>{this.props.data.currentPrice}</Text>
              <Text className={styles.info}>已选：{this.props.data.name} {this.state.num + '件'}</Text>
            </View>
          </View>
          <ScrollView
            scrollY={true}
            scrollWithAnimation={true}
            className={styles.buyInfo}>
            <View className={styles.numWrapper}>
              <Text className={styles.numText}>数量</Text>
              <View className={`${styles.numContent} flex`}>
                <Text className={styles.computed} onClick={() => this.dropNum()}>-</Text>
                <Text className={styles.num}>{this.state.num}</Text>
                <Text className={styles.computed} onClick={() => this.setState(pre => ({num: pre.num + 1}))}>+</Text>
              </View>
            </View>
          </ScrollView>
          <Button className={styles.next} onClick={() => this.props.onConfirm(this.state.num)}>确定</Button>
        </View>
      </View>
    )
  }
}
