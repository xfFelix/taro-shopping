<template>
    <div class="oilRecord">
        <div class="headFixed">
            <header>
                <i class="cubeic-back" @click="$router.back()"></i>
                兑换记录
            </header>
            <div class="whoSelectW">
                <p :class="typeFlag==0?'whoSelectLogo':''"  @click="directCharge()">
                    <span>金条</span>
                </p>
                <p :class="typeFlag==1?'whoSelectLogo':''"   @click="cardCharge()"  v-if="!yingqiudiShow">
                    <span >金砂</span>
                </p>
            </div>
        </div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0">
                <ul class="recordW">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                            <span v-if="item.code">卡密：
                              {{item.code.length>14?item.code.substring(item.code.length-14):item.code}}
                              <em class="see" @click="dialogPwd(item.id)" >查看</em>
                            </span>
                            <span v-else>卡密：— —</span>
                            <div v-if="item.buyInfo">
                                <span v-if="item.buyInfo.status==0">回收中</span>
                                <span v-if="item.buyInfo.status==1">回收成功</span>
                                <span v-if="item.buyInfo.status==2">回收取消</span>
                            </div>
                            <div v-else>
                                <span v-if="item.status==0">兑换中</span>
                                <span v-if="item.status==1">兑换成功</span>
                                <span v-if="item.status==2">兑换失败</span>
                            </div>
                        </div>
                        <div class="reInfoW">
                            <div class="reInfo">
                                <p>时间：{{item.addDate}}</p>
                                <p>数量： {{item.gtype==0?Math.round(item.weight/10)+'根':Math.round(item.weight/0.2)+'颗'}}</p>
                                <p>{{item.gtype==0?'金条价格':'金砂价格'}}：{{item.repaymentAmount|toPrice}}</p>
                                <p>服务费：{{item.serviceFee|toPrice}}</p>
                                <p>税费：{{item.taxFee|toPrice}}</p>
                                <p class="total">合计：{{item.totalAmount|toPrice}}</p>
                            </div>
                            <div class="recover"  @click="recovery(item.id,item.gtype,item.code,item.weight)"  v-if='(item.code && (!item.buyInfo || item.buyInfo.status==2))'>
                                立即回购
                            </div>
                            <div v-if="(item.buyInfo && item.buyInfo!=2)">
                              <div class="gold-bnt-info"  :style="item.statusT?'height:auto':'height:0'">
                                <p>银行卡号：{{item.buyInfo.cardNum}}</p>
                                <p>开户行：{{item.buyInfo.bank}}</p>
                                <p class="backMoney">回购金额：{{(item.buyInfo.goldPrice*item.weight)|toPrice}}</p>
                                <p>姓名：{{item.buyInfo.name}}</p>
                              </div>
                              <div class="gold-bnt"  @click="transClick(item,index)">
                                <span class="moreIcon iconImg" :style="item.statusT?'transform:rotate(180deg)':'transform:rotate(360deg)'"></span>
                              </div>
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
import { goldLog,goldPrice } from 'api';
import { mapGetters ,mapActions } from 'vuex';
import { vipCustom } from '@/mixins';
import clip from 'util/clipboard';
export default {
    mixins: [vipCustom],
    data: () => ({
        typeFlag: 0,
        recodeList: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '上拉加载更多...',
        pullUpLoadNoMoreTxt: '没有更多数据了~~',
        start:0,
        tenFlag: true,
        btnDisabledCode: false,
        time: 0,
        code: '',
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
            goldConfig: 'gold/getConfig',
        }),
    },
    methods: {
       ...mapActions({
          backInfo: 'gold/setBackInfo',
          initConfig:'gold/initConfig'
        }),
        transClick(item,index){
            this.recodeList[index].statusT = !item.statusT;
        },
        initData() {
          this.start=0;
          this.recodeList = [];
          this.tenFlag = true
        },
        directCharge() {
            this.typeFlag = 0;
            this.initData();
            this.getScenicList();
            this.getPrice()
        },
        cardCharge() {
            this.typeFlag = 1;
            this.initData();
            this.getScenicList();
            this.getPrice()
        },
        async getPrice() {
          let res = await goldPrice({ id: this.typeFlag });
          if(res.error_code!=0) return this.$toast(res.message);
          this.goldPrice = res.data.goldPrice;
          if(this.typeFlag==0){
            this.backInfo({barPrice: this.goldPrice})
          }else{
            this.backInfo({sandPrice: this.goldPrice});
          }
        },
        async getScenicList() {
            let data = await goldLog({
              token: this.getToken,
              id: this.typeFlag,
              start: this.start,
            });
            if (data.error_code != 0) {
              return this.$toast(data.message);
            }
            data.data.forEach(item=> {    //回购信息显示
              item.statusT = false;
            })
            this.recodeList.push(...data.data);
            if (data.data.length < 10) {
                this.tenFlag = false;
            }
        },
        dialogPwd(id) {
          this.$createDialog({
            type: 'alert',
            confirmBtn: {
              text: '提交',
              active: true
            },
            onConfirm: () => { this.handerConfirm(id) },
            showClose: true,
            onClose: () => {}
          }, (h) => {
            if (this.userinfo.payValidType === 1) {
              return [
                h('div', { class: { 'title-wrapper': true }, slot: 'title' }, [h('p',{ class: { text: true }}, '请输入支付密码')]),
                h('div', { class: { 'content-wrapper': true }, slot: 'content' }, [h('cube-input', { class: { 'input-code': true }, attrs: {type: 'password', eye: {open: true, reverse: true} , autofocus: true, maxlength: 6, placeholder: '请输入验证码' , pattern: '[0-9]*', value: this.code},
                  on: { input: (val) => { this.code = val.trim() }}
                })])
              ]
            } else {
              return [
                h('div', { class: { 'title-wrapper': true }, slot: 'title' }, [h('p',{ class: { text: true }}, '请输入验证码')]),
                h('div', { class: { 'content-wrapper': true }, slot: 'content' },
                [
                  h('cube-input', { class: { 'input-code': true }, attrs: {type: 'tel', autofocus: true, maxlength: 4, placeholder: '请输入验证码' , pattern: '[0-9]*', value: this.code},
                    on: { input: (val) => { this.code = val.trim() }}
                  }),
                  h('button', { class:{ 'sms-code': true }, on: { click: this.handlerSendCode }, attrs: { disabled: this.btnDisabledCode } }, this.time > 0? this.time + 's': '发送验证码')
                ])
              ]
            }
          }).show()
        },
        async handlerSendCode() {
          const { sendSmsCode } = await import(/* webpackPrefetch: true */ 'api')
          const { error_code, data, message } = await sendSmsCode({token: this.getToken})
          if (error_code) return this.$toast(message)
          this.$toast('验证码已发送')
          this.btnDisabledCode = true;
          this.time = 60;
          this.interval = window.setInterval(() => {
            if (this.time > 0) {
              this.time--
            } else {
              this.btnDisabledCode = false
              window.clearInterval(this.interval)
            }
          }, 1000)
        },
        async handerConfirm(id) {
          if (!this.code) return this.$toast('请输入数字')
          const { goldCode } = await import(/* webpackPrefetch: true */ 'api')
          const { error_code , data, message } = await goldCode({ token: this.getToken, verify_code: this.code, id: id})
          if (error_code != 0) return this.$toast(message)
          this.code = ''
          this.$dialog({type:'confirm',content: data,title:'您的黄金兑换码是：',confirmBtn:{text:'复制'}},($event) => {
              this.handleCopy(data,$event)
          })
        },
        onPullingUp() {
            if (this.tenFlag === true) {
                this.start+=10
                this.getScenicList();
            }
            if (!this.tenFlag && this.recodeList.length > 0) {
                this.$refs.scroll.forceUpdate();
            }
        },
        recovery(id,gtype,code,weight) {
          this.backInfo({cardId:id,cardCode:code,type:gtype,weight:weight})
          this.$router.push({name:"goldBuyBack"})
        },
        handleCopy(text, event) {
          clip(text, event)
        },
    },
    mounted() {
      if(this.$route.query.cardId==1){
        this.typeFlag = 1;
      }
      this.getScenicList();
      this.getPrice();
      this.initConfig();
    }
}
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.whoSelectW {
    height: 36px;
    background: #373C48;
    p{
        width: 50%;
        text-align: center;
        color: #fff;
        height: 100%;
        font-size: 15px;
        display: inline-block;
        span{
            height: 34px;
            width: 110px;
            display: inline-block;
            text-align: center;
        }
        &:nth-of-type(2){
          &::before{
            color: #b1b1b1;
            font-size: 18px;
            content: '';
            display: inline-block;
            width: 1px;
            height: 22px;
            background: #fff;
            float: left;
          }
        }
    }
    .whoSelectLogo {
        color: #30CE84;
        span {
            border-bottom: 2px solid #30CE84;
        }
    }
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
          .see{
              color: #30ce84;
              text-decoration: underline;
              font-size: 12px;
          }
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

.headFixed {
    position: fixed;
    width: 100%;
    z-index: 2;
    background: #373C48;
}

.scroll-list-wrap {
    padding-top: 80px;
    height: calc(100vh - 80px);
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden
}

header {
    position: relative;
    background: #373C48;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    padding-bottom: 5px;
    .cubeic-back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 15px;
    }
}
.oilRecord{
  background: #fff;
}

