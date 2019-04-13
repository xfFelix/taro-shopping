<template>
    <div class="changeSuccessW">
        <div class="changeSuccess">
            <p class="cs-bgImg">
                <img src="~common/images/changeSuccess.jpg" alt="" />
            </p>
            <p class="cs-info">兑换成功</p>
            <p class="cs-money">{{price|toPrice}}</p>
            <router-link :to="{ path: '/order'}" class="cs-bntGoDe" replace>订单详情</router-link>
            <router-link to="/" class="cs-bntGoIndex" replace>返回首页</router-link>
            <p class="cs-jumpIndex">{{this.numDown}}秒后自动进入订单列表页</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
      price: String | Number // 订单价格
    },
    data() {
        return {
            numDown:5,
            countDown:null
        };
    },
    mounted() {
        this.countDown =  setInterval(()=>{
            this.numDown = this.numDown-1
            if(this.numDown<2){
                this.$router.replace({ path: '/order'});
                clearInterval(this.countDown);
            }
        },1000)
    },
    beforeDestroy() {
        if(this.countDown) {
            clearInterval(this.countDown);
        }
    }
}
</script>
<style lang="scss" scoped>
.changeSuccessW {
    background: #fff;
    width: 100%;
    height: 100%;
    top: 0;
    position: fixed;
    z-index: 100;
    .changeSuccess {
        color: #333333;
        .cs-bgImg {
            width: 100px;
            height: 100px;
            text-align: center;
            margin: 50px auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .cs-info {
            font-size: 18px;
            text-align: center;
        }
        .cs-money {
            font-size: 0.6rem;
            margin: 0.41rem 0 0.64rem 0;
            text-align: center;
        }
        .cs-bntGoDe,
        .cs-bntGoIndex {
            height: 45px;
            border-radius: 44px;
            line-height: 45px;
            text-align: center;
            margin: 0.3rem auto;
            width: 90%;
            display: block;
        }
        .cs-bntGoDe {
            background-color: #36d289;
            box-shadow: 8px 13px 10px 0px rgba(135, 248, 199, 0.2);
            color: #fff;
        }
        .cs-bntGoIndex {
            box-shadow: 8px 13px 10px 0px rgba(135, 248, 199, 0.2);
            border: solid 1px #31ce84;
            color: #31ce84;
        }
        .cs-jumpIndex {
            text-align: center;
        }
    }
}
</style>
