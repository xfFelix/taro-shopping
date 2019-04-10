<template>
  <div class="main">
    <h1 class="border-bottom-1px"><i class="iconfont icon-My"></i>取票人信息</h1>
    <ul>
      <li class="item border-bottom-1px">
        <span class="label">姓名</span>
        <cube-input v-model="name" placeholder="请输入真实姓名" class="value"></cube-input>
      </li>
      <li class="item border-bottom-1px">
        <span class="label">手机号</span>
        <cube-input v-model="mobile" placeholder="请输入手机号码" class="value"></cube-input>
      </li>
      <li class="item border-bottom-1px">
        <span class="label">证件类型</span>
        <cube-select v-model="IDCardType" :options="options" placeholder="请选择证件类型" class="value"></cube-select>
      </li>
      <li class="item border-bottom-1px">
        <span class="label">证件号码</span>
        <cube-input v-model="IDCardNumber" placeholder="请输入证件号码" class="value"></cube-input>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    mobile: undefined,
    IDCardType: '身份证',
    IDCardNumber: '',
    options: ['身份证']
  })
}
</script>

<style lang="scss" scoped>
.main{
  background-color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 10px;
  h1{
    font-size: 16px;
    font-weight: 700;
    padding: 5px 0;
    .icon-My{
      margin-right: 5px;
      &::before{
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  ul{
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 0;
      .label{
        flex: 0 0 70px;
      }
      .value{
        flex: 1;
        &::after{
          border: none;
        }
      }
    }
  }
}
</style>

