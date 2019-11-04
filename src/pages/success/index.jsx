import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";
import ICON from '../../assets/img/tab/supermarket-actived.png'

@connect(({success}) => ({
  list: success.list,
  title: success.title,
  price: success.price,
  path: success.path
}), dispatch => ({

}))
export default class Success extends Component{

  config ={
    navigationBarTitleText: '成功'
  }

  constructor(){
    super(...arguments)
  }

  goPath = (path) => {
    if (/\/pages\/tab\/Home\/index/.test(path)) {
      return Taro.switchTab({url:path})
    }
    Taro.navigateTo({url: path})
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.container}>
          <Image src={'https://tmall.cocogc.cn/static/images/changeSuccess.jpg'} className={styles.banner}></Image>
          <Text className={styles.text}>{this.props.title}</Text>
          <View className={styles.number}>
            <Image src={ICON} className={styles.icon}></Image>
            <Text>{this.props.price}</Text>
          </View>
        </View>
        <View className={styles.btnWrapper}>
          <Button className={`${styles.btn} ${styles.home}`} onClick={() => this.goPath(this.props.path.home)}>回到首页</Button>
          <Button className={`${styles.btn} ${styles.order}`} onClick={() => this.goPath(this.props.path.order)}>查看订单</Button>
        </View>
        <View className={styles.more}>
          <View className={styles.title}>更多兑换</View>
          <View className={styles.content}>
            {this.props.list.map(item => {
              return (
                <View className={styles.item} key={item.id + ''}>
                  <Image src={item.imgPath} className={styles.img}></Image>
                  <Text>{item.name}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}
