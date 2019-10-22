import { constant } from './index'

const INITIAL_STATE = {
  list: [],
  total: 0
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.GET_PREVIEW_ORDER:
      return {
        ...state,
        list: action.data,
        total: action.total
      }
    default:
      return state
  }
}
