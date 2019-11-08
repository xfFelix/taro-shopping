import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Image, Text, View, Input, Picker, CheckboxGroup, Checkbox, Button } from "@tarojs/components"
import { AtIcon } from 'taro-ui'
import {connect} from "@tarojs/redux"
import { action } from '../store'
import {dialog} from "@/util/index"
import {getContentSync} from "@/pages/protocol/store/action";

@connect(({user, life}) => ({
  token: user.token,
  config: life.config,
  typeList: life.typeList,
  groupList: life.groupList,
  question: life.question,
  protocol: life.protocol
}), dispatch => ({
  setConfig: (data)=> dispatch(action.setConfigSync(data)),
  getContent: (data) => dispatch(getContentSync(data))
}))
export default class lifeHome extends Component{

  config ={
    navigationBarTitleText: '新增缴费账户',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  state = {
    value: '',
    checked: true
  }

  constructor(){
    super(...arguments)
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
  }

  findNameByType(id) {
    const filter = this.props.typeList.reduce((pre, cur) => {
      pre[cur.type] = cur.name
      return pre
    }, {})
    return filter[+id]
  }

  findIconByType(id) {
    const filter = this.props.typeList.reduce((pre, cur) => {
      pre[cur.type] = cur.icon
      return pre
    }, {})
    return filter[+id]
  }

  findNameByGroup(id) {
    const filter = this.props.groupList.reduce((pre, cur) => {
      pre[cur.id] = cur.label
      return pre
    }, {})
    return filter[+id]
  }

  onPicker = (e) => {
    let grp = +e.detail.value
    this.props.setConfig({grp})
  }

  handlerInput = (e) => {
    this.setState({value: e.detail.value})
  }

  goQuestion = () => {
    this.props.getContent(this.props.question)
    Taro.navigateTo({url: '/pages/protocol/index'})
  }

  goProtocol = () => {
    this.props.getContent(this.props.protocol)
    Taro.navigateTo({url: '/pages/protocol/index'})
  }

  goNext = () => {
    this.props.setConfig({pn: this.state.value})
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.item} style={'padding: 0 30rpx;'} onClick={() => Taro.redirectTo({url: '/pages/life/city/index'})}>
          <View className={styles.name}>
            <Image src={this.findIconByType(this.props.config.type)} className={styles.iconImg}></Image>
            <Text>{this.findNameByType(this.props.config.type)}</Text>
          </View>
          <View className={styles.name}>
            <Text>{this.props.config.city}</Text>
            <View className={styles.right}>
              <AtIcon value='chevron-right' size='20' color='#000'></AtIcon>
            </View>
          </View>
        </View>
        <View className={styles.content}>
          <View className={styles.item}>
            <Text>缴费单位</Text>
            <Text>{this.props.config.productName}</Text>
          </View>
          <View className={styles.item}>
            <Text>用户编号</Text>
            <View className={styles.flex}>
              <Input placeholder={'请输入用户编号'} value={this.state.value} onInput={this.handlerInput}></Input>
              <Text className={styles.price} onClick={() => this.goQuestion()}>如何查户号</Text>
            </View>
          </View>
          <View className={styles.item}>
            <Text>分组</Text>
            <View className={styles.flex}>
              <Picker mode='selector' onChange={this.onPicker} value={this.props.config.grp} range={this.props.groupList} rangeKey={'text'}>
                <Text>{this.findNameByGroup(this.props.config.grp)}</Text>
              </Picker>
              <View className={styles.right}>
                <AtIcon value='chevron-right' size='20' color='#000'></AtIcon>
              </View>
            </View>
          </View>
        </View>
        <View className={styles.checkbox}>
          <CheckboxGroup onChange={(e) => this.setState(pre => ({checked: !pre.checked}))}>
            <Checkbox checked={this.state.checked}>我已阅读并同意</Checkbox>
          </CheckboxGroup>
          <Text className={styles.protocol} onClick={() => this.goProtocol()}>《椰云网络生活缴费服务协议》</Text>
        </View>
        <Button disabled={!this.state.checked || !this.state.value} className={styles.next} onClick={() => this.goNext()}>下一步</Button>
      </View>
    )
  }
}
