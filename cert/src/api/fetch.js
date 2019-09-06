import axios from 'axios' // 导入axios
import {toast, dialog} from 'util/toast'

const instance = axios.create({
  // 设置默认根地址
  baseURL: process.env.VUE_APP_BASE_URL,
  // 设置请求超时设置
  timeout: 10000,
  // 设置请求时的header
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    'Content-Type': 'application/json'
  },
  // 公用参数
  data: {},
  withCredentials: process.env.NODE_ENV === 'production'
})

// POST传参序列化
instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断
instance.interceptors.response.use((res) => {
  let data = res.data
  switch (+data.code) {
    case 0:
      return res
    // 状态码 人脸识别-已经识别过
    case 2222:
      return res
    default:
      return Promise.reject(data.msg)
  }
}, (err) => {
  if (err == 'Error: timeout of 10000ms exceeded') { // 接口超时处理，设置了timeout: 5000,
    toast('接口超时:10000ms')
  }
  if (err == 'Error: timeout of 60000ms exceeded') { // 图片上传单独的超时处理，图片上传设置了timeout: 60000,
    toast('图片上传超时')
  }

  if (err.response) {
    toast('接口错误：' + err.response)
  }
  if (err && err.response) {
    toast('接口错误：' + err)
    toast('接口错误：' + err.config)
  }

  return Promise.reject(err)
})

export default (options) => {
  return new Promise((resolve, reject) => {
    instance(options).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}
