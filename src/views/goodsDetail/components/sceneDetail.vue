<template>
    <div class="sceneDetail">
        <ul>
            <li v-show="detailShow==1">
                <textarea v-html="uujqts" contenteditable="true" ref="textJqts" disabled></textarea>
            </li>
            <li v-html="uubhjq" v-show="detailShow==2"></li>
            <li v-show="detailShow==3">
                <textarea v-html="uujtzn" contenteditable="true" ref="textJtzn" disabled></textarea>
            </li>
            <li v-show="detailShow==4">
                <textarea v-html="uutopics" contenteditable="true" ref="textTopics" disabled></textarea>
            </li>
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
        uujtzn: '',
        uutopics: '',
    }),
    watch: {
        sceneTabNameC: {
            handler(val) {
                if (val) {
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
                }
            }
        },
        'sceneInfoC': {
            handler(val) {
                let str = val.uubhjq;
                if (str) {
                    if ((str.indexOf("&lt;") != -1) || (str.indexOf("&gt;") != -1) || (str.indexOf("&nbsp;") != -1) || (str.indexOf("&#39;") != -1) || (str.indexOf("&quot;") != -1) || (str.indexOf("&quot;") != -1)) {
                        this.uubhjq = HtmlUtil.htmlDecode(val.uubhjq);
                    } else {
                        this.uubhjq = val.uubhjq;
                    }
                    this.uujqts = val.uujqts;
                    this.uujtzn = val.uujtzn;
                    this.uutopics = val.uutopics;
                }
            },
            immediate: true,
            deep: true
        },
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
textarea {
    width: 100%;
    border: none;
    background: #fff;
    resize: none;
    min-height: 550px;
    padding-top: 10px;
}
</style>
<style>
.sceneDetail li p {
    padding: 5px;
}
</style>