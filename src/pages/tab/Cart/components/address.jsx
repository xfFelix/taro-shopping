import Taro,{ PureComponent } from "@tarojs/taro"
import styles from './address.module.scss'
import {Image, Text, View} from "@tarojs/components"
import {AtIcon} from "taro-ui"

export default class Address extends PureComponent{

  constructor(){
    super(...arguments)
  }

  defaultProps: {
    address: ''
  }

  render() {
    return (
      <View className={styles.addressWrapper}>
        {(this.props.address && this.props.address.id) ?
          <View>
            <View className={styles.userContent}>
              <Text className={styles.default}>默认</Text>
              <Text className={styles.userText}>{this.props.address.name}</Text>
              <Text className={styles.userText}>{this.props.address.tel}</Text>
            </View>
            <View className={styles.addressContent}><Text>{this.props.address.area}</Text><Text style={'margin-left: 5px;'}>{this.props.address.address}</Text></View>
          </View> :
          <View className={'flex'}>
            <Image src={'https://mall.cocotc.cn/static/images/cart/add-address.png'} className={styles.addAddress}></Image>
            <Text className={styles.selectAddressText}>请选择收货地址</Text>
          </View>
        }
        <View className={styles.arrowRight}>
          <AtIcon value='chevron-right' size='30' color='#666' ></AtIcon>
        </View>
      </View>
    )
  }
}
