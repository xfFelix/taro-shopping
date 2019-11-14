import fetch from '@/api/fetch'
import {INFO_URL} from "@/api/config"

// 轮询查询结果
export const getBill = (data) => fetch({
  url: `${INFO_URL}/live/bill`,
  method: 'post',
  data
})

export const getTax = (data) => fetch({
  url: `${INFO_URL}/live/tax`,
  method: 'post',
  data
})
