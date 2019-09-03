import {Toast} from 'cube-ui'

class Loading {

  constructor(txt, mask = true) {
    const $toast =  Toast.$create({
      time: 0,
      txt,
      mask,
      type: 'loading'
    })
    this.toast = $toast
  }

  show() {
    return this.toast.show()
  }

  hide() {
    return this.toast.hide()
  }

}

export default Loading
