import { constant } from './index'

const INITIAL_STATE = {
  costInfo: {},
  price: 0,
  list: [],
  recoveryList: [],
  statusList: [
    { label2: '兑换成功', value: 0, label: '充值中' },
    { label2: '回收成功', value: 1, label: '充值成功' },
    { label2: '回收失败', value: 2, label: '充值失败' },
    { label2: '回收中', value: 3, label: '回收中' },
    { label2: '兑换失败', value: 4, label: '兑换失败'}
  ]
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.GET_COST_INFO:
      return {
        ...state,
        costInfo: action.data
      }
    case constant.SUBMIT:
      return {
        ...state,
        price: action.price
      }
    case constant.GET_ORDER_LIST:
      return {
        ...state,
        list: action.data
      }
    case constant.GET_RECOVERY_LIST:
      return {
        ...state,
        recoveryList: action.data
      }
    default:
      return state
  }
}
