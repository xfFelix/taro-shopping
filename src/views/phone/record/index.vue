<template>
    <div class="oilRecord">
        <div class="headFixed">
            <header>
                <i class="cubeic-back" @click="$router.push({name:'phoneHome'})"></i>
                兑换记录
            </header>
            <div class="whoSelectW">
                <p :class="typeFlag==0?'whoSelectLogo':''"  @click="directCharge()" v-show="!yingqiudiShow">
                    <span>直充</span>
                </p>
                <p :class="typeFlag==1?'whoSelectLogo':''"   @click="cardCharge()">
                    <span >充值卡</span>
                </p>
            </div>
        </div>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0">
                <ul class="recordW">
                    <li v-for="(item,index) in recodeList" :key="index">
                        <div class="reName flex">
                            <span>产品名称：{{item.cardNum==0?item.cardBank+'元话费直充':item.cardBank+'元话费充值卡'}}</span>
                            <div>
                                <span v-if="item.status==0">兑换中</span>
                                <span v-if="item.status==1">兑换成功</span>
                                <span v-if="item.status==2">兑换失败</span>
                                <span v-if="item.status==4">已兑换</span>
                                <span v-if="item.status==5">已过期</span>
                                <span v-if="item.status==6">已废弃</span>
                                <span v-if="item.status==7">已转卖</span>
                            </div>

                        </div>
                        <div class="reInfoW">
                            <div class="reInfo">
                                <p>时间：{{item.addDate}}</p>
                                <p v-if="typeFlag==0">充值账号：{{item.cardUser}}</p>
                                <p v-if="typeFlag==1">卡号：{{item.number?item.number:'— —'}}</p>
                                <p v-if="typeFlag==1">卡密：{{item.number?item.password:'— —'}}</p>
                                <p>服务费：{{(Number(item.totalAmount)-Number(item.cardBank)-Number(item.taxFee))|toPrice}}</p>
                                <p>税费：{{item.taxFee|toPrice}}</p>
                                <p class="total">合计：{{item.totalAmount|toPrice}}</p>
                            </div>
                        </div>
                        <a class="pBUse" :href="item.orderNum" v-if="item.cardNum==1 && item.status==1">立即使用</a>
                    </li>
                </ul>
            </cube-scroll>
            <no-data :data="recodeList"></no-data>
        </div>
    </div>
</template>
<script>
import { phoneLogs } from 'api';
import { mapGetters ,mapActions } from 'vuex';
import {vipCustom} from '@/mixins'
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
            phoneConfig: 'phone/getConfig'
        }),
    },
    methods: {
        initData() {
          this.start=0;
          this.recodeList = [];
          this.tenFlag = true
        },
        directCharge() {
          this.typeFlag = 0;
          this.initData();
          this.getScenicList();
        },
        cardCharge() {
          this.typeFlag = 1;
          this.initData();
          this.getScenicList();
        },
        async getScenicList() {
            let data = await phoneLogs({
              token: this.getToken,
              history_type: this.typeFlag,
              start: this.start,
            });
            if (data.error_code != 0) {
              return this.$toast(data.message);
            }
            for(var i=0;i<data.data.length;i++){
                if(data.data[i].orderNum && data.data[i].orderNum.indexOf('https')!=-1){
                data.data[i]['number'] = this.getUrlParam("number",data.data[i].orderNum);
                data.data[i]['password'] = this.getUrlParam("password",data.data[i].orderNum)
              }
            }
            this.recodeList.push(...data.data);
            if (data.data.length < 10) {
                this.tenFlag = false;
            }
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
        getUrlParam(name,locationUrl){
          var arr = locationUrl.toString().split("?")[1].split('&')
          var res = {}
          for (var i = 0; i < arr.length; i++) {
            res[arr[i].split('=')[0]] = arr[i].split('=')[1]
          }
          return res[name]
        },
    },
    mounted() {
      if(this.$route.query.cardId==1 || this.userinfo.vendorId=='yingqiudi'){
        this.typeFlag = 1;
      }
      this.getScenicList();
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
            margin: 0 auto;
        }
        &:nth-of-type(1){
          &::after{
            color: #b1b1b1;
            font-size: 18px;
            content: '';
            display: inline-block;
            width: 1px;
            height: 22px;
            background: #fff;
            float: right;
          }
        }
    }
    .whoSelectLogo {
        span{
          color: #30ce84;
          border-bottom: 2px solid #30ce84;
        }
    }
    .divide {
        color: #b1b1b1;
        font-size: 18px;
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
.pBUse {
    background: #30CE84;
    color: #fff;
    text-align: center;
    line-height: 44px;
    border-radius: 0 0 5px 5px;
    font-size: 15px;
    display: inline-block;
    width: 100%;
    height: 100%;
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
