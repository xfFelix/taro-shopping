<template>
  <div class="agreeFixed" v-if="show">
    <div class="iconfont goback" @click="$emit('handle-show-file')">&#xe61e;</div>
    <div class="agreeContentW">
      <h1>
        椰子分兑换金币说明
      </h1>
      <div class="agreeContent">
        <h2>一、椰子分是什么？</h2>
        椰子分是一种“获胜奖励积分”，人民币：椰子分=1：1价值，在合作游戏平台的各项赛事中获胜的用户，将得到椰子分作为奖励，获胜用户可在官方指定的兑换商城进行兑换，同时按海南自贸港优惠税率纳税，椰子分商城拥有信用卡还款、话费充值、加油卡充值、黄金兑换、京东商品、海南特色等20多万种丰富的商品及服务。</br>
        <h2>二、如何获取椰子分？</h2>
        参加合作的游戏平台线上、线下各项赛事及活动，进入奖励圈即可获得对应椰子分作为奖励，不可现金直接购买。</br>
        <h2>三、兑换游戏金币流程：</h2>
        ①绑定椰子分账号</br>
        ②实名认证（月累计兑换金额超3万椰子分时）</br>
        ③输入充值金币的游戏账号，兑换金币（支付费用包含金币等值的椰子分、服务费及税费，在兑换记录可查看明细及充值的游戏账号）</br>
        <table>
          <tr>
            <td>服务费</td>
            <td>2%</td>
          </tr>
           <tr>
            <td>椰子分月累计兑换</td>
            <td>税率</td>
          </tr>
           <tr>
            <td>≤3万（含）</td>
            <td>0%</td>
          </tr>
           <tr>
            <td>3万-10万（含）</td>
            <td>月累计兑换额*约1%</td>
          </tr>
           <tr>
            <td>＞10万</td>
            <td>月累计兑换额*约4.15%</td>
          </tr>
        </table>
        注：本兑换不支持7天无理由退货，请知晓！</br>
        <h2>四、欢迎咨询客服小椰子：</h2>
        联系电话：0898-3130-5180</br>
        QQ：403292023</br>
        微信：COCOGC2018</br>
        <h2>五、传奇金币发放问题请咨询传奇扑克客服：</h2>
        微信：legendpoker_qn</br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({

  }),
  methods: {
    goBack() {

    }
  },
  mounted() {
    console.log(this.show)
  }

}
</script>

<style lang="scss" scoped>
.agreeFixed {
  position: fixed;
  top: 0;
  z-index: 10;
  background: #fff;
  height: 100%;
  width: 100%;
}

.goback {
  height: 50px;
  line-height: 50px;
  margin-left: 15px;
}

h1 {
  text-align: center;
  font-size: 18px;
  color: #30ce84;
  line-height: 30px;
}

h2 {
  line-height: 40px;
  font-size: 16px;
  margin-top: 10px;
}

.agreeContentW {
  position: relative;
  overflow: scroll;
  height: 100%;
  margin: 0 20px;
  .agreeContent {
    font-size: 13px;
    line-height: 28px;
    padding-bottom: 150px;
  }
}

table {
  border-collapse: collapse;
  width: 94%;
  tr {
    td {
      width: 45%;
      padding-left: 10px;
    }
  }
  td,
  th {
    border: 1px solid black;
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px) {
  .agreeFixed {
    max-width: 384px;
    /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
