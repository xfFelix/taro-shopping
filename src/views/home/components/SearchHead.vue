<template>
    <div>
        <div class="h-searchW" v-if="!headShowC">
            <div class="iconfont background-op h-searchBack" @click="$router.back()">&#xe61e;</div>
            <div class="h-searchInpW background-op">
                <span class="h-searchLogo"></span>
                <span class="h-searchInp"><input type="text" v-model="inpConent" /></span>
                <span class="iconfont h-searchClose" @click="inpConent=''">&#xe80e;</span>
            </div>
            <div class="h-searchCli background-op" @click="searchKey()">搜索</div>
        </div>

        <div class="h-searchWFixed" v-if="headShowC">
            <div class="iconfont h-searchBack" @click="$router.back()">&#xe61e;</div>
            <div class="h-searchInpW background-op">
                <span class="h-searchLogo"></span>
                <span class="h-searchInp"><input type="text" v-model="inpConent" /></span>
                <span class="iconfont h-searchClose" @click="inpConent=''">&#xe80e;</span>
            </div>
            <div class="h-searchCli" @click="searchKey()">搜索</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        headShowC: Boolean
    },
    data: () => ({
        inpConent: ''
    }),
    methods: {
        searchKey(){
            this.$emit('inputC',this.inpConent)
        }
    }
}
</script>
<style lang="scss" scoped>
.background-op{
     background: rgba(0,0,0,0.4);    
}
.h-searchW,
.h-searchWFixed {
    position: fixed;
    top: 0;
    display: flex;
    padding: 25px 6px 8px 6px;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
    .h-searchBack {
        width: 30px;
        height: 30px;
    }
    .h-searchBack {
        text-align: center;
        line-height: 30px;
        border-radius: 40px;
        color: #fff;
    }
    .h-searchInpW {
        width: 283px;
        height: 30px;
        border-radius: 33px;
        margin: 0 9px;
        display: flex;
        align-items: center;
        width: 78%;
        background: rgba(0,0,0,0.4);
        .h-searchLogo {
            width: 19px;
            height: 19px;
            background-size: 19px 19px;
            display: inline-block;
            background-image: url('../../../common/images/logo.png');
            margin: 0 11px 0 13px;
        }
        .h-searchClose {
            width: 22px;
            height: 22px;
            font-size: 17px;
            line-height: 22px;
            text-align: center;
            border-radius: 40px;
            color: #fff;
            background: #000;
        }
        .h-searchInp {
            width: 72%;
            margin-right: 9px;
            background: transparent;
            height: 100%;
            input {
                width: 100%;
                background: transparent;
                color: #fff;
                height: 100%;
            }
        }
    }
    .h-searchCli {
        width: 30px;
        height: 30px;
        font-size: 12px;
        color: #ffffff;
        border-radius: 40px;
        line-height: 30px;
    }
}

.h-searchWFixed {
    background: #fff;
    z-index: 2;
    .h-searchBack,
    .h-searchCli {
        color: #000;
    }
    .h-searchInpW {
        background: #fff;
        border: 1px solid #dfdfdf;
        .h-searchClose {
            background: #efefef;
            color: #000;
        }
        .h-searchInp {
            input {
                color: #000;
            }
        }
    }
}
</style>
