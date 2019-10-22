import {ADD_CART, GET_CART_LIST_NUM, GET_GOODS_DETAIL, GET_GOODS_LIST, LOAD_MORE_GOODS_LIST} from './constants'

const INITIAL_STATE = {
  detail: {},
  num: 0
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_MORE_GOODS_LIST:
      let list = []
      if (state[action.storeName]) {
        list = state[action.storeName].list
      }
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          ...action.data,
          list: [...list, ...action.data.list]
        }
      }
    case GET_GOODS_LIST:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          ...action.data
        }
      }
    case GET_GOODS_DETAIL:
      return {
        ...state,
        detail: action.data
      }
    case GET_CART_LIST_NUM:
      return {
        ...state,
        num: action.data
      }
    case ADD_CART:
      return {
        ...state
      }
    default:
      return state
  }
}
