import Taro,{PureComponent} from '@tarojs/taro'
import styles from './index.module.scss'
import {View} from "@tarojs/components";
import { AtIcon } from 'taro-ui'

export default class Dialog extends PureComponent{

  render(): any {
    return (
      <View className={styles.mask} onClick={() => this.props.onClose()}>
        <View className={styles.dialog} onClick={(e) => e.stopPropagation()}>
          <View className={styles.header}>
            <View className={styles.left} onClick={() => this.props.onBack()}>
              <AtIcon value='chevron-left' size='24' color='#000'></AtIcon>
            </View>
            {this.props.renderHeader}
          </View>
          <View className={styles.body}>
            {this.props.children}
          </View>
          <View className={styles.footer}>
            {this.props.renderFooter}
          </View>
        </View>
      </View>
    )
  }
}
