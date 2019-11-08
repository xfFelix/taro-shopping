import {constant} from './index'
import { dialog } from '@/util/index'

export const setConfigSync = (config={}) => ({
  type: constant.SET_CONFIG,
  data: config
})
