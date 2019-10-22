import Taro from "@tarojs/taro"

class Navigator {
  static push({url, success, fail, complete}) {
    let promise = new Promise(async (resolve, reject) => {
      try {
        let res = await Taro.navigateTo({url, fail, complete, success})
        resolve(res)
      } catch (e) {
        reject(new Error(e))
      }
    })
    return promise
  }

  static switch({url, success, fail, complete}) {
    let promise = new Promise(async (resolve, reject) => {
      try {
        let res = await Taro.switchTab({url, fail, complete, success})
        resolve(res)
      } catch (e) {
        reject(new Error(e))
      }
    })
    return promise
  }

  static redirect({url, success, fail, complete}) {
    let promise = new Promise(async (resolve, reject) => {
      try {
        let res = await Taro.redirectTo({url, fail, complete, success})
        resolve(res)
      } catch (e) {
        reject(new Error(e))
      }
    })
    return promise
  }
}

export default Navigator
