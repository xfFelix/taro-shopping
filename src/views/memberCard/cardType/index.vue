<template>
    <div class="cardType">
        <!-- 选择卡券 -->
        <card-select @show-info="showInfo"></card-select>
        <!-- 兑换信息 -->
        <charge-info :show="show.info" @go-back="initShow" @show-sms="showSms"></charge-info>
        <!-- 短信 -->
        <sms-code :show="show.sms" @go-back="initShow"></sms-code>
        <!-- 遮罩层 -->
        <transition name="fade">
            <bg-mask v-model="show.mask"></bg-mask>
        </transition>

    </div>
</template>
<script>
export default {
    data: () => ({
        show: {
            mask: false,
            info: false,
            sms: false
        }
    }),
    watch: {
        'show.mask': {
            handler(val) {
                if (!val) {
                    this.initShow()
                }
            }
        }
    },
    methods: {
        initShow() {
            this.show = { mask: false, info: false, sms: false };
        },
        showInfo() {
            this.show = { mask: true, info: true, sms: false };
        },
        showSms() {
            this.show = { mask: true, info: false, sms: true };
        }
    },
    components: {
        ChargeInfo: () => import('./components/ChargeInfo'),
        BgMask: () => import('components/BgMask'),
        SmsCode: () => import('./components/SmsCode'),
        CardSelect: () => import('./components/CardSelect'),
    },
}
</script>

<style lang="scss" scoped>
.cardType {
    background: #fff;
    width: 100%;
    height: 100%;
}
</style>
