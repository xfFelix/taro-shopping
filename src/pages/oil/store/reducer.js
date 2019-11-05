import { constant } from './index'

const INITIAL_STATE = {
  costInfo: {},
  price: 0
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
    default:
      return state
  }
}
