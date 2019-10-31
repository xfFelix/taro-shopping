import { constant } from './index'

const INITIAL_STATE = {
  list: [],
  store: {},
  detail: {},
  stream: ''
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
    case constant.GET_ORDER_STREAM:
      return {
        ...state,
        stream: action.data
      }
    default:
      return state
  }
}
