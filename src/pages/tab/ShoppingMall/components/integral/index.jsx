import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Text, View} from "@tarojs/components"
import {AtIcon, AtTag} from "taro-ui"
import {connect} from "@tarojs/redux"
import { toggleIntegral} from "@/actions/shopping"
import Goods from "@/components/goods"

@connect(({shopping, user}) => ({
  list: shopping.integralList,
  shopping,
  token: user.token,
  info: user.info
}), dispatch => ({
  toggleIntegral: (name, price, offset = 0, rows = 10) => dispatch(toggleIntegral(name, price, offset, rows))
}))
class Integral extends Component{

  constructor(){
    super(...arguments)
  }

  state = {
    showStoreLable: false
  }

  componentWillMount() {
    if (this.props.token && this.props.info.score > 0) {
      this.storeName = this.props.list[0].label
      let price = this.props.info.score.toFixed(0)
      this.initPrice = this.props.list[0].value + price
    } else {
      this.storeName = this.props.list[1].label
      this.initPrice = this.props.list[1].value
    }
    this.props.toggleIntegral(this.storeName, this.initPrice)
  }

  _store = () => {
    const { shopping } = this.props
    let store = shopping[this.storeName]
    if (!store) {
      store = {
        list: [],
        offset: 0,
        rows: 10
      }
    }
    return store
  }

  toggleList = ({name, item, store}) => {
    this.storeName = name
    if (item.name == '0') {
      let price = this.props.info.score.toFixed(0)
      this.props.toggleIntegral(name, item.value + price, store.offset, store.rows)
    } else {
      this.props.toggleIntegral(name, item.value, store.offset, store.rows)
    }
  }

  render() {
    let store = this._store()
    return (
      <View className={styles.hotBg}>
        <View className={styles.hot}>
          <Text className={styles.title}>积分区间</Text>
          <Text className={styles.titleEN}>INTEGRAL DIMENSION</Text>
          <View className={this.showStoreLable ? `${styles.integral} ${styles.more}` : styles.integral }>
            {
              this.props.list.map((item, index) => {
                return (
                  <AtTag
                    name={item.label}
                    type='primary'
                    active={item.label === this.storeName}
                    onClick={({name}) => this.toggleList({name, item, store})}
                    circle
                    key={index}>{item.label}
                  </AtTag>
                )
              })
            }
            <View className={styles.arrowContainer} onClick={() => this.setState(pre => ({showStoreLable: !pre.showStoreLable}))}>
              <View className={this.showStoreLable ? styles.arrowDown: ''}>
                <AtIcon value='chevron-down' size='24' color='#6a6a6a'></AtIcon>
              </View>
            </View>
          </View>
          <View className={styles.goodsContainer}>
            {
              store.list.map((item, i) => {
                return (
                  <View key={item.id} className={styles.item}>
                    <Goods item={item} product></Goods>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

export default Integral
