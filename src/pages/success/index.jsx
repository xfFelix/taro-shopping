import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Button} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";

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

  goHome = (path) => {
    if (/\/pages\/tab\/Home\/index/.test(path)) {
      return Taro.switchTab({url:path})
    }
    let currentPage = Taro.getCurrentPages().length
    Taro.navigateBack({delta: currentPage - 2})
  }

  goOrder = (path) => {
    if (/\/pages\/order\/list\/index/.test(path)) {
      return Taro.switchTab({url: '/pages/tab/User/index'}).then(() => {
        setTimeout(() => {
          Taro.navigateTo({url: path})
        }, 500)
      })
    }
    let currentPage = Taro.getCurrentPages().length
    Taro.navigateBack({delta: currentPage - 2}).then(() => {
      setTimeout(() => {
        Taro.navigateTo({url: path})
      }, 500)
    })
  }

  render() {
    const { path, price, list, title } = this.props
    return (
      <View className={styles.wrapper}>
        <View className={styles.container}>
          <Image src={'https://tmall.cocogc.cn/static/images/changeSuccess.jpg'} className={styles.banner}></Image>
          <Text className={styles.text}>{title}</Text>
          <View className={styles.number}>
            <Image src={'https://mall.cocotc.cn/static/images/cart/icon.png'} className={styles.icon}></Image>
            <Text>{price}</Text>
          </View>
        </View>
        <View className={!path.order ? `${styles.btnWrapper} ${styles.center}`: styles.btnWrapper}>
          <Button className={`${styles.btn} ${styles.home}`} onClick={() => this.goHome(path.home)}>回到首页</Button>
          {path.order && <Button className={`${styles.btn} ${styles.order}`} onClick={() => this.goOrder(path.order)}>查看订单</Button>}
        </View>
        {/* <View className={styles.more}>
          <View className={styles.title}>更多兑换</View>
          <View className={styles.content}>
            {list.map(item => {
              return (
                <View className={styles.item} key={item.id + ''}>
                  <Image src={item.imgPath} className={styles.img}></Image>
                  <Text>{item.name}</Text>
                </View>
              )
            })}
          </View>
        </View> */}
      </View>
    )
  }
}
