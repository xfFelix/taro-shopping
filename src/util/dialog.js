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

export const modal = async (data = {title:'', content: '', cancelText: '取消', closeOnClickOverlay: true, confirmText: '确定', isOpened: false}) => {
  const { cancel, confirm }= await Taro.showModal(data)
  if (confirm && !cancel) {
    return Promise.resolve(true)
  } else {
    return Promise.resolve(false)
  }
}
