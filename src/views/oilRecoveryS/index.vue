<template>
    <div class="oilChanges">
        <div class="changeIconW">
            <span class="changeIcon iconfont">&#xe631;</span>
        </div>
        <p class="changeWord">提交成功</p>
        <ul class="changeInfo">
            <li>
                <span>商品名</span>
                <span>100加油卡直充（中石油）</span>
            </li>
            <li>
                <span>卡号</span>
                <span>1234567890123456</span>
            </li>
            <li>
                <span>卡密</span>
                <span>1234567890123456</span>
            </li>
            <li>
                <span>回收价</span>
                <span>101.00</span>
            </li>
            <li>
                <span>收款人</span>
                <span>101.00</span>
            </li>
            <li>
                <span>开户行</span>
                <span>101.00</span>
            </li>
            <li>
                <span>银行卡号</span>
                <span>101.00</span>
            </li>
        </ul>
         <router-link :to="{path:'/oilRecovery'}" class="changeConfim">完成</router-link> 
    </div>
</template>
<script>
export default {
    data: () => ({
    })
}
</script>
<style lang="scss" scoped>
.oilChanges {
    background: #fff;
    height: 100%;
    width: 100%;
    text-align: center;
    .changeIconW {
        .changeIcon {
            width: 84px;
            height: 84px;
            color: #fff;
            background: #30CE84;
            border-radius: 50%;
            text-align: center;
            line-height: 84px;
            font-size: 48px;
            margin: 63px auto 20px auto;
            display: inline-block;
        }
    }
    .changeWord {
        font-size: 18px;
        color: #000000;
        padding: 10px 0 20px 0;
        border-bottom: 1px solid #DEDEDE;
         margin: 0 17px;
    }
    .changeInfo {
        padding: 20px 0;
        li {
            display: flex;
            justify-content: space-between;
            margin: 0 35px;
            font-size: 13px;
            line-height: 45px;
            span:first-of-type {
                color: #8B8B8B;
            }
            span:last-of-type {
                color: #000000;
            }
        }
    }

    .changeConfim {
        background: #30CE84;
        color: #fff;
        display: inline-block;
        border-radius: 40px;
        line-height: 40px;
        font-size: 18px;
        width: 340px;
        margin: 0 auto;
    }

}
</style>
