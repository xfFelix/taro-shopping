import Taro,{Component} from "@tarojs/taro"
import {View, Text} from "@tarojs/components"
import './goldinfo.scss'
import { AtSegmentedControl } from 'taro-ui'

import {connect} from "@tarojs/redux"
import {dialog} from "@/util";
import {goldTypeFun} from "@/pages/gold/store/action"


@connect(({gold}) => ({
  gold,
}), dispatch => ({
  setGoldId: (data) => dispatch(goldTypeFun(data)),
}))

export default class GoldInfo extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      current: 0,
    }
    this.selectList=['产品介绍', '回购须知', '常见问题']
  }
  render(){
    return(
      <View className="goldInfo">
          <View className="selectWrap">
            {
              this.selectList.map((item,index)=>{
                return (
                  <Text
                    key={index}
                    onClick={() => this.setState({current:index})}
                    className={this.state.current==index?'active select':'select'}
                  >
                    {item}
                  </Text>
                )
              })
            }
          </View>

        <View>
            {this.state.current === 0 &&
              <View className='tab-content'>
                <Image  src={'https://mall.cocotc.cn/ticket/static/img/fruit-1-1.2b22fc64.png'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocotc.cn/ticket/static/img/fruit-1-2.3f86958a.png'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocotc.cn/ticket/static/img/fruit-1-3.82e86861.png'} mode="widthFix"></Image>
              </View>}
            {this.state.current === 1 &&
              <View className='tab-content'>
                <Image  src={'https://mall.cocotc.cn/ticket/static/img/fruit-2.d9f31cc0.png'} mode="widthFix"></Image>
              </View>}
            {this.state.current === 2 &&
              <View className='tab-content'>
                <Image  src={'https://mall.cocotc.cn/ticket/static/img/fruit-3.b23626e1.png'} mode="widthFix"></Image>
              </View>}
        </View>
      </View>
    )
  }
}
