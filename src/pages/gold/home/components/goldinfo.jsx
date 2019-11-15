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
    this.selectList=['产品介绍', '回购须知', '检测报告', '常见问题']
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

        {this.props.gold.id==0? (<View>
            {this.state.current === 0 &&
              <View className='tab-content'>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-01-01.2d349f9b.jpg'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-01-02.bae72d93.jpg'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-01-03.e2d5dccd.jpg'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-01-04.5ceb7d22.jpg'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-01-05.b0315b23.jpg'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-01-06.97f47df1.jpg'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-01-07.ad1d6cf1.jpg'} mode="widthFix"></Image>
              </View>}
            {this.state.current === 1 &&
              <View className='tab-content'>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-02.3881755f.png'} mode="widthFix"></Image>
              </View>}
            {this.state.current === 2 &&
              <View className='tab-content'>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-03.47778b42.png'} mode="widthFix"></Image>
              </View>}
            {this.state.current === 3&&
              <View className='tab-content'>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/bar-04.b077bc64.png'} mode="widthFix"></Image>
              </View>}
        </View>):(<View>
            {this.state.current === 0 &&
              <View className='tab-content'>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/sand-01-01.f0466b22.jpg'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/sand-01-02.7d0acee9.jpg'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/sand-01-03.ba5d01f9.jpg'} mode="widthFix"></Image>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/sand-01-04.d2de7404.jpg'} mode="widthFix"></Image>
              </View>}
            {this.state.current === 1&&
              <View className='tab-content'>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/sand-02.603540c0.png'} mode="widthFix"></Image>
              </View>}
            {this.state.current === 2&&
              <View className='tab-content'>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/sand-03.ace5cdd8.png'} mode="widthFix"></Image>
              </View>}
            {this.state.current === 3&&
              <View className='tab-content'>
                <Image  src={'https://mall.cocogc.cn/ticket/static/img/sand-04.056cb5f8.png'} mode="widthFix"></Image>
              </View>}
        </View>)}
      </View>
    )
  }
}
