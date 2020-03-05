import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import styles from './index.module.scss'
import {connect} from "@tarojs/redux"
import {
  getAddressSync,
  getGuessLikeSync,
  getListSync,
  removeCartSync,
  updateCartSync
} from "@/pages/tab/Cart/store/action"
import { action } from '@/pages/goods/store'
import GuessLike from "@/pages/tab/Cart/components/guess_like"
import NoData from "@/components/NoData"
import Checked from "@/pages/tab/Cart/components/checked"
import Address from "@/pages/tab/Cart/components/address"
import {dialog} from "@/util/index";

@connect(({cart, user, goods}) => ({
  address: cart.address,
  token: user.token,
  info: user.info,
  list: cart.changeList,
  defaultList: cart.list,
  isEmpty: cart.isEmpty,
  guesslike: cart.guesslike,
  total: cart.total,
  totalNum: cart.num,
  allChecked: cart.allChecked,
  isDefault: cart.isDefault
}), dispatch => ({
  getDefaultAddress: (data) => dispatch(getAddressSync(data)),
  getCartList: (data) => dispatch(getListSync(data)),
  getCartNum: (data) => dispatch(action.getCartNumSync(data)),
  getGuessLike: () => dispatch(getGuessLikeSync()),
  updateCart: (data, addressId) => dispatch(updateCartSync(data, addressId)),
  removeCart: (data, addressId) => dispatch(removeCartSync(data, addressId))
}))
class Cart extends Component {

  config = {
    navigationBarTitleText: '购物车'
  }

  state = {
    edit: true
  }

  constructor(props) {
    super(props)
  }

