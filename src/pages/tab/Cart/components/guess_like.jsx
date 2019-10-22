import Taro,{PureComponent} from "@tarojs/taro"
import {View, Image, Text, Button} from "@tarojs/components"
import styles from './guess_like.module.scss'
import Goods from "@/components/goods"

export default class GuessLike extends PureComponent{

  defaultProps = {
    list: []
  }

  constructor(){
    super(...arguments)
  }

  render() {
    return (
      <View className={styles.wrapper}>
        <View className={styles.title}>
          <Image className={styles.icon} src={'https://mall.cocotc.cn/static/images/cart/left.png'}></Image>
          <Text className={styles.text}>猜你喜欢</Text>
          <Image className={styles.icon} src={'https://mall.cocotc.cn/static/images/cart/right.png'}></Image>
        </View>
        <View className={styles.container}>
          {
            (this.props.list && this.props.list.length) && this.props.list.map(item => {
              return (
                <View className={styles.goods} key={item.id + ''}>
                  <Goods item={item} product></Goods>
                </View>
              )
            })
          }
        </View>
        <Button className={styles.goList} onClick={() => Taro.navigateTo({url: '/pages/goods/list/index'})}>进店逛逛</Button>
      </View>
    )
  }

}
