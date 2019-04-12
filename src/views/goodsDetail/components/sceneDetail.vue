<template>
    <div class="sceneDetail">
        <ul>
            <li v-html="uubhjq" v-show="detailShow==1"></li>
            <li v-html="uujqts" v-show="detailShow==2"></li>
            <li v-html="uujtz" v-show="detailShow==3"></li>
            <li v-html="uutopics" v-show="detailShow==4"></li>
        </ul>
    </div>
</template>

<script>
import {HtmlUtil} from 'util/htmlUtil'
export default {
    props: {
        sceneInfoC: Object,
        sceneTabNameC: String
    },
    data: () => ({
        detailShow: 1,
        uubhjq:'',
        uujqts:'',
        uujtz:'',
        uutopics:''
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
        this.uubhjq = HtmlUtil.htmlDecode(this.sceneInfoC.uubhjq);
        this.uujqts = HtmlUtil.htmlDecode(this.sceneInfoC.uubhjq);
        this.uujtz = HtmlUtil.htmlDecode(this.sceneInfoC.uubhjq);
        this.uutopics = HtmlUtil.htmlDecode(this.sceneInfoC.uubhjq);
    }
}
</script>

<style lang="scss" scoped>
.sceneDetail {
    background: #fff;
}
</style>
