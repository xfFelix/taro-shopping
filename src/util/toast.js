import Vue from 'vue'

export function toast(message = 'loading',type='loading', time = 1000, mask=false) {
  const toast =  Vue.$createToast({
    time,
    txt: message,
    mask,
    type
  })
  return toast.show()
}
