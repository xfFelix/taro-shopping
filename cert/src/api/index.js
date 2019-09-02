import fetch from './fetch'
/**
 * 签约助手---发送短信
 * @param {*} data
 */
export const contractSms = data => fetch({
  url:  `${process.env.VUE_APP_CONTRACT_URL}/contract/sms`,
  method: 'POST',
  data
})

/**
 * 签约助手---校验姓名和身份证号码
 * @param {*} data
 */
export const checkId = data => fetch({
  url: `${process.env.VUE_APP_CONTRACT_URL}/contract/checkNameAndIdCard`,
  method: 'POST',
  data
})

/**
 * 签约助手---校验姓名和身份证号码
 * @param {*} data
 */
export const signInfo = data => fetch({
  url: `${process.env.VUE_APP_CONTRACT_URL}/contract/save`,
  method: 'POST',
  data
})

/**
 * 人脸识别---校验姓名和身份证号码
 * @param {*} data
 */
export const checkInfoByFace = data => fetch({
  url: `${process.env.VUE_APP_CONTRACT_URL}/faceRecognition/createAccount`,
  method: 'POST',
  data
})


