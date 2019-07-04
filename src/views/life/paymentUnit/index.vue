<template>
  <div class="payment-unit">
    <Header class="navbar" :show-more="true">选择缴费单位</Header>
    <ul class="content">
      <li>
        缴费单位
        <span class="address">深圳市<i class="cubeic-arrow"></i></span>
      </li>
      <li>
        深圳市电费
      </li>
      <li>
        国网深圳市电力公司电费
      </li>
      <li>
        国网深圳市电力公司电费
      </li>
    </ul>
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

<style scoped lang='scss'>
.payment-unit{
  .navbar{
    background: #000;
    color: #fff;
  }
  .content{
    background: #fff;
    li{
      color: #4A4A4A;
      font-size: 14px;
      font-weight: bold;
      padding: 20px 0;
      margin: 0 15px;
      border-bottom: 1px solid #dedede;
      &:last-of-type{
        border-bottom: 0;
      }
      .address{
        float: right;
        i{
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
