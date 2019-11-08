import { constant } from './index'

const INITIAL_STATE = {
  typeList: [
    { name: '电费', type: 13, imgUrl: 'https://tmall.cocogc.cn/ticket/static/img/dianfeic.eaef63dc.png', icon: 'https://tmall.cocogc.cn/ticket/static/img/dianfei.dd060b0a.png' },
    { name: '水费', type: 12, imgUrl: 'https://tmall.cocogc.cn/ticket/static/img/shuifeic.0b8cbe1d.png', icon: 'https://tmall.cocogc.cn/ticket/static/img/shuifei.b8181c61.png' },
    { name: '燃煤费', type: 14, imgUrl: 'https://tmall.cocogc.cn/ticket/static/img/ranqifeic.90640011.png', icon: 'https://tmall.cocogc.cn/ticket/static/img/ranqifei.19869639.png' }
  ],
  groupList: [
    { label: '我家', value: 0, id: 0, text: '我家' },
    { label: '父母', value: 1, id: 1, text: '父母' },
    { label: '朋友', value: 2, id: 2, text: '朋友' },
    { label: '其他', value: 3, id: 3, text: '其他' }
  ],
  config: {
    type: 13,
    grp: 0,
    pn:'',
    pr:'',
    productNo: 'D19070512',
    productName: '深圳市电费',
    city: '深圳'
  }
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.SET_CONFIG:
      return {
        ...state,
        config: {
          ...state.config,
          ...action.data
        }
      }
    default:
      return state
  }
}
