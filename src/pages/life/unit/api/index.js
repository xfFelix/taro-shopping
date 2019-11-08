import fetch from '@/api/fetch'
import {INFO_URL} from "@/api/config"

// 获取单元列表
export const getUnitList = (data) => fetch({
  url: `${INFO_URL}/live/companies`,
  method: 'get',
  data
})
