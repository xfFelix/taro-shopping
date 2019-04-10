<template>
    <div class="swiperBg">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <img src="../../../common/images/banner.jpg" alt="" style="width:100%;" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
    methods: {

    },
    mounted() {

    },
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
        width: 12%;
        right: 15px !important;
        left: auto;
        bottom: 13px;
        border-radius: 10px;
        padding: 1px 0;
    }
}
</style>