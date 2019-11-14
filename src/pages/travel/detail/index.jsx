import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import {View, Image, Text, ScrollView, Button, RichText} from "@tarojs/components"
import { AtTabs, AtTabsPane } from 'taro-ui'
import {connect} from "@tarojs/redux"
import {getDetail, getTicketList} from './api'
import {dialog} from "@/util/index";
import NoData from "@/components/NoData";

@connect(({user}) => ({
  token: user.token
}))
export default class TravelHome extends Component{

  config = {
    navigationBarTitleText: '旅游详情'
  }

  state = {
    data: {},
    ticketList: [],
    current: 0
  }

  componentWillMount(): void {
    let token = this.props.token
    if (!token) return Taro.redirectTo({url: '/pages/Login/index'})
    let id = this.$router.params.id
    this.getInfo(id)
    this.getTicketList(id)
  }

  getInfo = async (id) => {
    try {
      const { data } = await getDetail({n: id})
      this.setState({data: data[0]})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  getTicketList = async (id) => {
    try {
      const { data } = await getTicketList({n: 1, m: 100, lid: id})
      this.setState({ticketList: data})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  goPreview = (id) => {
    Taro.navigateTo({url: '/pages/travel/preview/index?id=' + id})
  }

  render(): any {
    const { data, ticketList } = this.state
    return (
      <View className={styles.wrapper}>
        <Image className={styles.banner} src={data.uuimgpath}></Image>
        <View className={styles.container}>
          <View className={styles.info}>
            <View className={styles.priceWrapper}>
              <View className={styles.price}>{(+data.uutprice).toFixed(2)}</View>
              <Text className={styles.salePrice}>门市价</Text>
            </View>
            <View className={styles.name}>{data.uutitle}</View>
            <View className={styles.time}>营业时间：<Text className={styles.text}>{data.uuruntime}</Text></View>
            <View className={styles.time}>详细地址：<Text className={styles.text}>{data.uuaddress}</Text></View>
          </View>
          <View className={styles.ticketWrapper}>
            <View className={styles.title}>门票</View>
            <ScrollView
              className={styles.ticket}
              scrollY>
              {
                ticketList.map(item => {
                  return (
                    <View className={styles.item} key={item.uuid}>
                      <View style={'flex:2'}>
                        <View className={styles.ticketName}>{item.uutitle}</View>
                        <View className={styles.ticketPrice}>{(+item.uutprice).toFixed(2)}</View>
                      </View>
                      <View className={styles.makeOrder}>
                        <Button className={styles.btnPreview} onClick={() => this.goPreview(item.uuid)}>立即预定</Button>
                      </View>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
          <View className={styles.desc}>
            <AtTabs current={this.state.current} tabList={[
              { title: '景区须知' },
              { title: '景区简介' },
              { title: '交通指南' },
              { title: '旅游主题' },
            ]} onClick={this.handleClick.bind(this)}>
              <AtTabsPane current={this.state.current} index={0} >
                <View style={'background: #fff;padding: 10px;font-size: 14px;line-height:1.8;'}><Text>{data.uujqts}</Text></View>
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={1}>
                <View style={'background: #fff;padding: 10px;font-size: 14px;line-height:1.8;'}><RichText nodes={data.uubhjq}></RichText></View>
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={2}>
                <View style={'background: #fff;padding: 10px;font-size: 14px;line-height:1.8;'}><Text>{data.uujtzn}</Text></View>
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={3}>
                <View style={'background: #fff;padding: 10px;font-size: 14px;line-height:1.8;'}><Text>{data.uutopics}</Text></View>
              </AtTabsPane>
            </AtTabs>
          </View>
        </View>
      </View>
    )
  }

}
