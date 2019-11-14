import {constant} from './index'
import { dialog } from '@/util/index'

export const getContentSync = (data) => {
  let list = []
  if (Object.prototype.toString.call(data) === '[object Array]') {
    list = data
  } else if (Object.prototype.toString.call(data) === '[object Object]') {
    list.push(data)
  } else{
    throw new Error('必须是对象类型')
  }
  return {
    type: constant.SET_CONTENT,
    list
  }
}
