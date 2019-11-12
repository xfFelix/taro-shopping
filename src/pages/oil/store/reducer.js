import { constant } from './index'

const INITIAL_STATE = {
  costInfo: {},
  price: 0,
  list: [
      {
        "id": 1072,
        "repaymentAmount": 108.07,
        "taxFee": 0,
        "serviceFee": 9.149999999999991,
        "totalAmount": 109.15,
        "addDate": "2019-06-14 11:32:26",
        "sendDate": null,
        "userId": "7eab5121-b6b7-4e30-a778-cde5885c2afe",
        "status": 2,
        "cardId": 2,
        "cardNum": "",
        "cardUser": "中石化100元充值卡",
        "cardBank": "1",
        "cardSubBank": "107.0",
        "memo": "13284360643673******",
        "idNum": "362421199412010052",
        "idUrl": "3d8ef8476baa4c34b2e6ab05132cc0ed",
        "idBackUrl": "2130440092689907",
        "orderNum": "100",
        "syncNum": 0,
        "name": "1",
        "mobile": "13590344852",
        "address": "邮储银行 |1",
        "vendorUserId": "ab39aaa6cdd34bec8284eab3827d5175",
        "useTime": null,
        "orderTime": "2019-06-14 11:32:26",
        "imgpath": null,
        "orderInfo": null,
        "codeImg": null,
        "start": null,
        "num": null,
        "btype": 4
      },
      {
        "id": 1069,
        "repaymentAmount": 108.07,
        "taxFee": 0,
        "serviceFee": 9.149999999999991,
        "totalAmount": 109.15,
        "addDate": "2019-06-14 11:01:32",
        "sendDate": null,
        "userId": "7eab5121-b6b7-4e30-a778-cde5885c2afe",
        "status": 0,
        "cardId": 2,
        "cardNum": "",
        "cardUser": "中石化100元充值卡",
        "cardBank": "1",
        "cardSubBank": "107.0",
        "memo": "13629749838462******",
        "idNum": null,
        "idUrl": "4e167ebb1b5347e68c342effd23bd1a1",
        "idBackUrl": "2130440092688818",
        "orderNum": "100",
        "syncNum": 0,
        "name": null,
        "mobile": "13590344852",
        "address": null,
        "vendorUserId": "ab39aaa6cdd34bec8284eab3827d5175",
        "useTime": null,
        "orderTime": "2019-06-14 11:01:32",
        "imgpath": null,
        "orderInfo": null,
        "codeImg": null,
        "start": null,
        "num": null,
        "btype": 4
      },
      {
        "id": 916,
        "repaymentAmount": 108.07,
        "taxFee": 0,
        "serviceFee": 9.149999999999991,
        "totalAmount": 109.15,
        "addDate": "2019-05-27 11:26:05",
        "sendDate": null,
        "userId": "7eab5121-b6b7-4e30-a778-cde5885c2afe",
        "status": 2,
        "cardId": 2,
        "cardNum": "",
        "cardUser": "中石化100元充值卡",
        "cardBank": "1",
        "cardSubBank": "107.0",
        "memo": "13453549427179******",
        "idNum": "362421199412010052",
        "idUrl": "c765b396d7d849fbafa714d39a459aca",
        "idBackUrl": "2130440092688727",
        "orderNum": "100",
        "syncNum": 0,
        "name": "肖飞",
        "mobile": "23526877073",
        "address": "邮储银行 |0052",
        "vendorUserId": "ab39aaa6cdd34bec8284eab3827d5175",
        "useTime": null,
        "orderTime": "2019-05-27 11:26:05",
        "imgpath": null,
        "orderInfo": null,
        "codeImg": null,
        "start": null,
        "num": null,
        "btype": 4
      },
      {
        "id": 915,
        "repaymentAmount": 108.07,
        "taxFee": 0,
        "serviceFee": 9.149999999999991,
        "totalAmount": 109.15,
        "addDate": "2019-05-27 11:25:41",
        "sendDate": null,
        "userId": "7eab5121-b6b7-4e30-a778-cde5885c2afe",
        "status": 2,
        "cardId": 2,
        "cardNum": "",
        "cardUser": "中石化100元充值卡",
        "cardBank": "1",
        "cardSubBank": "107.0",
        "memo": "13787380148774******",
        "idNum": "362421199412010052",
        "idUrl": "73cd2c06090e49e5bbfa18e3da0d99ec",
        "idBackUrl": "2130440092689816",
        "orderNum": "100",
        "syncNum": 0,
        "name": "肖飞",
        "mobile": "23526877073",
        "address": "建设银行 |0052",
        "vendorUserId": "ab39aaa6cdd34bec8284eab3827d5175",
        "useTime": null,
        "orderTime": "2019-05-27 11:25:41",
        "imgpath": null,
        "orderInfo": null,
        "codeImg": null,
        "start": null,
        "num": null,
        "btype": 4
      },
      {
        "id": 830,
        "repaymentAmount": 108.07,
        "taxFee": 0,
        "serviceFee": 9.149999999999991,
        "totalAmount": 109.15,
        "addDate": "2019-05-24 10:01:47",
        "sendDate": null,
        "userId": "7eab5121-b6b7-4e30-a778-cde5885c2afe",
        "status": 0,
        "cardId": 2,
        "cardNum": "",
        "cardUser": "中石化100元充值卡",
        "cardBank": "1",
        "cardSubBank": "107.0",
        "memo": "13297546047465******",
        "idNum": null,
        "idUrl": "fff183ccb4e049f1bf63eee20d9fb969",
        "idBackUrl": "2130440092688602",
        "orderNum": "100",
        "syncNum": 0,
        "name": null,
        "mobile": "23526877073",
        "address": null,
        "vendorUserId": "ab39aaa6cdd34bec8284eab3827d5175",
        "useTime": null,
        "orderTime": "2019-05-24 10:01:47",
        "imgpath": null,
        "orderInfo": null,
        "codeImg": null,
        "start": null,
        "num": null,
        "btype": 4
      }
    ],
  recoveryList: [],
  statusList: [
    { label2: '兑换成功', value: 0, label: '充值中' },
    { label2: '回收成功', value: 1, label: '充值成功' },
    { label2: '回收失败', value: 2, label: '充值失败' },
    { label2: '回收中', value: 3, label: '回收中' },
    { label2: '兑换失败', value: 4, label: '兑换失败'}
  ],
  protocol: {
    title: '加油卡回收协议',
    content: `本协议是本人与椰子分商城加油卡充值供应商苏州收卡啦信息技术有限公司之间就加油卡回收服务等相关事宜所订立的契约与约定（以下简称“本协议”）。
              1、充值卡：本协议所称加油卡，为中石油、中石化发行的具有一定面值，可用于加油卡充值的卡片。
              2、本人接受在兑换本服务时支付一定手续费，手续费金额以页面提示为准。手续费将直接从充值卡面值中扣除，即回收实际到账金额为充值卡面值减去手续费。
              3、本人保证充值卡密来源的合法性，对该卡密来源的合法性承担责任，苏州收卡啦信息技术有限公司拒绝一切通过传销、诈骗等非法手段获取的充值卡密，一经发现异常情况，苏州收卡啦信息技术有限公司有义务告知公安机关进行调查处理，并向公安机关提供该用户的交易记录和个人信息，苏州收卡啦信息技术有限公司对该卡密的合法性不承担任何责任。
              4、本人承诺使用本服务时符合椰子分商城用户实名制度。
              5、本人同意，由于本人输入加油卡信息有误导致的延期到账或失败等问题，由此产生的损失自行承担，苏州收卡啦信息技术有限公司对此不承担责任，且自行解决或联系发卡商（即中石油、中石化）解决，苏州收卡啦信息技术有限公司不介入处理。
              6、本人将严格遵守页面提示的每日或每月的最高转让限额，否则对超过限额的回收，苏州收卡啦信息技术有限公司有权不提供服务。
              7、为保障回收款及时安全到账，请保障填写账户信息无误。
              8、本人知悉：本服务条款是处理双方权利义务的约定，除非违反国家强制性法律，否则始终有效。在本人下订单的同时，表示本人明确知晓以上事实，并与苏州收卡啦信息技术有限公司达成协议并接受所有的服务条款，并且本人对本人在订单中提供的所有信息的正确、完整和真实性负责。
              9、本人确认：苏州收卡啦信息技术有限公司对本合约中有关免除或限制责任、苏州收卡啦信息技术有限公司单方面拥有某些权利、增加本人责任或限制本人权利的条款，均已向本人进行了提示和说明。
              10、一旦勾选，即视为本人已经完全了解并接受本协议的全部内容，本人已阅读回收条款，充分了解回收相关信息，将严格按条款内容回收加油卡，对本协议条款的含义和相应的法律后果已全部清楚并理解，愿意遵守其全部内容。同时本人声明填写的回收信息内容完全属实，并保证其内容的真实性。
              最终解释权归苏州收卡啦信息技术有限公司所有。`
  }
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case constant.GET_COST_INFO:
      return {
        ...state,
        costInfo: action.data
      }
    case constant.SUBMIT:
      return {
        ...state,
        price: action.price
      }
    case constant.GET_ORDER_LIST:
      return {
        ...state,
        list: action.data
      }
    case constant.LOAD_MORE_LIST:
      return{
        ...state,
        list: [...state.list, ...action.data]
      }
    case constant.GET_RECOVERY_LIST:
      return {
        ...state,
        recoveryList: action.data
      }
    default:
      return state
  }
}
