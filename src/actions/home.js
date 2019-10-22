import { GET_HOME_SWIPER, GET_HOME_HOT, GET_HOME_NEW } from '@/constants/tab'
import { getHomeSwiper, getNewList } from '@/api'

export const setHomeSwiper = () => {
  return async dispatch => {
    let res = await getHomeSwiper({id: 'a10a220f9aa94dc49c960c77cd783d11'})
    dispatch(setSwiper(res.data.data))
  }
}


export const getHomeHot = () => {
  return async dispatch => {
    let { data } = await getHomeSwiper({id: 'e2a913cee8b84c97a9a9801375a6a1f7'})
    dispatch(getHot(data.goodsList))
  }
}

export const getHomeNew = () => {
  return async dispatch => {
    let { data } = await getNewList({catId: 206, num: 3, startNum: 0})
    dispatch(getNews(data))
  }
}

const setSwiper = (swiperList) => ({
  type: GET_HOME_SWIPER,
  swiperList
})

const getHot = (hotList) => ({
  type: GET_HOME_HOT,
  hotList
})

const getNews = (newList) => ({
  type: GET_HOME_NEW,
  newList
})
