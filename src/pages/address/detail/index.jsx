import Taro,{Component} from "@tarojs/taro"
import styles from './index.module.scss'
import {Text, View, Button, Input, Textarea, Picker} from "@tarojs/components"
import {connect} from "@tarojs/redux"
import { AtSwitch }  from 'taro-ui'
import {action} from '../store'
import {saveAddress} from "@/pages/address/api";
import {dialog} from "@/util/index";


@connect(({user, address}) => ({
  token: user.token,
  countryList: address.countryList,
  villageList: address.villageList,
  city: address.city,
  country: address.country,
  village: address.village,
  isAdd: address.isAdd,
  address: address.address
}), dispatch => ({
  getCity: (data) => dispatch(action.getCitySync(data)),
  getCountry: (data) => dispatch(action.getCountrySync(data)),
  getVillage: (data) => dispatch(action.getVillageSync(data))
}))
export default class AddressDetail extends Component{

  config ={
    navigationBarTitleText: '地址'
  }

  constructor(props){
    super(props)
    this.city = [
      { id: 1, name: '北京市' },
      { id: 2, name: '上海市' },
      { id: 3, name: '天津市' },
      { id: 4, name: '重庆市' },
      { id: 5, name: '河北省' },
      { id: 6, name: '山西省' },
      { id: 7, name: '河南省' },
      { id: 8, name: '辽宁省' },
      { id: 9, name: '吉林省' },
      { id: 10, name: '黑龙江省' },
      { id: 11, name: '内蒙古' },
      { id: 12, name: '江苏省' },
      { id: 13, name: '山东省' },
      { id: 14, name: '安徽省' },
      { id: 15, name: '浙江省' },
      { id: 16, name: '福建省' },
      { id: 17, name: '湖北省' },
      { id: 18, name: '湖南省' },
      { id: 19, name: '广东省' },
      { id: 20, name: '广西自治区' },
      { id: 21, name: '江西省' },
      { id: 22, name: '四川省' },
      { id: 23, name: '海南省' },
      { id: 24, name: '贵州省' },
      { id: 25, name: '云南省' },
      { id: 26, name: '西藏自治区' },
      { id: 27, name: '陕西省' },
      { id: 28, name: '甘肃省' },
      { id: 29, name: '青海省' },
      { id: 30, name: '宁夏省' },
      { id: 31, name: '新疆自治区' },
      { id: 32, name: '台湾' },
      { id: 84, name: '钓鱼岛' },
      { id: 52993, name: '港澳地区' },
      { id: 53283, name: '海外' },
    ]
    this.state = {
      indexArr: [0,0,0,0],
      area: '',
      code: '',
      name: '',
      tel: '',
      // eslint-disable-next-line taro/duplicate-name-of-state-and-props
      address: '',
      isDefault: false,
      id: ''
    }
  }

  onChange = e => {
    let indexArr = e.detail.value
    let province = this.city[indexArr[0]].name
    let provinceId = this.city[indexArr[0]].id
    let city = this.props.city[indexArr[1]].name
    let cityId = this.props.city[indexArr[1]].id
    let country = this.props.country[indexArr[2]] ? this.props.country[indexArr[2]].name : ''
    let countryId = this.props.country[indexArr[2]] ? this.props.country[indexArr[2]].id : 0
    let village = this.props.village[indexArr[3]] ? this.props.village[indexArr[3]].name : ''
    let villageId = this.props.village[indexArr[3]] ? this.props.village[indexArr[3]].id : 0
    let addressArr = []
    let ids = []
    addressArr.push(province)
    addressArr.push(city)
    if (country) addressArr.push(country)
    if (village) addressArr.push(village)
    ids.push(provinceId)
    ids.push(cityId)
    ids.push(countryId)
    ids.push(villageId)
    let area = addressArr.join(" ")
    let code = ids.join(',')
    this.setState({indexArr, area, code})
  }

  onhandleColumnChange = e => {
    let column = e.detail.column
    let index = e.detail.value
    if (column === 0) {
      this.props.getCity({id: this.city[index].id})
      this.setState(pre => ({ indexArr: [index,0,0,0]}))
    } else if (column === 1) {
      this.props.getCountry({id: this.props.city[index].id, countryList: this.props.countryList, villageList: this.props.villageList})
      this.setState(pre => ({ indexArr: [pre.indexArr[0],index,0,0]}))
    } else if (column === 2) {
      this.props.getVillage({id: this.props.country[index].id, list: this.props.villageList})
      this.setState(pre => ({ indexArr: [pre.indexArr[0],pre.indexArr[1],index,0]}))
    }
  }

  handleChange = value => {
    this.setState({isDefault: value})
  }

  componentWillMount() {
    let token = this.props.token
    if (!token) return Taro.redirectTo({url: `/pages/Login/index`})
    this.props.getCity({id: this.city[0].id})
    if (!this.props.isAdd) {
      const {address, area, areaCode, id, name, tel, isDefault } = this.props.address
      this.setState({address, area, code: areaCode, id, name, tel, isDefault: isDefault? true: false})
    }
  }

  _save = async () => {
    try {
      const { name, tel, id, isDefault, code, area, address } = this.state
      let token = this.props.token
      let params = { name, tel, id, isDefault: isDefault? 1: 0, code, area, address, token }
      await saveAddress(params)
      Taro.navigateBack()
    } catch (e) {
      await dialog.toast({title: e})
    }
  }

  render(): any {
    let arr = [this.city, this.props.city, this.props.country, this.props.village]
    return (
      <View className={styles.wrapper}>
        <View className={styles.container}>
          <View className={styles.item}>
            <Text className={styles.label}>收货人</Text>
            <Input className={styles.input} placeholder={'请填写收货人姓名'} value={this.state.name} onInput={(e) => this.setState({name: e.target.value})}></Input>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>手机号码</Text>
            <Input className={styles.input} placeholder={'请填写收货人手机号'} value={this.state.tel} onInput={(e) => this.setState({tel: e.target.value})}></Input>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>所在地区</Text>
            <Picker style={'flex: 1'} mode={'multiSelector'} range={arr} rangeKey={'name'} value={this.state.indexArr} onChange={this.onChange} onColumnChange={this.onhandleColumnChange}>
              <Input className={styles.input} placeholder={'省市区县，乡镇等'} value={this.state.area} style={'width: 100%'}></Input>
            </Picker>
          </View>
          <View className={styles.desc}>
            <Text className={styles.label}>详细地区</Text>
            <Textarea placeholder={'详细地址'} className={styles.area} value={this.state.address} onInput={(e) => this.setState({address: e.target.value})}></Textarea>
          </View>
        </View>
        <AtSwitch title='设为默认地址' checked={this.state.isDefault} onChange={this.handleChange} />
        <Button className={styles.add} onClick={this._save}>保存</Button>
      </View>
    )
  }
}
