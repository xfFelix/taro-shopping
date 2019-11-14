import Taro,{PureComponent} from "@tarojs/taro"
import {View, Text} from "@tarojs/components"
import styles from './index.module.scss'
import {connect} from "@tarojs/redux";

@connect(({protocol}) => ({
  list: protocol.list,
}))
export default class Protocol extends PureComponent {

  config = {
    navigationBarTitleText: 'question'
  }

  constructor(){
    super(...arguments)
  }

  render(){
    return(
        <View className={styles.agreeContentW}>
          {
            this.props.list.map((item, index) => {
              return (
                <View key={index}>
                  <View className={styles.title}>《{item.title}》</View>
                  <Text className={styles.agreeContent}>
                    {item.content}
                  </Text>
                </View>
              )
            })
          }
        </View>
    )}
}



