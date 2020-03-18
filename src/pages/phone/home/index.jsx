import Taro,{Component} from "@tarojs/taro"
import {View, Image, Text,Input} from "@tarojs/components"
import { AtInput  } from 'taro-ui'
import './index.scss'
import {connect} from "@tarojs/redux"
import {dialog,filter,validate} from "@/util/index";
import Dialog from "@/components/dialog";
import {phoneTypeFun,dirPriceFun,cardPriceFun} from "@/pages/phone/store/action";
import {directQuery,cardQuery,phoneCharge,phoneTax} from '../api';
import PayPassword from "@/components/PayPassword";
import {setParams} from "@/pages/success/store/action";

@connect(({phone,user}) => ({
  phoneType:phone.phoneType,
  dirPrice:phone.dirPrice,
  cardPrice:phone.cardPrice,
  info: user.info,
  token: user.token,
}), dispatch => ({
  setType:(data)=>dispatch(phoneTypeFun(data)),
  setDirPrice:(data)=>dispatch(dirPriceFun(data)),
  setCardPrice:(data)=>dispatch(cardPriceFun(data)),
  setParams: (data) => dispatch(setParams(data))
}))



export default class PhoneHome extends Component {
  config ={
    navigationBarTitleText: '话费充值',
    navigationBarBackgroundColor: '#313340',
    navigationBarTextStyle: 'white'
  }

  constructor(){
    super(...arguments)
    this.state={
      tabList:[
        {id:0,name:'直充'},
        {id:1,name:'充值卡'},
      ],
      inpNum:'',
      dirList:{},
      cardList:{},
      dirIndex:0,
      cardIndex:2,
      phoneCan:false,
      noGoods:['1','5'],
      showInfo: false,
      showCode: false,
      taxInfo:{}
    }
  }

  componentWillMount() { //将要装载
    this.dirPriceQuery();
    this.cardPriceQuery();
  }


  dirPriceQuery=async()=>{
    let res = await directQuery({token:this.props.token});
    if(res.error_code!=0) return dialog.toast({title: res.message});
    this.setState({dirList:res.data});
    this.props.setDirPrice({facePrice:Object.keys(res.data)[0],realPrice:Object.values(res.data)[0]})
  }

  cardPriceQuery=async()=>{
    let res = await cardQuery({token:this.props.token});
    if(res.error_code!=0) return dialog.toast({title: res.message});
    this.setState({cardList:res.data});
    this.props.setCardPrice({facePrice:Object.keys(res.data)[this.state.cardIndex],realPrice:Object.values(res.data)[this.state.cardIndex]})
  }


  submitOrder = async (val) => {
    try{
      let res = await phoneCharge({
        token:this.props.token,
        amount:this.props.phoneType==0?this.props.dirPrice.realPrice:this.props.cardPrice.realPrice,
        verify_code:val,
        // type:this.state.typeId,
        mobile:this.props.phoneType==0?this.state.inpNum:'',
        type:this.props.phoneType,
      });
      this.onClose();
      if(res.error_code!=0){ return dialog.toast({title: res.message})}
      // 设置成功页面的展示信息
      let config = {price: 5, path:{ home: '/pages/tab/Home/index', order: '/pages/phone/record/index'}}
      await this.props.setParams(config)
      Taro.redirectTo({url: '/pages/success/index'})
    } catch (e) {
      dialog.toast({title: e.message})
    }
  }



  priceTax=async()=>{
    let res = await phoneTax({amount:this.props.phoneType==0?this.props.dirPrice.realPrice:this.props.cardPrice.realPrice, token: this.props.token});
    if(res.error_code!=0) return dialog.toast({title: res.message});
    this.setState({taxInfo:res.data}, () => {
      this.onShowInfo();
    });
  }


  tabChange(typeId){
    this.props.setType(typeId);
    if(typeId==1){
      this.setState({phoneCan:true})
    }else{
      if(!validate.IsMobile(this.state.inpNum)){
        this.setState({phoneCan:false})
      }
    }
  }

  dirClick(obj, key){
    if(!this.state.phoneCan) return;
    this.setState({dirIndex:key});
    this.props.setDirPrice({facePrice:obj,realPrice:this.state.dirList[obj]})
  }

  cardClick(obj, key){
    if(this.state.noGoods.includes(obj)) return false;
    this.setState({cardIndex:key});
    this.props.setCardPrice({facePrice:obj,realPrice:this.state.cardList[obj]});
  }

  handleChange=(value,event)=>{
    this.setState({inpNum:value}, async () => {
      if(validate.IsMobile(value)){
        try {
          const { data } = await directQuery({token:this.props.token, mobile: value});
          this.setState({phoneCan:true, dirList: data});
          this.props.setDirPrice({facePrice:Object.keys(data)[0],realPrice:Object.values(data)[0]})
        } catch (e) {
          dialog.toast({title: e.message})
        }
      }else{
        this.setState({phoneCan:false});
      }
    })
  }

  changeNow=()=>{
    const {info, dirPrice, phoneType, cardPrice} = this.props;
    if (phoneType == 0) {
      if (info.score < dirPrice.realPrice) return dialog.toast({title: '积分余额不足'})
    } else {
      if (info.score < cardPrice.realPrice) return dialog.toast({title: '积分余额不足'})
    }
    if( this.props.phoneType==0 ){
      if(this.state.phoneCan && this.state.inpNum){
        this.priceTax();
      }
    }
    if(this.props.phoneType==1 && this.state.phoneCan){
      this.priceTax();
    }
  }

