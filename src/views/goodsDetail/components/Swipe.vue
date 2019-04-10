<template>
    <div class="swiperBg">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <img src="../../../common/images/bannerD.jpg" alt="" style="width:100%;" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
    data: () => ({
        swiperOption: {
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
            }
        },
        swiperSlides: [1, 2, 3, 4, 5],
    }),
    components: {
        swiper,
        swiperSlide,
    }
}
</script>
<style lang="scss" scoped>
.swiperBg {
    .swiper-pagination {
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        width: 14%;
        right: 7px !important;
        left: auto;
        bottom: 28px;
        border-radius: 15px;
        padding: 5px 0;
        font-size: 15px;
    }
}
</style>