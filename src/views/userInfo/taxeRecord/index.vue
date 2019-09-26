


<template>
    <div class="taxeRecord">
       <Header class="navbar" :show-more="!yingqiudiShow">缴税记录</Header>
        <div class="scroll-list-wrap">
            <cube-scroll ref="scroll" :data="recodeList" :options="options" @pulling-up="onPullingUp" v-if="recodeList.length!=0">
                <ul class="recordW">
                  <li class="slogsLi" v-for="(item,index) in recodeList" :key="index">
                    <div>{{item.action}}<span style="color:#36CF86;font-size:12px;">税费：{{item.taxFee}}</span></div>
                    <div><p class="timeLogo-wrap"><span class="timeLogo"></span>{{item.orderDate}}</p></div>
                    <p><span class="pBGreen"></span>订单价格：{{item.total_price}}</p>
                  </li>
                </ul>
            </cube-scroll>
            <no-data :data="recodeList"></no-data>
        </div>
    </div>
</template>
<script>
import { taxes } from 'api';
import { mapGetters ,mapActions } from 'vuex';
import { vipCustom} from '@/mixins';
export default {
    mixins: [vipCustom],
    data: () => ({
        recodeList: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '上拉加载更多...',
        pullUpLoadNoMoreTxt: '没有更多数据了~~',
        start:0,
        tenFlag: true,
    }),
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
        async taxes() {
            let data = await taxes({
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
                this.start += 10
                this.taxes();
            }
            if (!this.tenFlag && this.recodeList.length > 0) {
                this.$refs.scroll.forceUpdate();
            }
        },
    },
    components: {
      Header: () => import('@/components/Header'),
      NoData: () => import('components/NoData')
    },
    mounted() {
      this.taxes();
    }
}
</script>

<style lang="scss" scoped>
.taxeRecord{
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
      left: 15px;
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

.recordW {
  .slogsLi{
    background: #Fff;
    margin: 10px;
    padding:15px;
    color: #666;
    div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 25px;
      font-size: 14px;

      &:first-of-type{
        color: #252525;
      }
      &:last-of-type{
        color: #666;
      }
    }
  }
  .timeLogo-wrap{
    display: flex;
    align-items: center;
    .timeLogo {
      background: #999999;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: relative;
      display: inline-block;
      margin: 0 2px 0 0;
        &::before {
          position: absolute;
          width: 3px;
          background: #fff;
          display: block;
          border-top: 1px solid #fff;
          top: 5px;
          right: 2px;
          content: ''
        }
        &::after{
          left: 4px;
          position: absolute;
          width: 3px;
          background: #fff;
          display: block;
          border-bottom: 1px solid #fff;
          top: 4px;
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
          content: ''
        }
    }
  }
    .pBGreen{
    width: 8px;
    height: 8px;
    display: inline-block;
    background: #19ad6a;
    border-radius: 50%;
    margin-right: 3px;
  }
}
</style>
<style scoped>
@media screen and (min-width: 600px){
  .navbar{
    max-width: 384px; /*no*/
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>

