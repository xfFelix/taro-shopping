import {GET_GOODS_LIST, GET_GOODS_DETAIL, GET_CART_LIST_NUM, ADD_CART, LOAD_MORE_GOODS_LIST} from './constants'
import {getList, getDetail, getCartListNum, addCart} from '../api'

export const getGoodsListSync = ({storeName= '全部', categoryId = '', keyWord = '', offset = 1, price = '0-*', priceRange = '', productTypeId = '', rows = 10, salesVolume = '', timeSort = ''}={}) => {
  return async dispatch => {
    try {
      const {list} = await  getList({categoryId, keyWord, offset, price, priceRange, productTypeId, rows, salesVolume, timeSort})
      dispatch(getGoodsList({categoryId, keyWord, offset: offset, price, priceRange, productTypeId, rows, salesVolume, timeSort, list}, storeName))
    } catch (e) {
      console.error('商品列表获取失败')
    }
  }
}

export const loadMoreGoodsListSync = ({storeName= '全部', categoryId = '', keyWord = '', offset = 1, price = '0-*', priceRange = '', productTypeId = '', rows = 10, salesVolume = '', timeSort = ''}={}) => {
  return async dispatch => {
    try {
      const {list} = await  getList({categoryId, keyWord, offset, price, priceRange, productTypeId, rows, salesVolume, timeSort})
      let allLoad = false
      if (list && list.length < rows) {
        allLoad = true
      }
      dispatch(loadMoreGoodsList({categoryId, keyWord, offset: offset, price, priceRange, productTypeId, rows, salesVolume, timeSort, list, allLoad}, storeName))
    } catch (e) {
      console.error('上拉列表获取失败')
    }
  }
}

export const getGoodsDetailSync = ({id = '33771'}={}) => {
  return async dispatch => {
    try {
      const { data } = await getDetail({id: id + ''})
      dispatch(getGoodsDetail(data))
    } catch (e) {
      console.error('商品详情获取失败')
    }
  }
}

export const loadMoreGoodsList = (data, storeName) => ({
  type: LOAD_MORE_GOODS_LIST,
  storeName,
  data
})

export const getCartNumSync = ({token=''}= {}) => {
  return async dispatch => {
    try {
      const { data } = await getCartListNum({token})
      dispatch(getCartNum(data))
    } catch (e) {
      console.error('购物车数量获取失败')
    }
  }
}

export const addToCartSync = ({id='', num=1, token=''}={}) => {
  return async dispatch => {
    try {
      await addCart({id: id+ '', num, token})
      dispatch(getCartNumSync({token}))
      dispatch(addToCart())
    } catch (e) {
      console.error('添加购物车失败')
    }
  }
}

export const addToCart = () => ({
  type: ADD_CART,
})

export const getGoodsList = (data, storeName) => ({
  type: GET_GOODS_LIST,
  storeName,
  data
})

export const getGoodsDetail = (data) => ({
  type: GET_GOODS_DETAIL,
  data
})

export const getCartNum = (data) => ({
  type: GET_CART_LIST_NUM,
  data
})

