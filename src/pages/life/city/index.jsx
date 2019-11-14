import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import { Text, View, Input } from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { AtIcon, AtIndexes } from 'taro-ui'
import { action } from '../store'
import {dialog} from "@/util/index"
import {getCity} from "@/pages/life/city/api";

@connect(({user, life}) => ({
  token: user.token,
  config: life.config
}), dispatch => ({
  setConfig: (data)=> dispatch(action.setConfigSync(data))
}))
export default class lifeCity extends Component{

  config ={
    navigationBarTitleText: '选择地区',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
  }

  state = {
    list: [],
    search: ''
  }

  componentWillMount() {
    if (!this.props.token) return Taro.redirectTo({url: `/pages/Login/index`})
    this.getCities()
  }

  getCities = async (city='') => {
    const {data} = await getCity({type: this.props.config.type, city})
    let list = []
    for (let store of data) {
      let obj = {items:[]}
      obj.title = obj.key = store.py
      for (let item of store.cities) {
        obj.items.push({name: item})
      }
      list.push(obj)
    }
    this.setState({list})
  }

  searchCity = (value) => {
    this.setState({search: value}, () => {
      clearTimeout(this.timeOut)
      this.timeOut = setTimeout(() => {
        this.getCities(value)
      }, 1000)
    })
  }

  goUnit = (item) => {
    this.props.setConfig({city: item.name})
    Taro.redirectTo({url: '/pages/life/unit/index'})
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <AtIndexes
          list={this.state.list}
          isVibrate={false}
          animation={true}
          isShowToast={false}
          onClick={(item) => this.goUnit(item)}
        >
          <View className={styles.search}>
            <View className={styles.searchImg}>
              <AtIcon value='search' size='20' color='#ccc'></AtIcon>
            </View>
            <Input placeholder={'请选择地区'} className={styles.searchInput} value={this.state.search} onInput={(e) => this.searchCity(e.target.value)}></Input>
          </View>
        </AtIndexes>
      </View>
    )
  }
}
