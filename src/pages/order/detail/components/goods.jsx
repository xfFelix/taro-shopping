import Taro,{PureComponent} from '@tarojs/taro'
import styles from './goods.module.scss'
import {Image, Text, View} from "@tarojs/components";

export default class Goods extends PureComponent{

  constructor(){
    super(...arguments)
  }

  defaultProps = {
    item: {}
  }

  render(): any {
    const { item } = this.props
    return(
      <View className={styles.item}>
        <Image className={styles.pic} src={item.picUrl}></Image>
        <View className={styles.info}>
          <View className={styles.name}>{item.goodsName}</View>
          <View className={styles.num}>
            <Text className={styles.price}>{item.buyPrice}</Text>
            <Text className={styles.number}>x{item.buyNum}</Text>
          </View>
        </View>
      </View>
    )
  }
}
