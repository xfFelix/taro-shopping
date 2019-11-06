import fetch from '@/api/fetch'
import {MALL_URL} from "@/api/config"

// 获取回收列表
export const getRecoveryList = (data) => fetch({
  url: `${MALL_URL}/api/ticket/oilcard/getBuyBackList`,
  method: 'post',
  data
})
