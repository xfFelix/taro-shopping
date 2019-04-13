<template>
    <div class="sceneDetail">
        <ul>
            <li v-html="uujqts" v-show="detailShow==1"></li>
            <li v-html="uubhjq" v-show="detailShow==2"></li>
            <li v-html="uujtzn" v-show="detailShow==3"></li>
            <li v-html="uutopics" v-show="detailShow==4"></li>
        </ul>
    </div>
</template>

<script>
import { HtmlUtil } from 'util/htmlUtil'
export default {
    props: {
        sceneInfoC: Object,
        sceneTabNameC: String
    },
    data: () => ({
        detailShow: 1,
        uubhjq: '',
        uujqts: '',
        uujtz: '',
        uutopics: ''
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
            deep: true
        },
        sceneInfoC: {
            handler(val) {
                console.log("景区")
                console.log(val)
                this.uubhjq = HtmlUtil.htmlDecode(val.uubhjq);
                this.uujqts = val.uujqts;
                this.uujtzn = val.uujtzn;
                this.uutopics = val.uutopics;
            },
            immediate: true,
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
