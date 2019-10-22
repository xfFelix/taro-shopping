import { GET_CLASSIFY_DIR_BY_FIRST, GET_CLASSIFY_DIR_BY_SECOUND, GET_CLASSIFY_SWIPER } from '../constants/tab'

const INITIAL_STATE = {
  firstDir: [],
  swiperList: []
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLASSIFY_DIR_BY_FIRST:
      return {
        ...state,
        firstDir: action.list
      }
    case GET_CLASSIFY_DIR_BY_SECOUND:
      return {
        ...state,
        [action.name]: [...action.list]
      }
    case GET_CLASSIFY_SWIPER:
      return {
        ...state,
        swiperList: action.list
      }
     default:
       return state
  }
}
