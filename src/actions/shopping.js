import { GET_SHOPPING_SWIPER, GET_GOODS_BY_INTEGRAL } from '@/constants/tab'
import { getHomeSwiper, getGoodsByIntegral } from '@/api'

export const getShoppingSwiper = () => {
  return async dispatch => {
    const { data } = await getHomeSwiper({id: '1e0615c5b4b54caf97a366059249017d'})
    dispatch(getSwiper(data.data))
  }
}

export const toggleIntegral = (name, price, offset = 0, rows = 10) => {
  return async dispatch => {
    try {
      const { list } = await getGoodsByIntegral({ price, offset, rows })
      dispatch(getIntegralGoods(name, list, offset, rows))
    } catch (e) {
      console.error(e)
    }
  }
}

const getSwiper = (swiperList) => ({
  type: GET_SHOPPING_SWIPER,
  swiperList
})

const getIntegralGoods = (name, list, offset, rows) => ({
  type: GET_GOODS_BY_INTEGRAL,
  list,
  name,
  offset,
  rows
})
