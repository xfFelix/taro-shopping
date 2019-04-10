<template>
    <div class="h-goodsList">
        <ul>
            <li v-for="(item,index) in ticketList" :key="index">
                <div class="h-goodsimgLiW">
                    <img src="" alt="" />
                </div>
                <div class="h-goodsInfoLiW">
                    <p class="h-goodsInfoLi">{{item.name}}</p>
                    <p class="h-goodsMoneyLiW">
                        <span class="h-goodsMoneyLi">{{item.money}}</span>
                        <span>起</span>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import {getScenicList } from 'api'
export default {
    data: () => ({
        ticketList: [
            {
                name: "南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
                money: '1944'
            },
            {
                name: "南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
                money: '1944'
            },
            {
                name: "南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
                money: '1944'
            },
            {
                name: "南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
                money: '1944'
            },
            {
                name: "南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
                money: '1944'
            },
            {
                name: "南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
                money: '1944'
            },
            {
                name: "南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
                money: '1944'
            },
            {
                name: "南湾猴岛【2人起订】猴岛一价全包(猴岛公园+呆呆岛+海鲜火射",
                money: '1944'
            }
        ]
    }),
    methods: {
        async getScenicList() {
            let data = await getScenicList({ n: this.offset, m: this.pageSize })
        },
    },
    mounted(){
        this.getScenicList()
    }
}
</script>
<style lang="scss" scoped>
.h-goodsList {
    padding: 0 8px 10px 8px;
    ul {
        li {
            display: flex;
            background: #fff;
            height: 79px;
            padding: 10px 0;
            box-shadow: 2px 4px 10px 0px #e1ebff;
            margin: 8px 0;
            .h-goodsimgLiW {
                width: 120px;
                height: 80px;
                margin: 0 7px 0 9px;
                flex-shrink: 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .h-goodsInfoLiW {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin: 0;
                text-align: left;
                .h-goodsInfoLi {
                    margin: 0;
                    line-height: 17px;
                    color: #000;
                }
                .h-goodsMoneyLiW {
                    font-size: 10px;
                    color: #999999;
                    .h-goodsMoneyLi {
                        font-size: 15px;
                        color: #30ce84;
                    }
                }
            }
        }
    }
}
</style>
