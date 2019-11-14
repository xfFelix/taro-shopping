import fetch from '@/api/fetch'
import {INFO_URL} from "@/api/config"

// 获取我的缴费信息
export const getGrps = (data) => fetch({
  url: `${INFO_URL}/live/grps`,
  method: 'post',
  data
})
