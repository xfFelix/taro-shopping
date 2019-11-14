import fetch from '@/api/fetch'
import {MALL_URL, INFO_URL} from "@/api/config"

// 获取旅游详情
export const getDetail= (data) => fetch({
  url: `${MALL_URL}/api/ticket/getScenicSpotInfo`,
  method: 'get',
  data
})

// 获取门票列表
export const getTicketList= (data) => fetch({
  url: `${MALL_URL}/api/ticket/getTicketList`,
  method: 'get',
  data
})
