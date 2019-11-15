import fetch from '@/api/fetch'
import { INFO_URL } from '@/api/config'

//直充价格查询
export const directQuery = (data) => fetch({
  url: `${INFO_URL}/other/phonePrice`,
  method: 'POST',
  data
})

//充值卡价格查询
export const cardQuery = (data) => fetch({
  url: `${INFO_URL}/other/phoneCardPrice`,
  method: 'POST',
  data
})

//直充兑换接口
export const phoneCharge = (data) => fetch({
  url: `${INFO_URL}/other/phoneCharge`,
  method: 'POST',
  data
})

//直充记录
export const phoneLogs = (data) => fetch({
  url: `${INFO_URL}/user/phoneLogs`,
  // url:'http://lc-OnsG2j7w.cn-n1.lcfile.com/b3e52d8e6da379ca28ef.json',//直充
  // url:'http://lc-OnsG2j7w.cn-n1.lcfile.com/13a92b133fe6d2987bcf.json', //卡充
  method: 'POST',
  data
})


//话费充值税费计算
export const phoneTax = (data) => fetch({
  url: `${INFO_URL}/user/phoneTax`,
  method: 'POST',
  data
})



