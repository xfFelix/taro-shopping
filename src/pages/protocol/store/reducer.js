import { constant } from './index'

const INITIAL_STATE = {
  title: '',
  content: ''
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.GET_COST_INFO:
      return {
        ...state,
        costInfo: action.data
      }
    default:
      return state
  }
}
