import fetch from '@/api/fetch'
import { INFO_URL } from '@/api/config'


// 信用卡列表 （状态为审核通过）
export const cards = (data) => fetch({
  url: `${INFO_URL}/user/cards`,
  method: 'POST',
  data
})
// 信用卡列表（状态为审核通过和审核中的信用卡）
export const allcards = (data) => fetch({
  url: `${INFO_URL}/user/allcards`,
  method: 'POST',
  data
})
// 信用卡校验
export const validCard = (data) => fetch({
  url: `${INFO_URL}/other/validCard`,
  method: 'POST',
  data
})
// 添加信用卡
export const addcard = (data) => fetch({
  url: `${INFO_URL}/user/addvalidcard`,
  method: 'POST',
  data
})
// 解绑信用卡
export const unbindCard = (data) => fetch({
  url: `${INFO_URL}/user/unbind`,
  method: 'POST',
  data
})

// 信用卡还款提交
export const applyCard = (data) => fetch({
  url: `${INFO_URL}/user/apply`,
  method: 'POST',
  data
})

// 信用卡还款税费计算
export const cardTax = (data) => fetch({
  url: `${INFO_URL}/user/cardTax`,
  method: 'POST',
  data
})
// 信用卡还款记录
export const logsCard = (data) => fetch({
  url: `${INFO_URL}/user/logs`,
  method: 'POST',
  data
})
// 信用卡信息
export const cardInfo = (data) => fetch({
  url: `${INFO_URL}/user/cardInfo`,
  method: 'POST',
  data
})
