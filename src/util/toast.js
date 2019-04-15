import Vue from 'vue'
import {Toast, Dialog} from 'cube-ui'
import { resolve } from 'path';
import { reject } from 'q';

Vue.use(Toast)
Vue.use(Dialog)

export function toast(message = 'loading',type='txt', time = 1000, mask=false) {
  const $toast =  Toast.$create({
    time,
    txt: message,
    mask,
    type
  })
  return $toast.show()
}

export function dialog(options, cb) {
  let $dialog = null
  let args = {
    type: 'alert',
    title: '提示',
    icon: '',
    confirmBtn: {
      text: "确定",
      active: true,
      disabled: false,
      href: "javascript:;"
    },
    cancelBtn: {
      text: "取消",
      active: false,
      disabled: false,
      href: "javascript:;"
    },
    onConfirm: cb,
    onCancel: () => {}
  }
  if (options instanceof String) {
    args.content = options
    $dialog = Dialog.$create(args)
  } else if (Object.keys(options).length) {
    $dialog = Dialog.$create(Object.assign(args, options))
  }
  return $dialog.show()
}
