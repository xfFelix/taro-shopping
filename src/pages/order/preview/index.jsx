import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View} from "@tarojs/components"
import Address from "@/pages/tab/Cart/components/address"
import {connect} from "@tarojs/redux"
import {getAddressSync} from "@/pages/tab/Cart/store/action"
import {action} from './store'
import PayPassword from "@/components/PayPassword"
import {dialog} from "@/util/index";
import {saveOrder} from './api'
import {setParams} from "@/pages/success/store/action";

@connect(({cart, user, preview}) => ({
  address: cart.address,
  token: user.token,
  list: preview.list,
  total: preview.total,
  haveMoney: preview.haveMoney,
  errMsg: preview.errMsg,
  isDefault: cart.isDefault
}), dispatch => ({
  getDefaultAddress: (data) => dispatch(getAddressSync(data)),
  getPreviewOrder: (data) => dispatch(action.getPreviewOrderSync(data)),
  setParams: (data) => dispatch(setParams(data))
}))
export default class Preview extends Component{

  config ={
    navigationBarTitleText: '订单预览'
  }

  state = {
    showCode: false
  }

  constructor(){
    super(...arguments)
  }

  async componentDidMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    if (this.props.isDefault) {
      await this.props.getDefaultAddress({token: this.props.token})
    }
    this.props.getPreviewOrder({token: this.props.token, id: this.props.address.id})
  }

  validCode = () => {
    if (!this.props.haveMoney) return dialog.toast({title: this.props.errMsg})
    this.setState({
      showCode: true
    })
  }

  submitOrder = async (value) => {
    try{
      Taro.showLoading({mask:true})
      this.setState({ showCode: false})
      let params = { id: this.props.address.id, token: this.props.token, code: value }
      const { data } = await saveOrder(params)
      Taro.hideLoading()
      // 设置成功页面的展示信息
      let config = {price: data[0].totalMoney, path:{ home: '/pages/tab/Home/index', order: '/pages/order/list/index'}}
      await this.props.setParams(config)
      Taro.redirectTo({url: '/pages/success/index'})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.address}>
          <Address address={this.props.address}></Address>
        </View>
        <View className={styles.content}>
          {
            this.props.list.map((store, index) => {
              return (
                <View className={styles.store} key={index + ''}>
                  <View className={styles.title}>
                    <Image src={'https://mall.cocotc.cn/static/images/cart/supermarket.png'} className={styles.supermarket}></Image>
                    <Text className={styles.storeName}>{store.vendorId}</Text>
                    <Text className={styles.size}>({store.goodsList.length})</Text>
                  </View>
                  {
                    store.goodsList.map((item) => {
                      return (
                        <View className={styles.goods} key={item.goodsId + ''}>
                          <Image className={styles.image} src={item.picUrl}></Image>
                          <View className={styles.info}>
                            <View className={styles.name}>{item.goodsName}</View>
                            <View className={styles.priceWrapper}>
                              <View className={styles.priceContainer}>
                                <Image className={styles.logo} src={'https://mall.cocotc.cn/static/images/cart/icon.png'}></Image>
                                <Text className={styles.price}>{item.buyPrice.toFixed(2)}</Text>
                              </View>
                              <View className={styles.num}>x{item.buyNum}</View>
                            </View>
                          </View>
                        </View>
                      )
                    })
                  }
                  <View className={styles.total}>
                    <View className={styles.item}>
                      <Text>商品</Text>
                      <Text>{store.sellMoney}</Text>
                    </View>
                    <View className={styles.item}>
                      <Text>运费</Text>
                      <Text>{store.shippingFee}</Text>
                    </View>
                    <View className={styles.item}>
                      <Text>服务费</Text>
                      <Text>{store.serviceMoney}</Text>
                    </View>
                    <View className={styles.item}>
                      <Text>合计</Text>
                      <Text>{store.totalMoney}</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View className={styles.fixed}>
          <View className={styles.allTotal}>{this.props.total}</View>
          <View className={styles.confirm} onClick={() => this.validCode()}>提交订单</View>
        </View>
        {/* dialog start */}
        { this.state.showCode && <PayPassword onConfirm={(value) => this.submitOrder(value)}></PayPassword>}
        {/* dialog end */}
      </View>
    )
  }
}
