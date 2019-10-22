import Taro from '@tarojs/taro'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"

export default class SelectLocation extends Taro.Component {

  constructor() {
    super(...arguments)
  }

  render() {
    const { list, show, closeSheet, onClick } = this.props
    return (
      <AtActionSheet isOpened={show} cancelText='取消' onClose={closeSheet} onCancel={closeSheet}>
        {
          list && list.map((item, index) => {
            return (
              <AtActionSheetItem key={index} onClick={() => onClick(index)}>
                {item.label}
              </AtActionSheetItem>
            )
          })
        }
      </AtActionSheet>
    )
  }

}
