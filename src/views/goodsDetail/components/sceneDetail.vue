<template>
    <div class="sceneDetail">
        <ul>
            <li v-html="sceneInfoC.uubhjq" v-show="detailShow==1"></li>
            <li v-html="sceneInfoC.uujqts" v-show="detailShow==2"></li>
            <li v-html="sceneInfoC.uujtz" v-show="detailShow==3"></li>
            <li v-html="sceneInfoC.uutopics" v-show="detailShow==4"></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        sceneInfoC: Object,
        sceneTabNameC: String
    },
    data: () => ({
        detailShow: 1
    }),
    watch: {
        sceneTabNameC: {
            handler(val) {
                switch (val) {
                    case "景区须知":
                        this.detailShow = 1;
                        break;
                    case "景区简介":
                        this.detailShow = 2;
                        break;
                    case "交通指南":
                        this.detailShow = 3;
                        break;
                    case "旅游主题":
                        this.detailShow = 4;
                        break;
                    default:
                        this.detailShow = 1;
                        break;
                }
            },
            immediate: true,
            deep:true
        }
    },
    methods: {

    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.sceneDetail {
    background: #fff;
}
</style>
