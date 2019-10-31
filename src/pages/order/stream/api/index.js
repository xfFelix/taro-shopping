import fetch from '@/api/fetch'

// 获取物流详情
export const getStream = (data) => fetch({
  url: `/api/queryOrderTrack`,
  method: 'post',
  data
})
