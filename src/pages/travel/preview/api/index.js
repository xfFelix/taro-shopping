import fetch from '@/api/fetch'
import {MALL_URL, INFO_URL} from "@/api/config"

// 获取旅游详情
export const getDetail= (data) => fetch({
  url: `${MALL_URL}/api/ticket/getTicketInfo`,
  method: 'get',
  data
})

// 获取价格列表
export const getTicketList= (data) => fetch({
  url: `${MALL_URL}/api/ticket/getRealTimeStorage`,
  method: 'get',
  data
})

// 根据价格列表获取预览信息
export const getOrderPreview= (data) => fetch({
  url: `${MALL_URL}/api/ticket/getOrderPreview`,
  method: 'get',
  data
})

// 提交信息
export const submitOrder= (data) => fetch({
  url: `${MALL_URL}/api/ticket/pFTOrderSubmit`,
  method: 'post',
  data
})
