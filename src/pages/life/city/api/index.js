import fetch from '@/api/fetch'
import {INFO_URL} from "@/api/config"

// 获取城市列表
export const getCity = (data) => fetch({
  url: `${INFO_URL}/live/cities`,
  method: 'get',
  data
})
