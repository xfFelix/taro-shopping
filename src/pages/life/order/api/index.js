import fetch from '@/api/fetch'
import {INFO_URL} from "@/api/config"

// 获取兑换列表
export const getOrderList = (data) => fetch({
  url: `${INFO_URL}/live/logs`,
  method: 'post',
  data
})
