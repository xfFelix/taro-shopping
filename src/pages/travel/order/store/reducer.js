import { constant } from './index'

const INITIAL_STATE = {
  orderStatusOptions: [
    {label: '未使用', value: 0},
    {label: '已使用', value: 1},
    {label: '已过期', value: 2},
    {label: '已取消', value: 3},
    {label: '凭证码被替代', value: 4},
    {label: '被终端修改', value: 5},
    {label: '被终端撤销', value: 6},
    {label: '部分使用', value: 7}
  ]
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.GET_ORDER_LIST:
      return {
        ...state,
        list: action.data,
        store: {
          ...state.store,
          [action.current]: action.store
        }
      }
    case constant.GET_ORDER_DETAIL:
      return {
        ...state,
        detail: action.data
      }
    default:
      return state
  }
}
