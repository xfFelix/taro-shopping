import { constant } from './index'

const INITIAL_STATE = {
  list: [],
  total: 0,
  haveMoney: true,
  errMsg: '系统运行异常~'
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.GET_PREVIEW_ORDER:
      return {
        ...state,
        list: action.data,
        total: action.total
      }
    case constant.SET_ERROR:
      return {
        ...state,
        haveMoney: action.data,
        errMsg: action.message
      }
    default:
      return state
  }
}
