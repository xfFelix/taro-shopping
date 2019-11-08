import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog} from "@/util/index";


import {productTypeFun,costTypeFun} from "@/pages/vip/store/action"


@connect(({vip,user}) => ({
  vip,
  info: user.info
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
    this.selectList=[
      { title: '爱奇艺', id: 2, img: 'img02', costWay:'1' },
      { title: '腾讯视频', id: 3, img: 'img03', costWay:'1' },
      { title: '腾讯体育', id: 4, img: 'img16' , costWay:'1'},
      { title: '优 酷', id: 1, img: 'img01' , costWay:'1'},
      { title: '芒果TV', id: 5, img: 'img04', costWay:'1' },
      { title: '搜狐视频', id: 6, img: 'img05' , costWay:'1'},
      { title: '网易云音乐', id: 8, img: 'img07', costWay:'1' },
      { title: 'QQ音乐', id: 10, img: 'img09' , costWay:'1'},
      { title: '沃尔玛', id: 15, img: 'img26' , costWay:'2'},
      { title: '永辉超市', id: 16, img: 'img27' , costWay:'2'},
      { title: '家乐福', id: 17, img: 'img17', costWay:'2' },
      { title: '麦德龙', id: 18, img: 'img18' , costWay:'2'},
      { title: '盒马鲜生', id: 19, img: 'img19' , costWay:'2'},
      { title: '哈根达斯', id: 21, img: 'img21', costWay:'2' },
      { title: '歌帝梵', id: 22, img: 'img22', costWay:'2' },
      { title: '瑞幸咖啡', id: 23, img: 'img23', costWay:'2' },
      { title: '滴滴快车', id: 24, img: 'img24', costWay:'2' },
    ]
  }


  jumpCardType = (val)=>{
    this.props.setProductType(val.id);
    this.props.setCostType(val.costWay)
    Taro.navigateTo({url:'/pages/vip/cardType/index'})
  }

  render(){
    return(
      <View className="vipHome">
        <View className="infoWrap">
          <View className="infoLeft"><Text className="name">椰子分约</Text><Text className="score">{this.props.info.score}</Text></View>
          <View className="infoRight" onClick={()=>Taro.navigateTo({url:'/pages/vip/record/index'})}>兑换记录 ></View>
        </View>
        <View>
          {
            this.selectList.map((item,index)=>{
              return(
                <View className="imgWrap" onClick={()=>this.jumpCardType(item)} key={item.id}>
                    <View className="imgBg flex-center">
                      <Image src={`https://tmall.cocogc.cn/static/images/vip/cardTicket_${index<9?'0'+(index+1):index+1}.png`} mode="widthFix"/>
                    </View>
                    <View>{item.title}</View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }

}