  async componentDidShow() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index?redirect=/pages/tab/Cart/index`})
    if (this.props.isDefault) {
      await this.props.getDefaultAddress({token: this.props.token})
    }
    this.setSelect()
    this.props.getCartNum({token: this.props.token})
    this.props.getGuessLike()
    this.props.getCartList({token: this.props.token, addressId: this.props.address?this.props.address.id: ''})
  }

  setSelect () {
    if (typeof this.$scope.getTabBar === 'function' &&
      this.$scope.getTabBar()) {
      this.$scope.getTabBar().$component.setState({
        select: '3'
      })
    }
  }

  goGoodsDetail = (id) => {
    Taro.navigateTo({url:`/pages/goods/detail/index?id=${id}`})
  }

  toggleEdit = () => {
    let list = this.props.defaultList
    if (!list || !list.length) return dialog.toast({title: '购物车为空~'})
    this.setState(pre => ({edit: !pre.edit}))
  }

  goPreview = () => {
    const {address, total, info} = this.props
    if (!address) return dialog.toast({title: '请填写收货地址'})
    if (info.score < total) return dialog.toast({title: '积分余额不足'})
    Taro.navigateTo({url: '/pages/order/preview/index'})
  }

  render() {
    return (
      <View className={styles.wrapper}>
        <View className={styles.header}>
          <Text>购物车</Text>
          <Text className={styles.editor} onClick={() => this.toggleEdit()}>{this.state.edit ? '编辑': '完成'}</Text>
        </View>
        <View className={styles.address}>
          <Address address={this.props.address}></Address>
        </View>
        <View className={styles.content}>
          {
            !this.props.isEmpty ? this.props.list.map((store, index) => {
              return (
                 store.data.length && <View className={styles.store} key={index + ''}>
                  <View className={styles.title}>
                    <Image src={'https://mall.cocotc.cn/static/images/cart/supermarket.png'} className={styles.supermarket}></Image>
                    <Text className={styles.storeName}>{store.title}</Text>
                    {store.mail && <Text className={styles.mail}>({store.mail})</Text>}
                  </View>
                  {
                    store.data.map((item) => {
                      return (
                        <View className={styles.goods} key={item.id + ''} onClick={() => this.goGoodsDetail(item.goods.id)}>
                          <View onClick={e => e.stopPropagation()}>
                            <Checked check={item.check} onToggle={() => this.compute(item, 'toggle')}></Checked>
                          </View>

                          <Image className={styles.image} src={item.goods.picUrl}></Image>
                          <View className={styles.info}>
                            <View className={styles.name}>{item.goods.name}</View>
                            <View className={styles.select}>{item.goods.attrs}</View>
                            <View className={styles.priceWrapper}>
                              <Image className={styles.logo} src={'https://mall.cocotc.cn/static/images/cart/icon.png'}></Image>
                              <Text className={styles.price}>{item.goods.currentPrice.toFixed(2)}</Text>
                              <View className={styles.numWrapper} onClick={(e) => e.stopPropagation()}>
                                {
                                  item.num === 1 ?
                                  <View className={styles.num}>
                                    <Image className={styles.compute} src={'https://mall.cocotc.cn/static/images/cart/cut-disabled.png'}></Image>
                                  </View> :
                                  <View className={styles.num} onClick={() => this.compute(item, 'drop')}>
                                    <Image className={styles.compute} src={'https://mall.cocotc.cn/static/images/cart/cut.png'}></Image>
                                  </View>
                                }
                                <View className={styles.num}>{item.num}</View>
                                <View className={styles.num} onClick={() => this.compute(item, 'add')}>
                                  <Image className={styles.compute} src={'https://mall.cocotc.cn/static/images/cart/add.png'}></Image>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              )
            }) : <NoData></NoData>
          }
        </View>
        <GuessLike list={this.props.guesslike}></GuessLike>
        <View className={styles.bannerWrapper}>
          <Image className={styles.bannerImg} src={'https://mall.cocotc.cn/static/images/cart/logo.png'}></Image>
        </View>
        <View className={styles.accountWrapper}>
          <View className={styles.allChecked}>
            <Checked check={this.props.allChecked} onToggle={() => this.compute()}></Checked>
            <View className={styles.checkedText}>全选</View>
          </View>
          {
            this.state.edit && <View className={styles.total}>
              <Text className={styles.totalText}>合计:</Text>
              <Text className={styles.totalPrice}>{this.props.total}</Text>
            </View>
          }
          {
            this.state.edit ? <Button className={styles.confirm} onClick={() => this.goPreview()}>去结算{this.props.totalNum && <Text>({this.props.totalNum})</Text>}</Button> :
              <Button className={styles.delete} onClick={() => this.removeCart()}>删除</Button>
          }
        </View>
      </View>
    )
  }

  compute = (item, flag) => {
    let list = JSON.parse(JSON.stringify(this.props.defaultList))
    let arr = []
    let res = /add|drop|toggle/.test(flag)
    for (let i of list) {
      let obj = {}
      if (res) {
        this.sigleToggle(i, item, flag, obj)
      } else {
        this.allChecked(i)
      }
      if (i.check) {
        obj.goodsId = i.goods.id
        obj.nums = i.num
      }
      if (Object.keys(obj).length) {
        arr.push(obj)
      }
    }
    let addressId = this.props.address && this.props.address.id
    this.props.updateCart({buys: arr, token: this.props.token}, addressId)
  }

  sigleToggle = (i, item, flag) => {
    if (i.id == item.id) {
      if (flag === 'add') {
        i.num = i.num + 1
      } else if (flag === 'drop') {
        i.num = i.num - 1
      } else if (flag === 'toggle'){
        i.check = !i.check
      }
    }
  }

  allChecked = (i) => {
    i.check = !this.props.allChecked
  }

  removeCart = async () => {
    let list = JSON.parse(JSON.stringify(this.props.defaultList))
    let ids = []
    for (let i of list) {
      if (i.check) {
        ids.push(i.id)
      }
    }
    let id = ids.join(',')
    let addressId = this.props.address && this.props.address.id
    await this.props.removeCart({id: id, token: this.props.token}, addressId)
    this.setState({edit: true})
  }
}

export default Cart
