<template>
    <div class="swiperBg">
        <swiper :options="swiperOption" style="height:100%">
            <swiper-slide >
                <img :src="sceneInfoC.uuimgpath" alt="" style="width:100%;" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
    props: {
        sceneInfoC: Object
    },
    data: () => ({
        swiperOption: {
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction'
            },
            loop: true,
        },
    }),
    components: {
        swiper,
        swiperSlide,
    },
    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>
.swiperBg {
    width: 100%;
    height: 250px;
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