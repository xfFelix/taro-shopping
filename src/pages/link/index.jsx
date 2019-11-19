import Taro,{Component} from '@tarojs/taro'
import styles from './index.module.scss'
import {View, Text, Image} from "@tarojs/components";
import {AtIcon} from "taro-ui";

export default class Link extends Component{

  config ={
    navigationBarTitleText: '联系我们'
  }

  render(): any {
    return (
      <View className={styles.wrapper}>
        <View className={styles.image}>
          <Image src={'https://api.cocotc.cn/images/contact.png'}></Image>
        </View>
        <View className={styles.container}>
          <View className={styles.item}>
            <Text className={styles.name}>联系电话</Text>
            <View className={styles.value}>0898-3130-5180
              <View className={styles.right}>
                <AtIcon value='chevron-right' size='24' color='#ccc'></AtIcon>
              </View>
            </View>
          </View>
          <View className={styles.item}>
            <Text className={styles.name}>微信号</Text>
            <View className={styles.value}>COCOGC2018
              <View className={styles.right}>
                <AtIcon value='chevron-right' size='24' color='#ccc'></AtIcon>
              </View>
            </View>
          </View>
          <View className={styles.item}>
            <Text className={styles.name}>QQ号</Text>
            <View className={styles.value}>403292023
              <View className={styles.right}>
                <AtIcon value='chevron-right' size='24' color='#ccc'></AtIcon>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
