import {constant} from './index'
import {getPreviewOrder} from '../api'

export const getPreviewOrderSync = (params = {token: '', id: ''}) => {
  return async dispatch => {
    try {
      const {data, other, error_code, message} = await  getPreviewOrder(params)
      if (error_code === 7) {
        dispatch(setError(false, message))
      }
      dispatch(setPreviewOrder(data, other))
    } catch (e) {
      console.error('获取预览信息失败')
    }
  }
}

export const setPreviewOrder = (data, total) => ({
  type: constant.GET_PREVIEW_ORDER,
  data,
  total
})

export const setError = (data, message) => ({
  type: constant.SET_ERROR,
  data,
  message
})
