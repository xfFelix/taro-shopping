<template>
  <div class="select-wrapper">
    <Header>{{$route.meta.title}}</Header>
    <div class="content">
      <h1>人脸识别认证</h1>
      <div class="info">
        <span class="name">张三</span>
        <span class="idcard">439193193123192391</span>
        <span class="edit">编辑</span>
      </div>
      <h2>选择人脸识别方式</h2>
      <div class="card">
        <div class="title">
          <img src="~common/images/alibaba.png" alt=" ">
          <span>支付宝刷脸认证</span>
        </div>
        <div class="desc">需安装支付宝并登陆 “XXX” 的账号</div>
      </div>
      <div class="card">
        <div class="title">
          <img src="~common/images/wechat.png" alt=" ">
          <span>微信刷脸认证</span>
        </div>
        <div class="desc">需使用前置摄像头录制读数视频</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
.select-wrapper{
  .content{
    padding: 0 15px;
    font-family:PingFang SC;
    h1{
      margin: 26px 0;
      font-size:18px;
      font-weight:bold;
      color:rgba(51,51,51,1);
    }
    .info{
      height: 54px;
      display: flex;
      align-items: center;
      font-size:15px;
      font-weight:bold;
      color:rgba(102,102,102,1);
      border-top: 1px solid rgba(246,246,246,1);
      border-bottom: 1px solid rgba(246,246,246,1);
      position: relative;
      .name{
        flex: 0 0 54px;
      }
      .edit{
        position: absolute;
        right: 3px;
        color:rgba(98,218,161,1);
        cursor: pointer;
      }
    }
    h2{
      margin-top: 34px;
      font-size:15px;
      font-weight:bold;
      color:rgba(51,51,51,1);
      margin-left: 15px;
      &::before{
        content: '';
        position: absolute;
        left: 10px;
        display: block;
        width:5px;
        height:21px;
        background:rgba(48,206,132,1);
      }
    }
    .card{
      margin-top: 15px;
      height:100px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 11px 1px rgba(175,175,175,0.25);
      border-radius:5px;
      padding: 28px 0 0 23px;
      box-sizing: border-box;
      .title{
        display: flex;
        align-items: center;
        img{
          display: block;
          width: 21px;
          height: 21px;
          border: none;
          outline: none;
        }
        span{
          margin-left: 10px;
          font-size:15px;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
      }
      .desc{
        margin-top: 10px;
        font-size:13px;
        font-weight:bold;
        color:rgba(153,153,153,1);
      }
    }
  }
}
</style>
