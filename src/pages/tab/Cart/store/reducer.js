import {
  GET_CART_LIST,
  GET_DEFAULT_ADDRESS,
  GET_GUESS_LIKE_LIST,
  SET_EMPTY,
  UPDATE_CART,
  SET_CHANGE_LIST,
  SET_TOTAL, SET_DEFAULT
} from './constants'
import {setDefault} from "@/pages/tab/Cart/store/action";

const INITIAL_STATE = {
  address: {},
  list: [],
  changeList: [],
  isEmpty: true,
  guesslike: [],
  total: 0,
  num: 0,
  allChecked: false,
  isDefault: true
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DEFAULT_ADDRESS:
      return {
        ...state,
        address: action.data
      }
    case GET_CART_LIST:
      return {
        ...state,
        list: action.data
      }
    case SET_EMPTY:
      return {
        ...state,
        isEmpty: action.data
      }
    case GET_GUESS_LIKE_LIST:
      return {
        ...state,
        guesslike: action.data
      }
    case SET_CHANGE_LIST:
      return {
        ...state,
        changeList: action.data
      }
    case SET_TOTAL:
      return {
        ...state,
        total: action.total,
        num: action.num,
        allChecked: action.allChecked
      }
    case SET_DEFAULT:
      return {
        isDefault: action.data
      }
    default:
      return state
  }
}
