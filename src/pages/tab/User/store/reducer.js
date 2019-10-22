import {GET_USER_BOTTOM_SWIPER, GET_USER_TOP_SWIPER} from './constants'

const INITIAL_STATE = {
  bannerList: [],
  bottomList: []
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_TOP_SWIPER:
      return {
        ...state,
        bannerList: action.data
      }
    case GET_USER_BOTTOM_SWIPER:
      return {
        ...state,
        bottomList: action.data
      }
    default:
      return state
  }
}
