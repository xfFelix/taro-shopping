import {
  GET_CLASSIFY_DIR_BY_FIRST,
  GET_CLASSIFY_DIR_BY_SECOUND,
  GET_CLASSIFY_SWIPER
} from '@/constants/tab'
import { getClassifyDirByFirst, getHomeSwiper } from '@/api'

export const getDirByFirstAsync = () => {
  return async dispatch => {
    const { data } = await getClassifyDirByFirst({id: 0})
    dispatch(getDirByFirst(data))
    data.forEach(item => {
      dispatch(getDirBySecoundAsync(item.id, item.name))
    })
  }
}

export const getDirBySecoundAsync = (id, name) => {
  return async dispatch => {
    const { data } = await getClassifyDirByFirst({id})
    dispatch(getDirBySecound(name, data))
  }
}

export const getSwiperByClassify = () => {
  return async dispatch => {
    const { data } = await getHomeSwiper({id: '13bb01753dc84759820aafdfd8a4520d'})
    dispatch(getSwiper(data.data))
  }
}

const getSwiper = (list) => ({
  type: GET_CLASSIFY_SWIPER,
  list
})

const getDirBySecound = (name, list) => ({
  type: GET_CLASSIFY_DIR_BY_SECOUND,
  name,
  list
})

const getDirByFirst = (list) => ({
  type: GET_CLASSIFY_DIR_BY_FIRST,
  list
})
