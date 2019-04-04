import axios from 'axios' // 导入axios
import qs from 'qs'
import { DEV_HOST } from './config'
import { Toast } from 'vant'
import Vue from 'vue'
// import store from '@store';
// import {GET_CONFIG} from '@store/getters/type';

const instance = axios.create({
  // 设置默认根地址
  baseURL: DEV_HOST,
  // 设置请求超时设置
  timeout: 10000,
  // 设置请求时的header
  header: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'hwh': '916879598@qq.com'
  },
  // 公用参数
  data: {}
  // withCredentials: true
})

// POST传参序列化
instance.interceptors.request.use((config) => {
  // Vue.loading()
  // if (store.getters.GET_CONFIG.host) {
  //     config.headers.common['token'] = store.getters.GET_CONFIG.host
  // }
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  } else {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断
instance.interceptors.response.use((res) => {
  // Vue.loading.end()
  let data = res.data
  if (data.code === 1001) {
    setUserInfo(null)
    return Promise.reject(res)
  }
  return res
}, (err) => {
  // Vue.loading.end()
  if (err == 'Error: timeout of 5000ms exceeded') { // 接口超时处理，设置了timeout: 5000,
    Toast.clear()
    Toast('接口超时:10000ms')
  }
  if (err == 'Error: timeout of 60000ms exceeded') { // 图片上传单独的超时处理，图片上传设置了timeout: 60000,
    Toast.clear()
    Toast('图片上传超时')
  }

  if (err.response) {
    console.log(err.response)
  }
  if (err && err.response) {
    console.log(err)
    console.log(err.config)
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