  render(){
    return(
      <View className="phoneHome">
        <View className="phoneBanner">
          <View className="phoneSelect">
            {
              this.state.tabList.map((item,index)=>{
                return(
                  <Text
                    onClick={() => this.tabChange(item.id)}
                    key={item.id}
                    className={this.props.phoneType==index?"active tab":'tab'}
                  >
                  {item.name}</Text>
                )
              })
            }
          </View>

          {this.props.phoneType==0&&(<View className="buy">
          <Image src={'https://mall.cocotc.cn/static/images/cart/icon.png'} className="logoGreen"></Image>
            <View className="input-flex">
              <AtInput
                name='inpNum'
                type='number'
                placeholder='请输入充值手机号码'
                value={this.state.inpNum}
                onChange={this.handleChange.bind(this)}
                border={false}
              />
            </View>
          </View>)}

          {this.props.phoneType==1&&(
            <View className="recodeWrap score-card">
              <View className="score">
                <Text className="score-name">积分余额：</Text> <Text className="score">{this.props.info.score}</Text>
              </View>
              <Text className="goRecode" onClick={()=>Taro.navigateTo({url:'/pages/phone/record/index'})}>兑换记录 &gt;</Text>
            </View>
          )}
        </View>

        {this.props.phoneType==0&&(
          <View className="recodeWrap score-dir">
            <View className="score">
              <Text className="score-name">积分余额：</Text> <Text className="score">{this.props.info.score}</Text>
            </View>
            <Text className="goRecode" onClick={()=>Taro.navigateTo({url:'/pages/phone/record/index'})}>兑换记录 &gt;</Text>
          </View>
        )}


        {
          this.props.phoneType==0?(
            // 直充
            <View className="phoneBill-direct" >
              <View className={this.state.phoneCan?'phoneBill-typeU phoneCan':'phoneBill-typeU'}>
                {
                  Object.keys(this.state.dirList).map((obj, key)=>{
                    return(
                      <View
                        key={key}
                        onClick={()=>{this.dirClick(obj, key)}}
                        className={this.state.dirIndex==key?'phoneBill-typeL price_actived':'phoneBill-typeL'}>
                          <View className="pB-tMWrap">
                            <Text className="phoneBill-tMoney">{obj}</Text>
                            <Text className="phoneBill-tYuan">元</Text>
                          </View>
                      </View>
                    )
                  })
                }
              </View>
            </View>
          ):(
            //卡充
              <View className="phoneBill-direct" >
              <View className="phoneBill-typeU phoneCan">
                {
                  Object.keys(this.state.cardList).map((obj, key)=>{
                    return(
                      <View
                        key={key}
                        onClick={()=>{this.cardClick(obj, key)}}
                        className={this.state.noGoods.includes(obj)?'phoneBill-typeL price_gray':(this.state.cardIndex==key?'phoneBill-typeL price_actived':'phoneBill-typeL')}>
                          {
                            this.state.noGoods.includes(obj)&&<Text class="lack" >缺货</Text>
                          }
                          <View class="phoneCard-tMTop">
                            <Text className="phoneBill-tMoney">{obj}</Text>
                            <Text className="phoneBill-tYuan">元</Text>
                          </View>
                      </View>
                    )
                  })
                }
              </View>
            </View>
          )
        }

        {
          this.props.phoneType==0?
          (
            <View className="phoneBnt">
              <View className={this.state.phoneCan?'phoneBnt-left bntCan':'phoneBnt-left bntNo'}
                onClick={()=>this.changeNow()}>立即兑换
              </View>
            </View>
          ):
          (<View className="phoneBnt">
            <View className="phoneBnt-left flex bntCan" onClick={()=>this.changeNow()}>立即兑换</View>
            <View className="phoneBnt-right flex" onClick={()=>Taro.navigateTo({url:'/pages/phone/record/index'})}>立即回购</View>
          </View>)
        }


        {
           this.state.showInfo && <Dialog
             renderHeader={<View>确认兑换</View>}
             renderFooter={<Button className="confirm" onClick={() => this.onShowCode()}>确认</Button>}
             onClose={() => this.onClose()}
             onBack={() => this.onClose()}
          >
            <View className="content">
              <View className="total">
                <Image src={'https://mall.cocotc.cn/static/images/cart/icon.png'} className="icon"></Image>
                <Text>{this.state.taxInfo.total}</Text>
              </View>
              <View className="flex">
                <Text className="name">产品名称</Text>
                <Text className="value">{this.props.phoneType==0?`${this.props.dirPrice.facePrice}元话费直充`:`${this.props.cardPrice.facePrice}元话费卡充`}</Text>
              </View>
              {
                this.props.phoneType==0 && <View className="flex">
                  <Text className="name">充值账号</Text>
                  <Text className="value">{this.state.inpNum}</Text>
                </View>
              }
              <View className="flex">
                <Text className="name">服务费</Text>
                <Text className="value">{filter.toDecimal2(this.state.taxInfo.total-Number(this.props.phoneType==0 ? this.props.dirPrice.facePrice : this.props.cardPrice.facePrice))}</Text>
              </View>
              <View className="flex">
                <Text className="name">应付合计</Text>
                <Text className="value">{filter.toDecimal2(this.state.taxInfo.total)}</Text>
              </View>
            </View>
          </Dialog>
        }

        { this.state.showCode && <PayPassword isClosed onBack={() => this.onShowInfo()} onConfirm={(val)=>this.submitOrder(val)}></PayPassword>}

      </View>
    )
  }

    onShowInfo = () => {
      this.setState({showInfo: true, showCode: false})
    }

    onShowCode = () => {
      this.setState({showInfo: false, showCode: true})
    }


    onClose = () => {
      this.setState({
        showInfo: false,
        showCode: false,
      })
    }
}


