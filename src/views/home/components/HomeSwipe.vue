<template>
    <div class="swiperBg">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(slide, index) in bannerList" :key="index">
                <img :src="slide.img" alt="" style="width:100%;" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { homeBanner } from 'api';
export default {
    data: () => ({
        swiperOption: {
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
            }
        },
        bannerList: []
    }),
    methods: {
        async homeBanner() {
            let data = await homeBanner({ "catId": 207, "startNum": 0, "num": 10 });
            if (data.resultCode != 0) {
                return this.$toast(data.message);
            }
            this.bannerList = data.data;
            console.log(this.bannerList)
        },
    },
    mounted() {
        this.homeBanner()
    },
    components: {
        swiper,
        swiperSlide,
    }
}
</script>
<style lang="scss" scoped>
.swiperBg {
    height: 218px;
    .swiper-pagination {
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        width: 12%;
        right: 15px !important;
        left: auto;
        bottom: 13px;
        border-radius: 10px;
        padding: 1px 0;
    }
}
</style>