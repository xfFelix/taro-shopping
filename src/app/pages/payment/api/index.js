import fetch from '@/api/fetch'
import { INFO_URL } from '@/api/config'

// 扫码付款税率统计
export const getPriceByScan = (data) => fetch({
  url: `${INFO_URL}/sweep/sweepTax`,
  method: 'post',
  data
})

// 扫码支付
export const paymentByScan = (data) => fetch({
  url: `${INFO_URL}/sweep/sweepPay`,
  method: 'post',
  data
})

// 扫码付款记录
export const getLogsByScan = (data) => fetch({
  url: `${INFO_URL}/sweep/sweepPayLogs`,
  method: 'post',
  data
})
