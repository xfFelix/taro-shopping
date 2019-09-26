<template>
  <div class="contact">
    <header><i class="cubeic-back back" @click="$router.back()"></i>联系我们</header>
    <div class="contact-wrap">
      <div class="img-wrap">
        <img src="../../../common/images/contact.png"/>
      </div>
      <div class="contact_list">
        <ul>
          <li>
            <a href="tel:089831305180" class="item-step" >
              <div class="item-title">联系电话</div>
              <div class="item-after">0898-3130-5180<span class="cubeic-back arrow"></span></div>
            </a>
          </li>
          <li>
            <a href="#" class="item-step" @click.stop="handleCopy('COCOGC2018',$event)">
              <div class="item-title">微信号</div>
              <div class="item-after">COCOGC2018 <span class="cubeic-back arrow"></span></div>
            </a>
          </li>
          <li>
            <a href="#" class="item-step" @click.stop="handleCopy('403292023',$event)">
              <div class="item-title">QQ号</div>
              <div class="item-after">403292023 <span class="cubeic-back arrow"></span></div>
            </a>
          </li>
        </ul>
      </div>

  </div>
  </div>
</template>

<script>
import clip from 'util/clipboard'
export default {
  data:()=>({

  }),
  methods:{
    handleCopy(text, event) {
      clip(text, event)
    },
  }
}
</script>

<style lang="scss" scoped>
.contact_list {
  margin-top: 15px;
  padding: 0 19px;
  background: #fff;
  ul{
    li{
      border-bottom:1px solid #ededed;
      line-height: 62px;
      font-size: 14px;
      .item-step {
        padding-right: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item-after{
          color: #999;
        }
        .arrow{
          display: inline-block;
          transform: rotate(180deg);
          color: #aaa;
          margin-left: 10px;
        }
      }
      &:last-of-type{
        border:none;
      }
    }
  }
}
.contact{
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
.contact-wrap{
  padding-top: 52px;
  .img-wrap{
    text-align: center;
    width: 92%;
        margin: 0 auto;
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
