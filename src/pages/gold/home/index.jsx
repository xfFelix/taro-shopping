import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text} from "@tarojs/components"
import styles from './index.module.scss'

import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";

export default class GoldHome extends Component {

  config ={
    navigationBarTitleText: '黄金兑换'
  }

  state = {

  }

  render(){
    return (
      <View>
        黄金兑换
      </View>
    )
  }
}
