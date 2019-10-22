import Taro,{Component} from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import styles from './index.module.scss'

class Goods extends Component{

  defaultProps ={
    product: false,
    item: []
  }

  constructor(){
    super(...arguments)
  }

  goGoodsDetail = (id) => {
    Taro.navigateTo({url:`/pages/goods/detail/index?id=${id}`})
  }

  render() {
    const { item, product } = this.props
    return (
      <View className={styles.item} onClick={() => this.goGoodsDetail(item.id)}>
        <Image src={product ? item.image: item.picUrl} className={product ? styles.productImg :styles.itemImg}></Image>
        <Text className={product? `${styles.itemName} ${styles.productName}` :styles.itemName}>{item.name}</Text>
        <View className={styles.itemPriceWrapper}>
          <Image className={styles.itemPriceImg} src={'https://mall.cocotc.cn/static/images/product/icon.png'}></Image>
          <Text className={styles.itemPriceText}>{item.currentPrice}</Text>
          {
            item.marketPrice > item.currentPrice && <Text className={styles.oldPrice}>{item.marketPrice}</Text>
          }
        </View>
      </View>
    )
  }
}

export default Goods
