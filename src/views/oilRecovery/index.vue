<template>
    <div class="oilRecovery">
        <Header>加油卡回收</Header>

        <div class="whoSelectW">
            <p :class="selfFlag?'whoSelectLogo':''" @click="self()">
                <span>本人</span>
                <span></span>
            </p>
            <span class="divide">|</span>
            <p :class="selfFlag?'':'whoSelectLogo'">
                <span @click="noSelf()">非本人</span>
                <span></span>
            </p>
        </div>

        <div class="recoveryInfoW">
            <p class="rMoneyTtiel">回收价</p>
            <p class="rMoney">98.90</p>
            <ul>
                <li>
                    <div class="reFirst">卡号</div>
                    <div class="reLast">1874657876263621</div>
                </li>
                <li>
                    <div class="reFirst">卡密</div>
                    <div class="reLast">3435436</div>
                </li>
                <li>
                    <div class="reFirst">姓名</div>
                    <div class="reLast" v-if="selfFlag">万宇龙</div>
                    <input type="text" placeholder="填写收款人姓名" v-if="!selfFlag">
                </li>
                <li>
                    <div class="reFirst">身份证号码</div>
                    <div class="reLast" v-if="selfFlag">654121199411180011</div>
                    <input type="text" placeholder="填写收款人身份证号码" v-if="!selfFlag">
                </li>
                <li>
                    <div class="reFirst">开户行</div>
                    <div @click="showPicker">
                        <input type="text" placeholder="请选择开户行" readonly="readonly">
                        <span class="iconfont bankSelect">&#xe61e;</span>
                    </div>
                </li>
                <li>
                    <div class="reFirst">银行卡号</div>
                    <div><input type="" name="" value="" placeholder="请填写收款银行卡号码"></div>
                </li>
            </ul>
        </div>
        <cube-checkbox v-model="checked" position="left" shape="square" :hollow-style="true">
            <div class="agreement">
                <span>我已阅读并同意</span>
                <span>《加油卡回收协议》</span>
            </div>
        </cube-checkbox>

        <div class="commit">提交申请表</div>
    </div>
</template>
<script>
const column1 = [{ text: '剧毒', value: '剧毒' }, { text: '蚂蚁', value: '蚂蚁' },
{ text: '幽鬼', value: '幽鬼' }]
export default {
    data: () => ({
        checked: false,
        selfFlag: 1
    }),
    components: {
        'Header': () => import('components/Header'),
    },
    methods: {
        showPicker() {
            if (!this.picker) {
                this.picker = this.$createPicker({
                    title: '选择开户行',
                    data: [column1],
                    onSelect: this.selectHandle,
                    onCancel: this.cancelHandle
                })
            }
            this.picker.show()
        },
        selectHandle(selectedVal, selectedIndex, selectedText) {
            this.$createDialog({
                type: 'warn',
                content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
                icon: 'cubeic-alert'
            }).show()
        },
        cancelHandle() {
            this.$createToast({
                type: 'correct',
                txt: 'Picker canceled',
                time: 1000
            }).show()
        },
        self() {
            this.selfFlag = 1;
        },
        noSelf() {
            this.selfFlag = 0;
        }
    }
}
</script>
<style lang="scss" scoped>
.whoSelectW {
    display: flex;
    justify-content: space-around;
    height: 30px;
    align-items: center;
    background: #fff;
    P {
        width: 90px;
        text-align: center;
        color: #000000;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
        span:first-of-type {
            margin-bottom: 5px;
        }
        span:last-of-type {
            width: 100%;
            height: 2px;
            background: #fff;
            display: block;
        }
    }
    .whoSelectLogo {
        color: #30CE84;
        span:last-of-type {
            background: #30CE84;
        }
    }
    .divide {
        color: #b1b1b1;
        font-size: 18px;
    }
}

.recoveryInfoW {
    text-align: center;
    padding: 0 18px;
    .rMoneyTtiel {
        font-size: 12px;
        color: #8B8B8B;
        margin: 35px 0 13px 0;
    }
    .rMoney {
        font-size: 30px;
        color: #30CE84;
        font-weight: bold;
        margin-bottom: 17px;
    }
    ul {
        li {
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #DEDEDE;
            padding: 0 12px;
            height: 53px;
            padding-top: 18px;
            box-sizing: border-box;
            .reFirst {
                color: #000;
            }
            .reLast {
                color: #8B8B8B;
            }
            .bankSelect {
                transform: rotate(180deg);
                display: inline-block;
            }
        }
        input {
            background: #f3f4f6;
            text-align: right;
        }
    }
}

.cube-checkbox {
    margin-top: 4px;
}

.agreement {
    span:first-of-type {
        color: #131212;
    }
    span:last-of-type {
        color: #30CE84;
    }
}

.commit {
    height: 50px;
    background: #30CE84;
    text-align: center;
    color: #fff;
    font-size: 0.48rem;
    line-height: 1.333333rem;
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
