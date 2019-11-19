import { GET_SHOPPING_SWIPER, GET_GOODS_BY_INTEGRAL } from '@/constants/tab'

const INITIAL_STATE = {
  swiperList: [],
  integralList: [
    { label: '我能兑换', value: '0-', name: '0', active: false },
    { label: '0~50', value: '0-50', name: '1', active: false },
    { label: '50~200', value: '50-200', name: '2', active: false },
    { label: '201~1000', value: '201-1000', name: '3', active: false },
    { label: '1001~5000', value: '1001-5000', name: '4', active: false },
    { label: '5000以上', value: '5001-*', name: '5', active: false },
  ]
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SHOPPING_SWIPER:
      return {
        ...state,
        swiperList: action.swiperList
      }
    case GET_GOODS_BY_INTEGRAL:
      let name = state[action.name]
      let list = []
      if (name) {
        list = state[action.name].list
      }
      return {
        ...state,
        [action.name]: {
          list: [...list, ...action.list],
          offset: action.offset,
          rows: action.rows
        }
      }
    default:
      return state
  }
}
