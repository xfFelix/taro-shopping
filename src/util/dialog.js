import Taro from '@tarojs/taro'

export const toast = ({title, icon = 'none', image = '', duration = 1500, mask = true}) => {
  let taro = Taro.showToast({
    title,
    icon,
    image,
    duration,
    mask
  })
  return taro
}
