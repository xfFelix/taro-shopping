import Taro,{PureComponent} from "@tarojs/taro"
import {View, Image, Text} from "@tarojs/components"
import { AtSearchBar } from 'taro-ui'
import styles from './index.module.scss'
import Goods from "@/components/goods"
import {connect} from "@tarojs/redux"
import {getGoodsListSync, loadMoreGoodsListSync} from "@/pages/goods/store/action"
import {dialog} from "@/util/index";

@connect(({goods, user}) => ({
  goods,
  token: user.token,
  info: user.info
}), dispatch => ({
  getGoodsList: (data) => dispatch(getGoodsListSync(data)),
  loadMoreGoodsList: (data) => dispatch(loadMoreGoodsListSync(data))
}))
export default class GoodsList extends PureComponent {

  config ={
    navigationBarTitleText: '商品列表'
  }

  state = {
    value: '',
    storeName: '全部',
    integralFlag: false,
    integralActive: 1
  }

  constructor(){
    super(...arguments)
    this.tabList =  [
      { id: 0, title: '全部' },
      { id: 1, title: '销量', sort: 'n' },
      { id: 2, title: '价格', sort: 'asc' },
      { id: 3, title: '积分区间' }
    ]
    this.integralList = [
      { id: 0, title: '我能兑换', value: '0-*' },
      { id: 1, title: '全部', value: '0-*' },
      { id: 2, title: '0~50', value: '0-50' },
      { id: 3, title: '51~200', value: '51-200' },
      { id: 4, title: '201~1000', value: '201-1000' },
      { id: 5, title: '1001~5000', value: '1001-5000' },
      { id: 6, title: '5000以上', value: '5001-*' },
    ]
  }

  onChange (value) {
    this.setState({
      value: value
    })
  }

  componentWillMount() {
    let categoryId = this.$router.params.id
    this.props.getGoodsList({categoryId})
  }

  toggleStore = (item, store) => {
    this.setState({ storeName: item.title })
    if (item.id === 3) {
      if (!this.first) {
        this.props.getGoodsList({...store, storeName: item.title, price: '0-*', list: []})
        this.first = true
      }
      return this.setState(pre => ({integralFlag: !pre.integralFlag}))
    } else {
      this.setState({integralFlag: false})
    }
    // 销量排序
    let salesVolume = (item.id === 1) ? (item.sort === 'n'? 'y': 'n'): undefined
    if (salesVolume) item.sort = salesVolume
    // 价格排序
    let priceRange = (item.id === 2) ? (item.sort === 'desc'? 'asc': 'desc'): undefined
    if (priceRange) item.sort = priceRange
    this.props.getGoodsList({...store, storeName: item.title, list: [], salesVolume: salesVolume, priceRange: priceRange})
  }

  toggleIntegral = (item) => {
    let store = this._store()
    this.setState({ integralActive: item.id })
    if (!item.id) {
      if (!this.props.token) {
        return dialog.toast({title: '请先登录'})
      }
      this.props.getGoodsList({...store, storeName: this.state.storeName, list: [], price: '0-' + this.props.info.score})
    } else {
      this.props.getGoodsList({...store, storeName: this.state.storeName, list: [], price: item.value})
    }
  }

  onReachBottom(){
    let store = this.props.goods[this.state.storeName]
    if (!store.allLoad) {
      this.props.loadMoreGoodsList({...store, storeName: this.state.storeName, offset: store.offset + store.rows})
    } else {
      dialog.toast({title: '没有更多了'})
    }
  }

  _store = () => {
    let store = this.props.goods[this.state.storeName]
    if (!store) {
      store = {
        list: [],
        offset: 1,
        page: 1,
        price: '0-*',
        priceRange: '',
        productTypeId: '',
        rows: 10,
        keyWord: '',
        categoryId: '',
        salesVolume: '',
        timeSort: ''
      }
    }
    return store
  }

  render() {
    const store = this._store()
    return (
      <View className={styles.wrapper}>
        <View>
          <AtSearchBar
            value={this.state.value}
            onChange={this.onChange.bind(this)}
          />
        </View>
        <View className={styles.tabWapper}>
          <View className={styles.tab}>
            {
              this.tabList.map((item) => {
                return (
                  <View
                    key={item.id}
                    onClick={() => this.toggleStore(item)}
                    className={item.title === this.state.storeName ? `${styles.panel} ${styles.actived}`: styles.panel}>
                    <Text>{item.title}</Text>
                  </View>
                )
              })
            }
          </View>
          {
            this.state.integralFlag && <View className={styles.integral}>
              {
                this.integralList.map(item => {
                  return <Text key={item.id} className={this.state.integralActive == item.id ? `${styles.single} ${styles.checked}`: styles.single} onClick={() => this.toggleIntegral(item)}>{item.title}</Text>
                })
              }
            </View>
          }
        </View>
        <View className={styles.content}>
          {/*循环模板 start*/}
            {
              store.list.map((item) => {
                return (
                  <View className={styles.item} key={item.id}>
                    <Goods item={item} product></Goods>
                  </View>
                )
              })
            }
          {/*循环模板end*/}
        </View>
      </View>
    )
  }
}
