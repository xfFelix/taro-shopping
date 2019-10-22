import {GET_USER_BOTTOM_SWIPER, GET_USER_TOP_SWIPER} from './constants'
import {getHomeSwiper} from '@/api/index'

export const getTopSwiperSync = () => {
  return async dispatch => {
    try {
      const {data} = await  getHomeSwiper({id: '1ffcda7e7555460399096529c68a7a2a'})
      dispatch(getTopSwiper(data.data))
    } catch (e) {
      console.error('获取顶部banner图失败')
    }
  }
}

export const getBottomSwiperSync = () => {
  return async dispatch => {
    try {
      const {data} = await  getHomeSwiper({id: 'eaccd32767844f78b3e94923ff6ae899'})
      dispatch(setBottomSwiper(data.data))
    } catch (e) {
      console.error('获取底部banner图失败')
    }
  }
}

export const setBottomSwiper = (data) => ({
  type: GET_USER_BOTTOM_SWIPER,
  data
})

export const getTopSwiper = (data) => ({
  type: GET_USER_TOP_SWIPER,
  data
})

