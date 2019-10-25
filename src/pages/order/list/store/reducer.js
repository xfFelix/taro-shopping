import { constant } from './index'

const INITIAL_STATE = {
  list: [],
  store: {}
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
    default:
      return state
  }
}
