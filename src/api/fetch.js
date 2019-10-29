
import Taro from '@tarojs/taro';
import { MINX_URL } from './config';
import {dialog} from "@/util/index";

export default ({ url = '', method = 'GET', data = {}, header = {} } = {}) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: MINX_URL(url),
      data: data,
      header: Object.assign({
        'Content-Type': 'application/json',
        'Cookie': 'JSESSIONID=DD3C718FDEA8F0AA939171424835B629'
      }, header),
      method: method.toUpperCase()
    }).then((res) => {
      const { statusCode, data } = res;
      console.log(res)
      if (statusCode >= 200 && statusCode < 300) {
        try {
          if (data.hasOwnProperty("error_code")){
            let code = data.error_code
            switch (code) {
              case 0:
                resolve(data)
                break
              case -1:
                if (/(\/api\/totalCarts|\/api\/goodsDetailInfo)/.test(url)) {
                  reject(new Error(data.message))
                } else {
                  Taro.navigateTo({url: '/pages/Login/index'})
                }
                break
              case 3:
                if (/\/api\/previewOrderByCart/.test(url)) {
                  Taro.navigateBack().then(res => {
                    dialog.toast({title: data.message})
                  })
                }
                reject(new Error(data.message))
                break
              case 7:
                resolve(data)
                break
              case 1:
                if (/\/user\/sms/.test(url)) {
                  // storage.set('cookie', res.cookies)
                }
                break
              default:
                /**
                 * -1: token error; 1: token is null
                 */
                reject(new Error(data.message))
            }
          } else if (data.hasOwnProperty("code")) {
            let code = data.code
            switch (code) {
              case 0:
                resolve(data)
                break
              case 1:
                Taro.navigateTo({url: '/pages/Login/index'})
                break
              default:
                /**
                 * 1 获取失败
                 */
                reject(new Error(data.message))
            }
          } else {
            resolve(data)
          }
        } catch (e) {
          Taro.showToast({
            title: `${e}`,
            icon: 'none',
            mask: true,
          });
        }
      } else {
        reject(new Error(`网络请求错误，状态码${statusCode}`))
        throw new Error(`网络请求错误，状态码${statusCode}`);
      }
    })
  })
}
