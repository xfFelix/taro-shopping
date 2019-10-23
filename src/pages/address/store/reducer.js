import { constant } from './index'

const INITIAL_STATE = {
  list: [],
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.GET_ADDRESS_LIST:
      return {
        ...state,
        list: action.data
      }
    default:
      return state
  }
}
