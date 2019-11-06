import fetch from '@/api/fetch'
import {MALL_URL} from "@/api/config"

// 获取兑换列表
export const getOrderList = (data) => fetch({
  url: `${MALL_URL}/api/ticket/oilcard/getOrderList`,
  method: 'post',
  data
})
