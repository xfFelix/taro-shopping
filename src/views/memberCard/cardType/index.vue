<template>
    <div class="cardType">
        <div class="typeHeader">
            <div class="headerTitle">
                <i class="cubeic-back" @click="goHome"></i>
                会员卡券
            </div>
            <div class="cardNumber">
                <input type="number" placeholder="请输入账号" />
            </div>
        </div>

        <div class="typeContent">
            <div class="surplus">
                <span>剩余可用余额：</span>
                <span>111111.00 </span>
            </div>
            <div class="faceVal">
                <ul>
                    <li>
                        <div>
                            <p>周卡</p>
                            <p><span>售价</span><span>8.00</span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
.cardType {
    background: #fff;
}

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
        align-items: center; // 
        font-size: 18px;
        .cubeic-back {
            position: absolute;
            left: 18px;
        }
    }
    .cardNumber {
        width: 90%;
        height: 1.6rem;
        position: absolute;
        right: 0;
        left: 0;
        bottom: -30px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 2px 20px 0px rgba(55, 60, 72, 0.25);
        input {
            width: 100%;
            height: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            border-radius: 5px;
            font-size: 15px;
        }
    }
}

.typeContent {
    margin: 0 15px;
    .surplus {
        margin-top: 50px;
        font-size: 12px;
        span:first-of-type {
            color: #4A4A4A;
        }
        span:last-of-type {
            color: #30CE84;
        }
    }
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
