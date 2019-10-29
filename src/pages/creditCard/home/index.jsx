import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input, Swiper, SwiperItem } from "@tarojs/components"
import './index.scss'
import { AtInput  } from 'taro-ui'
import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";
import {cards} from '../api'


@connect(({user}) => ({
  info: user.info,
  token: user.token,
}), dispatch => ({

}))


export default class CreditHome extends Component {
  config ={
    navigationBarTitleText: '信用卡还款'
  }

  constructor(){
    super(...arguments)
    this.state = {
      cardsList:[]
    }
  }


  componentWillMount() { //将要装载
    this.getCards();
  }

  //信用卡
  getCards = async() => {
    let res= await cards({token: this.props.token});
    if(res.error_code!=0) return dialog.toast({title: res.message});
    this.setState({cardsList:res.data})
  }

  render(){
    return (
      <View className="creditHome">
          信用卡还款
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay
            skipHiddenItemLayout='true'>
            <SwiperItem>
              <View className='demo-text-1'>1</View>
            </SwiperItem>
            <SwiperItem className='item'>
              <View className='demo-text-2'>2</View>
            </SwiperItem>
            <SwiperItem className='item'>
              <View className='demo-text-3'>3</View>
            </SwiperItem>
          </Swiper>
      </View>
    )
  }
}
