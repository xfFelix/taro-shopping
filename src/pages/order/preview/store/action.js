import {constant} from './index'
import {getPreviewOrder} from '../api'

export const getPreviewOrderSync = (params = {token: '', id: ''}) => {
  return async dispatch => {
    try {
      const {data, other} = await  getPreviewOrder(params)
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
