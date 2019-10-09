<template>
<div class="ccAddcard">
  <div v-show="!show.banks">
    <header><i class="cubeic-back back" @click="$router.back()"></i>添加信用卡</header>
    <ul class="addCard-info">
      <li>姓名<input type="text" name="cardUser" :placeholder="userinfo.realName" readonly="readonly"/></li>
      <li>信用卡卡号 <input type="text" name="cardNum"  placeholder="请输入您的信用卡卡号" v-model="cardNum" @blur.prevent="blurCard()"></li>
      <li v-if="!detailFlag">开户行 <input type="text" name="cardBank"  :placeholder="cardBankP" readonly="readonly"></li>
      <li v-if="detailFlag">开户行 <input type="text" name="cardBank"  :placeholder="cardBank" readonly="readonly" @click="show.banks=true"></li>
      <li v-if="detailFlag">开户支行 <input type="text" name="cardSubBank"  placeholder="请输入您的开户支行" v-model="cardSubBank"></li>
      <upload-img @front-file="imgFileEmit" v-if="detailFlag"></upload-img>
    </ul>
    <div class="addCardBnt" @click="addCardBnt()" :class="bntFlag?'addBntCan':'addBntNo'">提交</div>
  </div>
  <bank-list @bank-name="bankName" :show="show.banks" @hand-init='show.banks=false'  :cardBankC="cardBankP"></bank-list>
</div>
</template>
<script>
import { addcard,validCard } from 'api';
import { luhnCheck,isEmpty } from "util/common";
import axios  from 'axios';
import { mapGetters, mapActions } from 'vuex'
export default {
    data:()=>({
      show:{
        banks:false
      },
      cardNum:undefined,
      cardBankP:undefined,
      cardBankData:undefined,
      detailFlag:false,  //手动true
      cardBank:'请选择您的开户银行',
      cardSubBank:'',
      bankId:'',
      imgFile:undefined,
    }),
    computed:{
       ...mapGetters({
        userinfo: 'getUserinfo',
        getToken: 'getToken'
      }),
      bntFlag(){
        if(!this.detailFlag){
          if(!this.cardNum||!this.cardBankP){
            return false
          }else{
            return true
          }
        }else if(this.detailFlag){
          if(!this.cardNum||this.cardBank=="请选择您的开户银行"||!this.cardSubBank||!this.imgFile){
              return false
          }else{
            return true
          }
        }
      }
    },
    methods:{
      bankName(val){
        this.cardBank = val.name;
        this.bankId = val.id;
      },
      async validCard(val){
        let res = await validCard({token:this.getToken,card:this.cardNum});
        if(res.error_code == 0){
          this.cardBankP = res.message;
          this.cardBankData = res.data;
        }else if(res.error_code == 3){
          return this.$dialog({content:res.message},()=>{});
        }else if(res.error_code == 4){
          return this.$dialog({content:res.message+'，请稍后或者换卡再试！'},()=>{});
        }else{
          return this.$dialog({type:"confirm",content:'校验卡失败，请手工录入银行卡信息',cancelBtn:{text:'查看支持银行',href:'https://mp.weixin.qq.com/s/luF7xpzpLYaSw0CZPCNm3A'}},()=>{
            this.detailFlag = true;
          });
        }
      },
      blurCard(){
        if(isEmpty(this.cardNum) || !luhnCheck(this.cardNum)){
          return this.$toast("请输入有效的信用卡卡号!");
        }
        this.validCard()
      },
      imgFileEmit(val){
        this.imgFile = val;
      },
      addCardBnt(){
        if(isEmpty(this.cardNum) || !luhnCheck(this.cardNum)){
          return this.$toast("请输入有效的银行账号！");
        }
        if(this.detailFlag){
          if(!this.bankId || !this.cardBank){
            return this.$toast("请选择发卡行");
          }
          if(!this.cardSubBank){
            return this.$toast("请输入开户支行");
          }
          if(!this.imgFile){
            return this.$toast("请上传信用卡正面图片");
          }
        }
        if(this.detailFlag){
          this.addcard()
        }else{
          this.addvalidcard()
        }

      },
      addcard(){
        let formData = new FormData();
        formData.append('cardUser',this.userinfo.realName);
        formData.append('cardNum',this.cardNum);
        formData.append('cardBank',this.cardBank);
        formData.append('cardSubBank',this.cardSubBank);
        formData.append('token',this.getToken);
        formData.append('bankId',this.bankId);
        formData.append('file',this.imgFile);
        const instance = axios.create({
          headers:{'Content-Type': 'multipart/form-data;charset=utf-8'},
          withCredentials: process.env.NODE_ENV === 'production',
        })
        instance.post(process.env.VUE_APP_INFO_URl+'/user/addcard',formData).then(res=>{
          if(res.data.error_code==0){
            this.$dialog({content:'添加成功'},()=>{
              this.$router.push({path:'/creditCard/manage'})
            })
          }else{
            this.$dialog({content:`添加失败${res.data.message}`},()=>{})
          }
        }).catch(err=>{
          console.error(err);
        })
      },
      addvalidcard(){
         let formData = new FormData();
          formData.append('cardUser',this.userinfo.realName);
          formData.append('cardNum',this.cardNum);
          formData.append('cardSubBank',this.cardSubBank);
          formData.append('token',this.getToken);
          formData.append('cardBank',this.cardBankData);
          if(this.bankId){
            formData.append('bankId',this.bankId);
          }
          const instance = axios.create({
            headers:{'Content-Type': 'multipart/form-data;charset=utf-8'},
            withCredentials: process.env.NODE_ENV === 'production',
          })
          instance.post(process.env.VUE_APP_INFO_URl+'/user/addvalidcard',formData).then(res=>{
            if(res.data.error_code==0){
              this.$dialog({content:'添加成功'},()=>{
                this.$router.push({path:'/creditCard/manage'})
              })
            }else{
              this.$dialog({content:res.data.message},()=>{})
            }
          }).catch(err=>{
            console.error(err);
          })
      }
    },
    mounted(){
      if(!this.userinfo.idnum){
        return this.$dialog({type:'confirm',content:'请先实名认证！'},()=>{
          this.$router.push({path:'/realName?back=/creditCard/home'})
        })
      }
    },
    components: {
      bankList:() => import("./components/bankList"),
      uploadImg:() => import("./components/uploadImg"),
    },
  }
</script>
<style lang="scss" scoped>
.ccAddcard {
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
    .back {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 0.4rem;
    }
  }
}
.addCard-info{
  padding: 0 15px;
  li{
      display: flex;
      align-items: center;
      height: 70px;
      font-size: 15px;
      justify-content: space-between;
      border-bottom: 1px solid #DEDEDE;
    input{
      flex: 1;
      height: 100%;
      text-align: right;
    }
  }
}
.addCardBnt{
    width: 100%;
    color: #fff;
    line-height: 44px;
    text-align: center;
    position: fixed;
    bottom: 0;
    border: none;
    font-size: 15px;
}
.addBntCan{
  background: #30CE84;
}
.addBntNo{
  background: #8DE4BB;
}

</style>
<style>
@media screen and (min-width: 600px) {
  .addCardBnt{
    max-width: 384px; /*no*/
    overflow: hidden;
  }
}
.cube-dialog-content-def > p{
      word-break: break-all;
}
</style>

