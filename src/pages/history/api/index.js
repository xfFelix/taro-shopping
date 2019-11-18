import fetch from '@/api/fetch'
import {INFO_URL} from "@/api/config"

// 获取旅游详情
export const getList= (data) => fetch({
  url: `${INFO_URL}/user/slogs`,
  method: 'post',
  data
})
