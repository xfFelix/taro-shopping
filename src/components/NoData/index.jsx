import Taro,{PureComponent} from "@tarojs/taro"
import styles from "./index.module.scss"
import {Button, Image, View} from "@tarojs/components"

export default class NoData extends PureComponent{

  constructor(){
    super(...arguments)
  }

  render() {
    return(
      <View className={styles.isEmpty}>
        <Image src={'https://mall.cocotc.cn/static/images/home/nothing.png'} className={styles.notingImg}></Image>
        <Button className={styles.goList} onClick={() => Taro.navigateTo({url: '/pages/goods/list/index'})}>进店逛逛</Button>
      </View>
    )
  }
}
