


<template>
    <div class="CCRecord">
      <header><i class="cubeic-back back" @click="$router.back()"></i>还款记录</header>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0">
                <ul class="recordW">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                            <span>卡号：{{item.cardNum}}</span>
                            <div>
                                <span v-if="item.status==0">还款中</span>
                                <span v-if="item.status==1">已还款</span>
                                <span v-if="item.status==2">已取消</span>
                                <span v-if="item.status==3">还款失败</span>
                            </div>
                        </div>
                        <div class="reInfoW">
                            <div class="reInfo">
                                <p>时间：{{item.addDate}}</p>
                                <p>开户行：{{item.cardBank}}</p>
                                <p>还款金额：{{item.repaymentAmount|toPrice}}</p>
                                <p>服务费：{{item.serviceFee|toPrice|toPrice}}</p>
                                <p>税费：{{item.taxFee|toPrice}}</p>
                                <p class="total">合计：{{item.totalAmount|toPrice}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </cube-scroll>
            <no-data :data="recodeList"></no-data>
        </div>
    </div>
</template>
<script>
import { logsCard } from 'api';
import { mapGetters ,mapActions } from 'vuex';
export default {
    data: () => ({
        recodeList: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '上拉加载更多...',
        pullUpLoadNoMoreTxt: '没有更多数据了~~',
        start:0,
        tenFlag: true,
    }),
    components: {
        NoData: () => import('components/NoData')
    },
    computed: {
        options() {
            return {
                pullUpLoad: this.pullUpLoadObj,
            }
        },
        pullUpLoadObj: function() {
            return this.pullUpLoad ? {
                threshold: parseInt(this.pullUpLoadThreshold),
                txt: {
                    more: this.pullUpLoadMoreTxt,
                    noMore: this.pullUpLoadNoMoreTxt
                }
            } : false
        },
        ...mapGetters({
            getToken: 'getToken',
            userinfo: 'getUserinfo',
            phoneConfig: 'phone/getConfig'
        }),
    },
    methods: {
        initData() {
          this.start=0;
          this.recodeList = [];
          this.tenFlag = true
        },
        async logsCard() {
            let data = await logsCard({
              token: this.getToken,
              start: this.start,
            });
            if (data.error_code != 0) {
              return this.$toast(data.message);
            }
            this.recodeList.push(...data.data);
            if (data.data.length < 10) {
                this.tenFlag = false;
            }
        },
        onPullingUp() {
            if (this.tenFlag === true) {
                this.start+=10
                this.logsCard();
            }
            if (!this.tenFlag && this.recodeList.length > 0) {
                this.$refs.scroll.forceUpdate();
            }
        },
    },
    mounted() {
      this.logsCard();
    }
}
</script>

<style lang="scss" scoped>
.CCRecord{
  background: #FFF;
  min-height: 100%;
  header{
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    background: #373C48;
    font-size: 18px;
    color: #fff;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.4rem;
      font-size: 18px;
    }
  }
}

.scroll-list-wrap {
    padding-top: 44px;
    height: calc(100vh - 44px);
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
}

.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}


.recordW {
    li {
        border: 1px solid #DEDEDE;
        background: #fff;
        border-radius: 5px;
        margin: 20px 15px;
        font-size: 13px;
        box-sizing: border-box;
        .reName {
          background: transparent;
          line-height: 44px;
          font-size: 15px;
          color: rgb(74, 74, 74);
          padding: 0 10px;
        }
        .reInfoW {
            background: #F4F4F4;
            color: rgb(74, 74, 74);
            .reInfo {
              padding: 0 10px 10px 10px;
              position: relative;
                p {
                    font-size: 12px;
                    padding-top: 15px;
                }
                .total{
                  position: absolute;
                  bottom: 15px;
                  right: 10px;
                  font-size: 15px;
                }
            }
            .recover{
              width: 100%;
              background: #30CE84;
              color: #fff;
              text-align: center;
              line-height: 44px;
              border-radius:0px 0px 5px 5px; /*no*/
              font-size: 15px;
              &.recoverNo{
                background: #DEDEDE;
                color: #4A4A4A;
              }
            }
        }
    }
}



</style>
<style scoped>
@media screen and (min-width: 600px){
  header{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>

