import { constant } from './index'

const INITIAL_STATE = {
  title: '',
  content: ''
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.SET_CONTENT:
      return {
        ...state,
        title: action.title,
        content: action.content
      }
    default:
      return state
  }
}
