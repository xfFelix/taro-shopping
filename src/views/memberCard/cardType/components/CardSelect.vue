<template>
    <div>
        <div class="typeHeader">
            <div class="headerTitle">
                <i class="cubeic-back" @click="$router.back()"></i>
                {{$route.query.title}}
            </div>
            <div class="cardNumber">
                <input type="number" placeholder="请输入账号" v-model="infoContent.cardNumber" />
            </div>
        </div>

        <div class="typeContent">
            <div class="surplus">
                <span>剩余可用余额：</span>
                <!-- <span>{{userinfo.score | toPrice}} </span>  -->
            </div>
            <div class="typeVal">
                <p class="typeValTitle">类型：</p>
                <ul>
                    <li v-if="cardList.ordinary && cardList.ordinary.length>0" @click="typeCli('ordinary')" :class="typeFlag=='ordinary'?'typeSelect':''">
                        <div>黄金会员</div>
                    </li>
                    <li v-if="cardList.super && cardList.super.length>0" @click="typeCli('super')" :class="typeFlag=='super'?'typeSelect':''">
                        <div>钻石会员</div>
                    </li>
                </ul>
            </div>

            <div class="faceVal">
                <p class="faceValTitle">面值：</p>
                <ul>
                    <li v-for="(item,index) in timeCard" :key="index" @click="timeCli(index,item.productId)" :class="index==timeFlag?'timeSelect':''">
                        <div class="saleW">
                            <div>
                                <p v-if="item.timeType==='1'">周卡</p>
                                <p v-else-if="item.timeType==='2'">月卡</p>
                                <p v-else-if="item.timeType==='3'">季卡</p>
                                <p v-else-if="item.timeType==='4'">半年卡</p>
                                <p v-else>年卡</p>
                            </div>

                            <p>
                                <span>售价：</span>
                                <span>{{item.sellingPrice|toPrice}}</span>
                            </p>
                        </div>
                        <div class="realW">
                            <span>刊例价:</span>
                            <span>{{item.marketPrice|toPrice}}</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="reminder">
                <p class="reminderTitle">温馨提示：</p>
                <div>
                    我不知道我这里该写什么，所以就随便写一个就好啦，嗯 就不知道了，其他的以后再说
                </div>
            </div>
        </div>

        <div class="changeC" @click="changeC">点击兑换</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getVipList } from 'api'
export default {
    data: () => ({
        timeCard: [],
        cardList: {},
        typeFlag:'ordinary',
        timeFlag:0,
        infoContent:{
            productId:undefined,
            cardNumber: undefined,
        }
    }),
    computed: {
        ...mapGetters({
            userinfo: 'getUserinfo'
        })
    },
    methods: {
        initData(){
             this.timeFlag = 0;
             this.infoContent.productId = this.timeCard[0].productId;
        },
        timeCli(index,productId) {
            this.timeFlag = index;
            this.infoContent.productId = productId;
        },
        typeCli(cardType) {
            if (cardType === "ordinary") {
                this.typeFlag = 'ordinary'
                this.timeCard = this.cardList.ordinary;
            } else {
                this.typeFlag = 'super'
                this.timeCard = this.cardList.super;
            }
            this.initData()
        },
        changeC() {
            if (!this.infoContent.cardNumber) {
                return this.$toast("账号不能为空")
            }
            this.$emit('info-content',this.infoContent)
        },
        //卡面值及类型
        async getVipList() {
            let data = await getVipList({ productType: this.$route.query.id });
            if (data.code != 1) return this.$toast(data.message);
            this.cardList = data.data;
            this.cardList.ordinary?this.timeCard = this.cardList.ordinary:this.timeCard = this.cardList.super;
            this.initData();
        },
    },
    mounted() {
        this.getVipList()
    }
}
</script>

<style lang="scss" scoped>
.typeHeader {
    background: #373C48;
    color: #fff;
    height: 83px;
    position: relative;
    .headerTitle {
        padding: 10px 0 0 0;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        .cubeic-back {
            position: absolute;
            left: 18px;
        }
    }
    .cardNumber {
        width: 90%;
        height: 1.6rem;
        position: absolute;
        right: 0;
        left: 0;
        bottom: -30px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 2px 20px 0px rgba(55, 60, 72, 0.25);
        input {
            width: 100%;
            height: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            border-radius: 5px;
            font-size: 15px;
        }
    }
}

.typeContent {
    padding: 0 15px;
    background: #fff;
    .surplus {
        margin-top: 50px;
        font-size: 12px;
        span:first-of-type {
            color: #4A4A4A;
        }
        span:last-of-type {
            color: #30CE84;
        }
    }


    .faceVal {
        .faceValTitle {
            margin: 20px 0 15px 0;
            color: #999999;
        }
        ul {
            .timeSelect {
                .saleW {
                    background: #30CE84;
                    color: #fff;
                }
                .realW {
                    color: #999999;
                }
            }
            li {
                width: 30%;
                margin-right: 3.33%;
                display: inline-block;
                text-align: center;
                border: 1px solid #30CE84;
                margin-bottom: 15px;
                color: #30CE84;

                .saleW {
                    border-bottom: 1px solid #30CE84;
                    p:first-of-type {
                        padding: 4px 0;
                        font-size: 15px;
                    }
                    p:last-of-type {
                        padding-bottom: 7px;
                        font-size: 12px;
                    }
                }
                .realW {
                    font-size: 9px;
                    line-height: 20px;
                }
            }
            li:nth-of-type(3n) {
                margin-right: 0;
            }
        }
    }

    .typeVal {
        .typeValTitle {
            margin: 5px 0 15px 0;
            color: #999999;
        }
        ul {
            .typeSelect {
                background: #30CE84;
                color: #fff;
            }
            li {
                width: 30%;
                margin-right: 3.33%;
                display: inline-block;
                text-align: center;
                border: 1px solid #30CE84;
                margin-bottom: 15px;
                height: 49px;
                font-size: 15px;
                line-height: 49px;
                color: #30CE84;
            }
        }
    }

    .reminder {
        color: #999999;
        padding-bottom: 50px;
        .reminderTitle {
            color: #4A4A4A;
            margin: 16px 0 15px 0;
            line-height: 21px;
        }
    }
}


.changeC {
    height: 44px;
    background: #30CE84;
    color: #fff;
    position: fixed;
    width: 100%;
    line-height: 44px;
    bottom: 0;
    text-align: center;
    font-size: 15px;
    max-width: 378px;
}


input::-webkit-input-placeholder {
    color: #999999;
}

input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #999999;
}

input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #999999;
}

input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #999999;
}
</style>