.gold-bnt-info{
  background: #ddd;
  text-align: left;
  padding: 0 14px;
  color: #000;
  font-size: 12px;
  overflow: hidden;
  transition: 0.2s;
  height: 0;
  position: relative;
  .backMoney{
    position: absolute;
    bottom: 10px;
    right: 12px;
    font-size: 14px;
  }
  p{
    line-height: 28px;
    &:first-of-type{
      margin-top: 8px;
    }
    &:last-child{
      margin-bottom: 8px;
    }
  }

  .total{
      position: absolute;
      bottom: 6px;
      right: 14px;
      font-size: 15px;
  }
}
.gold-bnt{
    background: #373C48;
    border-radius: 0 0 5px 5px;
    font-size: 15px;
    text-align: center;
    padding: 0;
    display: inherit;
    color: #fff;
    line-height: 44px;
    padding-top:5px;
}
.moreIcon{
    display: inline-block;
    transition: 0.1s;
    width: 20px;
    height:20px;
    background-image: url("../../../common/images/more.png");
    transform:rotate(180deg);
    transition: 0.2s;
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .headFixed{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>
<style lang="scss">
.cube-dialog-main{
  .cube-dialog-alert{
    .cube-dialog-title{
      .title-wrapper{
        .text{
          padding: 15px 0;
        }
      }
    }
    .cube-dialog-content{
      .content-wrapper{
        padding: 0 15px;
        position: relative;
        .sms-code{
          position: absolute;
          right: 17px;
          top: 0;
          background: transparent;
          border: none;
          font-size: 12px;
          color: #30CE84;
          height: 100%;
        }
      }
    }
  }
}
</style>
