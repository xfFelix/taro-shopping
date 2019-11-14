import { constant } from './index'

const INITIAL_STATE = {
  list: []
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.SET_CONTENT:
      return {
        ...state,
        list: action.list
      }
    default:
      return state
  }
}
