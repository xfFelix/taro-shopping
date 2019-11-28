import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import {View, Image, Text, ScrollView, Button, Input} from "@tarojs/components"
import {AtInputNumber} from 'taro-ui'
import {connect} from "@tarojs/redux"
import {getDetail, getTicketList, getOrderPreview, submitOrder} from './api'
import {dialog, validate} from "@/util/index";
import PayPassword from "@/components/PayPassword";
import {setParams} from "@/pages/success/store/action"

@connect(({user}) => ({
  token: user.token,
  info: user.info
}), dispatch =>({
  goSuccess: (data) => dispatch(setParams(data))
}))
export default class TravelHome extends Component{

  config = {
    navigationBarTitleText: '门票预订'
  }

  state = {
    data: {},
    ticketList: [],
    current: 0,
    price: '',
    preview: {},
    num: 1,
    name: '',
    mobile: '',
    idCard: '',
    showCode: false,
    playtime: ''
  }

  componentWillMount(): void {
    let token = this.props.token
    if (!token) return Taro.redirectTo({url: '/pages/Login/index'})
    let id = this.$router.params.id
    this.getTicketInfo(id)
    this.getTicketList(id)
  }

  getTicketInfo = async (id) => {
    try {
      const { data } = await getDetail({id})
      this.setState({data: data[0]})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  getTicketList = async (id) => {
    try {
      const { data } = await getTicketList({id})
      this.setState({ticketList: data, price: data[0].retail_price, playtime: data[0].date}, () => {
        this.getOrderPreview()
      })
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  getOrderPreview = async () => {
    try {
      const { token } = this.props
      const { num, price } = this.state
      const { data } = await getOrderPreview({token, num, price})
      this.setState({preview: data[0]})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  handleChange (value) {
    this.setState({num: value}, () => this.getOrderPreview())
  }

  selectDate = (item, index) => {
    this.setState({current: index, price: item.retail_price, playtime: item.date}, () => {
      this.getOrderPreview()
    })
  }

  validate = () => {
    const { name, mobile, idCard, preview } = this.state
    const { info } = this.props
    if (!name) return dialog.toast({title: '请输入姓名'})
    if (!mobile || !validate.IsMobile(mobile)) return dialog.toast({title: '请输入正确的手机号'})
    if (!idCard) return dialog.toast({title: '请输入身份证'})
    if (info.score < preview.total) return dialog.toast({title: '积分余额不足'})
    this.setState({showCode: true})
  }

  submitOrder = async (code) => {
    try {
      const { token } = this.props
      const { id } = this.$router.params
      const { name, mobile, idCard, num, playtime } = this.state
      let config = {code, name, mobile, personID: idCard, playtime, tid: id, tnum: num, token}
      const { data } = await submitOrder(config)
      this.props.goSuccess({price:this.state.preview.total, path: { home: '/pages/travel/home/index', order: ''}})
      Taro.navigateTo({url: '/pages/success/index'})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  render(): any {
    const {data, preview, ticketList, num, current, name, mobile, idCard, showCode} = this.state
    const { info } = this.props
    return (
      <View className={styles.wrapper}>
        <View className={styles.ticket}>
          <View className={styles.info}>
            <View className={styles.image}>
              <Image src={data.uuimgpath}></Image>
            </View>
            <View className={styles.ticketInfo}>
              <View className={styles.ticketName}>{data.uultitle}</View>
              <View className={styles.ticketName}>{data.uutitle}</View>
              <View className={styles.ticketPrice}>{(+data.uutprice).toFixed(2)}</View>
            </View>
          </View>
          <View className={styles.list}>
            <View className={styles.useDate}>使用日期</View>
            <ScrollView className={styles.ticketList} scrollX >
              {
                ticketList.map((item, index) => {
                  return (
                    <View className={current == index? `${styles.item} ${styles.active}`: styles.item} key={item.date} onClick={() => this.selectDate(item, index)}>
                      <View className={styles.date}>{item.date}</View>
                      <View className={styles.price}>{item.retail_price}</View>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
          <View className={styles.buyNum}>
            <View className={styles.buyText}>购买数量</View>
            <View>
              <AtInputNumber
                min={1}
                max={99}
                step={1}
                value={num}
                onChange={this.handleChange.bind(this)}
              />
            </View>
          </View>
        </View>
        <View className={styles.card}>
          <View className={styles.title}>
            <Text className={'iconfont icon-My'} style={'color: #000;font-size:18px;margin-right: 5px'}></Text>
            <Text className={styles.text}>取票人信息</Text>
          </View>
          <View className={styles.input}>
            <Text className={styles.label}>姓名</Text>:
            <Input placeholder={'请输入真实姓名'} value={name} onInput={(e) => this.setState({name: e.detail.value})}></Input>
          </View>
          <View className={styles.input}>
            <Text className={styles.label}>手机号</Text>:
            <Input placeholder={'请输入手机号'} value={mobile} onInput={(e) => this.setState({mobile: e.detail.value})}></Input>
          </View>
          <View className={styles.input}>
            <Text className={styles.label}>证件类型</Text>:
            <Input placeholder={'请选择证件类型'} disabled value={'身份证'}></Input>
          </View>
          <View className={styles.input}>
            <Text className={styles.label}>证件号码</Text>:
            <Input placeholder={'请输入证件号码'} value={idCard} onInput={(e) => this.setState({idCard: e.detail.value})}></Input>
          </View>
        </View>
        <View className={styles.card}>
          <View className={styles.title}>
            <Text className={'iconfont icon-shangpinxiangqing'} style={'color: #000;font-size:18px;margin-right: 5px'}></Text>
            <Text className={styles.text}>费用详情</Text>
          </View>
          <View className={styles.line}>
            <View className={styles.name}>门票总额</View>
            <View className={styles.value}>{(+preview.amount).toFixed(2)}</View>
          </View>
          <View className={styles.line}>
            <View className={styles.name}>服务费</View>
            <View className={styles.value}>{(+preview.service_fee).toFixed(2)}</View>
          </View>
          <View className={styles.line}>
            <View className={styles.name}>余额</View>
            <View className={styles.value}>{info && (+info.score).toFixed(2)}</View>
          </View>
        </View>
        <View className={styles.fixed}>
          <View className={styles.total}>
            合计：<Text className={styles.totalPrice}>{preview.total}</Text>
          </View>
          <View className={styles.submit} onClick={() => this.validate()}>提交订单</View>
        </View>
        {showCode && <PayPassword isClosed onBack={() => this.setState({showCode: false})} onConfirm={(val) => this.submitOrder(val)}></PayPassword>}
      </View>
    )
  }

}
