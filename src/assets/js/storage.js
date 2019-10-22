import Taro from "@tarojs/taro"

class Storage {
  constructor(prefix){
    this.prefix = prefix ? prefix + '_' : ''
  }

  get(key) {
    let data = Taro.getStorageSync(this.prefix + key)
    if (!data || data === 'null') {
      return null
    }
    let now = this.getCurrentTimeStamp()
    let obj;
    try {
      obj = JSON.parse(data)
    } catch (e) {
      return null
    }
    if (obj.expiryTime === 0 || obj.expiryTime > now) {
      return obj.value;
    }
    return null
  }

  set(key, value, duration) {
    let data = {
      value: value,
      expiryTime: !duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration)
    }
    Taro.setStorageSync(this.prefix + key, JSON.stringify(data))
  }

  remove(key) {
    Taro.removeStorageSync(this.prefix + key)
  }

  getCurrentTimeStamp() {
    return Date.parse(new Date())
  }
}

export default Storage
