import { SET_TOKEN, GET_INFO, LOGIN_OUT } from '@/constants/user'
import Storage from '@/assets/js/storage'

const storage = new Storage()
let defaultToken = storage.get('token')
let defaultInfo = storage.get('user_info')

const INITIAL_STATE = {
  token: defaultToken,
  info: defaultInfo
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TOKEN:
      storage.set('token', action.token)
      return {
        ...state,
        token: action.token
      }
    case GET_INFO:
      storage.set('user_info', action.data)
      return {
        ...state,
        info: action.data
      }
    case LOGIN_OUT:
      storage.clear()
      return {
        ...state,
        token: '',
        info: ''
      }
    default:
      return state
  }
}
