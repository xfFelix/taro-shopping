<template>
  <div class="fail">
    <Header class="navbar" :show-more="true">如何查户号</Header>
    <div class="content">
      <h1>如何查询电费户号？</h1>
      <p>户号是什么？户号是客户编号的简称，是每个用电客户独有的用电档案编号，也是用户办理用电业务的凭证。一般为10位数。</p>
      <p>方法一：在电力公司提供的电费发票上查询。</p>
      <p>方法二：在银行等代售电网点提供的发票上查询。</p>
      <p>方法三：在您开户时给您的居民用户用电登记表或购电证中查询。</p>
      <p>方法四：通过在电力机构预留的身份证号、地址、姓名等信息，拨打<i>95598</i>进行人工客服查询对应的户号。</p>
      <p>方法五：查看家中电表编号（电表条码），拨打<i>95598</i>进行人工客服查询对应的户号。</p>
      <p>注：以上方式均仅供参考使用，具体按照当地电力公司要求方式查询。</p>
    </div>
  </div>
</template>

<script>
import Header from 'components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
.fail{
  .navbar{
    background: #000;
    color: #fff;
  }
  .content{
    padding: 0 15px;
    h1{
      font-size: 16px;
      font-weight: bold;
      margin: 20px 0;
    }
    p{
      margin: 15px 0;
      font-size: 14px;
      &:last-of-type{
        color: red;
      }
      i{
        color: red;
      }
    }
  }
}
</style>
