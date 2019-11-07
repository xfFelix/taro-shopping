import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input,RichText} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";
import {getVipList} from '../api';
import { AtInput  } from 'taro-ui';



@connect(({vip}) => ({
  vip,
}), dispatch => ({
  setProductType: (data) => dispatch(productTypeFun(data)),
  setCostType:(data)=> dispatch(costTypeFun(data))
}))


export default class VipHome extends Component {
  config ={
    navigationBarTitleText: '会员卡券',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
    this.state = {
      inpNum:'',
      selectType:0,
      typeIndex:0,
      selectList:[]
    }
  }

  componentWillMount() { //将要装载
    if(this.props.vip.costType==1){

    }
    this.getList();
  }


  handleChange=(value,event)=>{

  }

  getList = async()=>{
    let res= await getVipList({productType:this.props.vip.productType});
    if(res.code!=1) return dialog.toast({title: res.message});
    this.setState({selectList:res.data})
  }

  timeType=(val)=>{
    switch (val){
      case '1':
        return '周卡';
      case '2':
        return '月卡';
      case '3':
        return '季卡';
      case '4':
        return '半年卡';
      default:
        return '年卡';
    }
  }

  faceType=(item,index)=>{
    this.setState({typeIndex:index});
  }

  render(){
    return(
      <View className="vipCard">
        { this.props.vip.costType==1?
          (<View className="headTop">
            <View className="buy">
              <Image src={'https://mall.cocogc.cn/static/images/logo/jd.png'} className="logoGreen"></Image>
              <View className="input-flex">
                <AtInput
                  name='inpNum'
                  type='number'
                  value={this.state.inpNum}
                  onChange={this.handleChange.bind(this)}
                  border={false}
                />
              </View>
            </View>
          </View>):''
        }

        <View className="selectWrap">
          <View className="yezifen">椰子分余额：<Text className="score">20222</Text></View>
          <View className="typeWrap">
            <View className="typeTitle">种类：</View>
              {
                this.state.selectList.map((items,indexs)=>{
                  return(
                    <View
                      key={indexs}
                      className={this.state.selectType==indexs?'select isSelect':'select noSelect'}
                      onClick={() => this.setState({selectType:indexs,typeIndex:0})}
                    >{items[0]}</View>
                  )
                })
              }
          </View>

          <View  className="faceWrap">
            <View className="faceTitle">面值：</View>
            {
              this.state.selectList[this.state.selectType] && this.state.selectList[this.state.selectType][1].map((item,index)=>{
                return(
                  <View key={index} className="faceInfo"  onClick={()=>this.faceType(item,index)}>
                      <View className={this.state.typeIndex==index?"faceOne isSelect":'faceOne noSelect'}>
                        <View className="faceType">{this.timeType(item.productType)}</View>
                        <View className="faceValue">售价：{item.sellingPrice}</View>
                      </View>
                      <View className="faceMarket">刊例价：{item.marketPrice}</View>
                    </View>
                )
              })
            }
          </View>

          <View  className="tipWrap">
            <View className="tipTitle">温馨提示：</View>
            <RichText nodes={this.state.selectList[this.state.selectType] && this.state.selectList[this.state.selectType][2]} />
          </View>
        </View>
      </View>
    )
  }

}
