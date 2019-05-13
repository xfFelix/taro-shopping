<template>
  <div>
    <div class="typeHeader">
      <div class="headerTitle">
        <i class="cubeic-back" @click="$router.back()"></i>
        {{$route.query.title}}
      </div>
      <div class="cardNumber">
        <span class="logoPng"></span>
        <input type="text" placeholder="请输入账号" v-model="infoContent.cardNumber" @keyup="trim()" />
      </div>
    </div>

    <div class="typeContent">
      <div class="surplus">
        <span>剩余可用余额：</span>
        <span>{{userinfo.score | toPrice}} </span>
      </div>
      <div class="typeVal">
        <p class="typeValTitle">种类：</p>
        <ul>
          <li v-for="(item,index) in cardList" :key="index" @click="typeCli(index)" :class="typeFlag==index?'typeSelect':''">
            <div>{{item[0]}}</div>
          </li>
        </ul>
      </div>

      <div class="faceVal">
        <p class="faceValTitle">面值：</p>
        <ul>
          <li v-for="(itemVal,index) in valCard" :key="index" @click="timeCli(index,itemVal.productId)" :class="timeFlag==index?'timeSelect':''">
            <div class="saleW">
              <div>
                <p v-if="itemVal.productType==='1'">周卡</p>
                <p v-else-if="itemVal.productType==='2'">月卡</p>
                <p v-else-if="itemVal.productType==='3'">季卡</p>
                <p v-else-if="itemVal.productType==='4'">半年卡</p>
                <p v-else>年卡</p>
              </div>
              <p>
                <span>售价：</span>
                <span>{{itemVal.sellingPrice|toPrice}}</span>
              </p>
            </div>
            <div class="realW">
              <span>刊例价:</span>
              <span>{{itemVal.marketPrice|toPrice}}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="reminder">
        <p class="reminderTitle">温馨提示：</p>
        <div>
          我不知道我这里该写什么，所以就随便写一个就好啦，嗯 就不知道了，其他的以后再说
        </div>
      </div>
    </div>
    <div class="changeC" :class="infoContent.cardNumber?'changeCliNo':'changeCli'" @click="changeC">点击兑换</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getVipList } from 'api'
export default {
  data: () => ({
    valCard: [],
    cardList: [],
    typeFlag: 0,
    timeFlag: 0,
    infoContent: {
      productId: undefined,
      cardNumber: undefined,
    }
  }),
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo'
    })
  },
  methods: {
    trim(){
        this.infoContent.cardNumber = this.infoContent.cardNumber.replace(/[^\w]/g,'')
    },
    initData() {
      this.timeFlag = 0;
      this.infoContent.productId = this.valCard[0].productId;
    },
    timeCli(index, productId) {
      this.timeFlag = index;
      this.infoContent.productId = productId;
    },
    typeCli(typeId) {
      this.typeFlag = typeId;
      this.valCard = this.cardList[typeId][1];
      this.initData()
    },
    changeC() {
      if (!this.infoContent.cardNumber) {
        return false;
      }
      this.$emit('info-content', this.infoContent)
    },
    //卡面值及类型
    async getVipList() {
      let data = await getVipList({ productType: this.$route.query.id });
      if (data.code != 1) return this.$toast(data.message);
      this.cardList = data.data;
      this.valCard = this.cardList[0][1];
      this.initData();
    },
  },
  mounted() {
    this.getVipList()
  }
}
</script>

<style lang="scss" scoped>
.typeHeader {
  background: #373C48;
  color: #fff;
  height: 83px;
  position: relative;
  .headerTitle {
    padding: 10px 0 0 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    .cubeic-back {
      position: absolute;
      left: 18px;
    }
  }
  .cardNumber {
    width: 90%;
    height: 60px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -30px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 2px 20px 0px rgba(55, 60, 72, 0.25);
    display: flex;
    align-items: center;
    padding: 0 10px;
    input {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      border-radius: 5px;
      font-size: 18px;
    }
    .logoPng{
        width: 22px;
        height: 22px;
        display: inline-block;
        background: url("../../../../common/images/logo.png") no-repeat;
        background-size:100% 100%;
    }
  }
}

.typeContent {
  padding: 0 15px;
  background: #fff;
  .surplus {
    margin: 50px 0 20px 0;
    font-size: 12px;
    span:first-of-type {
      color: #4A4A4A;
    }
    span:last-of-type {
      color: #30CE84;
    }
  }


  .faceVal {
    .faceValTitle {
      margin: 20px 0 15px 0;
      color: #999999;
    }
    ul {
      .timeSelect {
        .saleW {
          background: #30CE84;
          color: #fff;
        }
        .realW {
          color: #999999;
          background: #fff;
        }
      }
      li {
        width: 30%;
        margin-right: 3.33%;
        display: inline-block;
        text-align: center;
        border: 1px solid #30CE84;
        margin-bottom: 15px;
        color: #30CE84;
        border-radius: 5px;
        .saleW {
          border-bottom: 1px solid #30CE84;
          div {
            p {
              padding: 4px 0;
              font-size: 15px;
            }
          }
          p{
            padding-bottom: 7px;
            font-size: 12px;
          }
        }
        .realW {
          font-size: 9px;
          line-height: 22px;
          background: #F4F4F4;
          border-radius: 0 0 5px 5px;
        }
      }
      li:nth-of-type(3n) {
        margin-right: 0;
      }
    }
  }

  .typeVal {
    .typeValTitle {
      margin: 5px 0 15px 0;
      color: #999999;
    }
    ul {
      .typeSelect {
        background: #30CE84;
        color: #fff;
      }
      li {
        width: 30%;
        margin-right: 3.33%;
        display: inline-block;
        text-align: center;
        border: 1px solid #30CE84;
        margin-bottom: 15px;
        height: 49px;
        font-size: 15px;
        line-height: 49px;
        color: #30CE84;
        border-radius: 5px;
      }
    }
  }

  .reminder {
    color: #999999;
    padding-bottom: 50px;
    .reminderTitle {
      color: #4A4A4A;
      margin: 16px 0 15px 0;
      line-height: 21px;
      font-size: 15px;
    }
  }
}


.changeC {
  height: 44px;
  color: #fff;
  position: fixed;
  width: 100%;
  line-height: 44px;
  bottom: 0;
  text-align: center;
  font-size: 15px;
  max-width: 378px;
}

.changeCliNo{
  background: #30CE84;
}
.changeCli{
  background: #98E7C2;
}


input::-webkit-input-placeholder {
  color: #999999;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999999;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999999;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #999999;
}
</style>

