import Vue from 'vue'
import {Toast} from 'cube-ui'

Vue.use(Toast)

export function toast(message = 'loading',type='txt', time = 1000, mask=false) {
  const $toast =  Toast.$create({
    time,
    txt: message,
    mask,
    type
  })
  return $toast.show()
}
