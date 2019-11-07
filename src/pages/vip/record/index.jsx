import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";



export default class VipHome extends Component {
  config ={
    navigationBarTitleText: '卡券记录'
  }

  constructor(){
    super(...arguments)
  }
  render(){
    return(
      <View className="vipRecord">

      </View>
    )
  }

}
