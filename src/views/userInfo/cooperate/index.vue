<template>
  <div class="cooperate">
    <header><i class="cubeic-back back" @click="$router.back()"></i>商务合作</header>
    <div class="contact-wrap">
      <a href="tel:18976283803" class="external"><img src="../../../common/images/coopera/business_01.jpg"/></a>
      <a href="tel:18500233362" class="external"><img src="../../../common/images/coopera/business_02.jpg"/></a>
      <a href="tel:15814447049" class="external"><img src="../../../common/images/coopera/business_03.jpg"/></a>
      <a href="tel:13129977379" class="external"><img src="../../../common/images/coopera/business_04.jpg" /></a>
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
.cooperate{
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
  .contact-wrap{
    padding-top: 62px;
    a{
      width: 100%;
      margin-bottom: 13px;
      display: block;
      img{
        width: 92%;
        margin: 0 auto;
        box-shadow:2px 4px 5px 0px rgba(176, 178, 189, 0.75);
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
