import {
  GET_CART_LIST,
  GET_DEFAULT_ADDRESS,
  GET_GUESS_LIKE_LIST,
  JING_DONG,
  SET_EMPTY,
  UPDATE_CART,
  YE_YUN,
  SET_CHANGE_LIST, SET_TOTAL, SET_DEFAULT
} from './constants'
import {getDefaultAddress, getCartList, getGuessLike, updateCart, removeCart} from '../api'

export const getAddressSync = ({token=''}={}) => {
  return async dispatch => {
    try {
      const {data} = await  getDefaultAddress({token})
      dispatch(getAddress(data))
    } catch (e) {
      console.error('默认地址获取失败')
    }
  }
}

export const getListSync = ({token='', addressId=''}={}) => {
  return async dispatch => {
    try {
      const { data } = await getCartList({token, addressId})
      dispatch(getList(data))
      dispatch(changeList(data))
    } catch (e) {
      console.error('购物车列表获取失败')
    }
  }
}

export const changeList = (list) => {
  return async dispatch => {
    try {
      let yeyun = { title: '小椰直营', mail: '一件包邮', data: [] }
      let jd = { title: '京东商城', mail: '99包邮', data: [] }
      let total = 0
      let num = 0
      let allChecked = false
        if (list && list.length) {
        allChecked = true
        for (let item of list) {
          if (item.check) {
            total += item.num * item.goods.currentPrice
            num += item.num
          } else {
            allChecked = false
          }
          if (item.goods.vendorId === YE_YUN) {
            yeyun.data.push(item)
          } else if (item.goods.vendorId === JING_DONG) {
            jd.data.push(item)
          }
        }
      }
      total = total.toFixed(2)
      dispatch(setTotal({total, num, allChecked}))
      let arr = []
      if (!jd.data.length && !yeyun.data.length) {
        dispatch(toggleEmpty(true))
      } else {
        dispatch(toggleEmpty(false))
      }
      arr.push(jd)
      arr.push(yeyun)
      dispatch(setChangeList(arr))
    } catch (e) {
      console.error(e)
    }
  }
}

export const getGuessLikeSync = () => {
  return async dispatch => {
    try{
      const { list } = await getGuessLike()
      dispatch(setGuessLike(list))
    } catch (e) {
      console.error(e)
    }
  }
}

export const updateCartSync = (data = { buys: [], token: ''}, addressId) => {
  return async dispatch => {
    try {
      const { error_code } = await updateCart(data)
      dispatch(getListSync({token: data.token, addressId}))
    } catch (e) {
      console.error(e)
    }
  }
}

export const removeCartSync = (data = {id: '', token: ''}, addressId) => {
  return async dispatch => {
    try {
      const { error_code } = await removeCart(data)
      dispatch(getListSync({token: data.token, addressId}))
    } catch (e) {
      console.error(e)
    }
  }
}

export const setTotal = ({total, num, allChecked}) => ({
  type: SET_TOTAL,
  total,
  num,
  allChecked
})

export const getAddress = (data) => ({
  type: GET_DEFAULT_ADDRESS,
  data
})

export const setDefault = (data) => ({
  type: SET_DEFAULT,
  data
})

export const getList = (data) => ({
  type: GET_CART_LIST,
  data,
})

export const setChangeList = (data) => ({
  type: SET_CHANGE_LIST,
  data,
})

export const toggleEmpty = (data) => ({
  type: SET_EMPTY,
  data
})

export const setGuessLike = (data) => ({
  type: GET_GUESS_LIKE_LIST,
  data
})
