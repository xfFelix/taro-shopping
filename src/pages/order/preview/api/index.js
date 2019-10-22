import fetch from '@/api/fetch'

// 获取预览订单信息
export const getPreviewOrder = (data) => fetch({
  url: `/api/previewOrderByCart`,
  method: 'post',
  data
})
