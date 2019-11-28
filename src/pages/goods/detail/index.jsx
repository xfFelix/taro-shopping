import Taro, {Component} from "@tarojs/taro"
import {Image, Swiper, SwiperItem, View, RichText, Text, ScrollView, Button } from "@tarojs/components"
import {connect} from "@tarojs/redux";
import {addToCartSync, getCartNumSync, getGoodsDetailSync} from "@/pages/goods/store/action"
import styles from './index.module.scss'
import BuyDialog from "@/pages/goods/detail/components/buy_dialog"
import WxParse from '@/components/wxParse/wxParse'
import GuessLike from "@/pages/tab/Cart/components/guess_like"

import CartIcon from '@/assets/img/tab/cart.png'
import {dialog} from "@/util/index"
import {getGuessLikeSync, updateCartSync} from "@/pages/tab/Cart/store/action";

const SET_CART=1
const SET_BUY=2

@connect(({goods, user, cart}) => ({
  data: goods.detail,
  token: user.token,
  num: goods.num,
  guesslike: cart.guesslike
}), dispatch =>({
  getGoodsDetail: (data) => dispatch(getGoodsDetailSync(data)),
  getCartNum: (data) => dispatch(getCartNumSync(data)),
  addCart: (data) => dispatch(addToCartSync(data)),
  getGuessLike: () => dispatch(getGuessLikeSync()),
  updateCart: (data) => dispatch(updateCartSync(data))
}))
export default class GoodsDetail extends Component{

  config = {
    navigationBarTitleText: '商品详情'
  }

  state = {
    showDialog: false
  }

  constructor() {
    super(...arguments)
  }

  componentWillMount() {
    this.props.getGoodsDetail({id: this.$router.params.id})
    if (this.props.token){
      this.props.getCartNum({token: this.props.token})
    }
  }

  goCart = () => {
    Taro.switchTab({url: '/pages/tab/Cart/index'})
  }

  render(){
    const swiperList = this.props.data && this.props.data.gallery && this.props.data.gallery.split('|')
    this.props.data.detail && WxParse.wxParse('article', 'html', this.props.data.detail, this.$scope, 0)
    // this.props.data.vendorId && this.areaResize('desc', this.props.data.vendorId)
    return (
      <View className={styles.wrapper}>
        <Swiper
          className={styles.swiperWrapper}
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          {
            swiperList.map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <Image src={item} mode={"widthFix"} className={styles.swiperImage}></Image>
                </SwiperItem>
              )
            })
          }
        </Swiper>
        <View className={styles.infoWrapper}>
          <View className={styles.nameWrapper}>
            <View className={styles.nameContent}>
              <Text className={styles.name}>{this.props.data.name}</Text>
              <Text className={styles.oldPrice}>{this.props.data.costPrice}</Text>
            </View>
            <View className={styles.priceWrapper}>
              <Text className={styles.price}>{this.props.data.currentPrice}</Text>
              <Text className={styles.priceHint}>兑换价</Text>
            </View>
          </View>
          <View className={styles.numberWrapper}>
            <View className={styles.numberContent}><Text className={styles.label}>商品编号</Text><Text className={styles.value}>{this.props.data.goodsSn}</Text></View>
            <View className={styles.numberContent}><Text className={styles.label}>服务</Text><Text className={styles.value}>{this.props.data.services}</Text></View>
          </View>
        </View>
        {this.props.data.brief && <View className={styles.balingWrapper}>
          <View className={styles.balingContent}>
            <View className={styles.title}>规格与包装</View>
            <View>
              <RichText nodes={this.props.data.brief}></RichText>
            </View>
          </View>
        </View>}
        <View className={styles.balingWrapper}>
          <View className={styles.balingContent}>
            <View className={styles.title}>商品详情</View>
            <View>
              <import src='../../../components/wxParse/wxParse.wxml' />
              {/* eslint-disable-next-line react/forbid-elements */}
              <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
            </View>
          </View>
        </View>
        <GuessLike list={this.props.guesslike}></GuessLike>
        {/*fixed bottom start*/}
        <View className={styles.buyWrapper}>
          <View className={styles.priceTotal}>
            <Text className={styles.currentPrice}>{this.props.data.currentPrice}</Text>
            <Text className={styles.costPrice}>{this.props.data.costPrice}</Text>
          </View>
          <View className={styles.btnWrapper}>
            <View className={styles.cartWrapper} onClick={() => this.goCart()}>
              <View className={styles.cartIcon}>
                <Image src={CartIcon} className={styles.cartImg}></Image>
                <Text className={styles.cartNum}>{this.props.num}</Text>
              </View>
              <Text className={styles.cartText}>购物车</Text>
            </View>
            <View className={styles.buyContent}>
              <Text className={styles.cart} onClick={() => this.checkType(SET_CART)}>加入购物车</Text>
              <Text className={styles.buy} onClick={() => this.checkType(SET_BUY)}>立即购买</Text>
            </View>
          </View>
        </View>
        {/*fixed bottom end*/}

        {/*fixed dialog start*/}
        {this.state.showDialog && <BuyDialog
          data={this.props.data}
          onClose={this.CloseDialog}
          onConfirm={this.goNext}
        ></BuyDialog>}
        {/*fixed dialog end*/}
      </View>
    )
  }

  checkType = (type) => {
    if (!this.props.token) return dialog.toast({title: '请先登录'})
    this.nextType = type
    this.setState({
      showDialog: true
    })
  }

  CloseDialog = () => {
    this.setState({
      showDialog: false
    })
  }

  goNext = (num) => {
    if (this.nextType === SET_CART) {
      this.addCart(num)
    } else if (this.nextType == SET_BUY) {
      this.goPreview(num)
    }
    this.CloseDialog()
  }

  goPreview = async (num) => {
    let buys = []
    let obj = {goodsId: this.$router.params.id, nums: num}
    buys.push(obj)
    let params = {token: this.props.token, buys}
    await this.props.updateCart(params)
    Taro.navigateTo({url: '/pages/order/preview/index'})
  }

  addCart = (num) => {
    this.props.addCart({id: this.props.data.id, token: this.props.token, num})
    dialog.toast({title: '加入购物车成功~'})
  }

}
