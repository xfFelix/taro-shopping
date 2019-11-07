import Taro,{PureComponent} from "@tarojs/taro"
import {View, Text} from "@tarojs/components"
import styles from './index.module.scss'
import {connect} from "@tarojs/redux";

@connect(({protocol}) => ({
  title: protocol.title,
  content: protocol.content
}))
export default class Protocol extends PureComponent {

  config = {
    navigationBarTitleText: '协议'
  }

  constructor(){
    super(...arguments)
  }

  render(){
    return(
        <View className={styles.agreeContentW}>
            <View className={styles.title}>《{this.props.title}》</View>
            <Text className={styles.agreeContent}>
              {this.props.content}
            </Text>
        </View>
    )}
}



