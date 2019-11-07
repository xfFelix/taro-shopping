import {constant} from './index'
import { dialog } from '@/util/index'

export const getContentSync = ({title= '', content =''}={}) => ({
  type: constant.SET_CONTENT,
  title,
  content
})
