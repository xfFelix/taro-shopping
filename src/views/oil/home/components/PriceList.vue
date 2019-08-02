<template>
  <div class="content">
    <cube-checker v-model="faceValue" :options="list" type="radio" class="list clear-fix">
      <cube-checker-item v-for="item in list" :key="item.value" :option="item" class="item">
          <p class="price">{{item.value}}<i>元</i></p>
          <!-- <span class="circle"></span> -->
      </cube-checker-item>
    </cube-checker>
    <div class="desc">
      <h1>温馨提示:</h1>
      <p class="long" v-html="descFilter(config.rechargeType)"></p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
const descList = [
  {type: 1, value:
       `1. 本业务仅支持有实名加油卡的情况，如无加油卡，须办理加油卡并进行首次充值后，方可进行本业务的充值活动（提示：新开卡用户需24小时后才可办理自助充值）；<br/>
        2. 中石化加油卡号是以100011开头的19位数字，暂仅支持状态正常的主卡充值，副卡及损坏卡、挂失卡、过期卡、注销卡等均不能充值。中石化官方客服热线：区号+95105888/91505988；<br/>
        3. 中石油加油卡号是以90开头的16位数字，暂仅支持个人卡记名卡的充值，挂失卡、过期卡、注销卡等均不能充值。中石油官方客服热线：95504；<br/>
        4. 24小时内到账；<br/>
        5. 提示：根据中石油/中石化规定，为确保账户资金安全，充值后金额自动存储在“待圈存金额中”，使用时只需到任意中石油/中石化售卡充值网点或自助终端设备上进行加油卡圈存操作，即可充值成功；<br/>
        6. 根据中石油/中石化规定，同一张实名加油卡每天仅支持在一个或多个平台累计充值8次，例如：在中石油充值1次，在某东充值2次，在椰子分充值3次，那么您当日的充值次数仅剩余2次；<br/>
        7. 本业务不支持7天无理由退货退款，请知晓。`},
  {type: 2, value:
       `1. 本卡密可为中石油/中石化加油卡充值使用，如无加油卡，须办理加油卡并进行首次充值后，方可进行本业务的充值活动（提示：新开卡用户需24小时后才可办理自助充值）；<br/>
        2. 卡密有效期为自发放之日起一年；<br/>
        3. 此卡密可在中石油/中石化所属售卡充值网点 充值，也可登陆中国石化加油卡网站在线充值<span class="price-color">www.sinopecsales.com</span>以及登陆中国石油加油卡网站在线充值<span class="price-color">www.95504.net</span>或<span class="price-color">www.card.petrochina.com.cn</span><br/>
        4.  提示：根据中石油/中石化规定，为确保账户资金安全，充值后金额自动存储在“待圈存金额中”，使用时只需到任意中石油/中石化售卡充值网点或自助终端设备上进行加油卡圈存操作，即可充值成功；<br/>
        5. 根据中石油/中石化规定，同一张实名加油卡每天仅支持在一个或多个平台累计充值8次，例如：在中石油充值1次，在某东充值2次，在椰子分充值3次，那么您当日的充值次数仅剩余2次；<br/>
        6. 本业务不支持7天无理由退货退款，请知晓。<br/>`}
]
const descListOption = descList.reduce((acc, item) => {
  acc[item.type] = item.value
  return acc
},{})
export default {
  data: () => ({
    list: [
      {value: 100, sell: 101},
      {value: 200, sell: 201},
      // {value: 500, sell: 501},
      {value: 1000, sell: 1001},
    ],
    checkValue: 100
  }),
  computed: {
    ...mapGetters({
      config: 'oil/getConfig'
    }),
    faceValue: {
      get() {
        return this.$store.state.oil.config.faceValue
      },
      set(val) {
        this.$store.dispatch('oil/setConfig', {faceValue: val})
      }
    }
  },
  methods: {
    descFilter(type) {
      return descListOption[type]
    }
  }
}
</script>

<style lang="scss">
.content{
  .list{
    .cube-checker-item_active{
      background: #30CE84;
      color: #fff !important;
      border: none;
      &::after{
        border: none;
      }
    }
    .border-top-1px {
      &::before{
        border-top: 1px solid #30CE84;
      }
    }
    .border-left-1px{
      &::before{
        border-left: 1px solid #30CE84;
      }
    }
    .border-right-1px{
      &::before{
        border-right: 1px solid #30CE84;
      }
    }
    .border-bottom-1px{
      &::before{
        border-bottom: 1px solid #30CE84;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.content{
  padding-bottom: 29px;
  .list{
    .item{
      border-radius: 0;
      width: 104px;
      float: left;
      margin: 20px 0 0 15px;
      padding: 0;
      height: 60px;
      line-height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #30CE84;
      border: 1px solid #30CE84;
      position: relative;
      z-index: 9;
      border-radius: 5px;
      /* &::before{
        content: '';
        display: block;
        width: 10px;
        height: 20px;
        border: 1px solid #30CE84;
        border-left: none;
        border-radius: 0 20px 20px 0;
        position: absolute;
        left: -2px;
        z-index: 10;
        background: #fff;
      } */
      .price{
        font-size: 24px;
        i{
          font-size: 12px;
        }
      }
      .circle{
        display: inline-block;
        width: 10px;
        height: 20px;
        border: 1px solid #30ce84;
        border-right: none;
        position: absolute;
        right: -2px;
        border-radius: 20px 0 0 20px;
        z-index: 10;
        background: #fff;
      }
    }
  }
  .desc{
    margin-top: 28px;
    padding: 0 18px;
    h1{
      font-size: 15px;
      color: #111010;
      font-weight: bold;
    }
    p{
      margin: 17px 0 0;
      font-size: 12px;
      color: #4E4D4D;
      line-height: 24px;
      word-break: break-all;
    }
  }
}
</style>
