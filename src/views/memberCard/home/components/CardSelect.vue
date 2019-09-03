<template>
  <div class="cardSelect">
    <ul class="cardChange">
      <li v-for="(item,index) in cardList" :key="index" @click="goSelect(item)">
        <div class="cardLogo" :class="item.cardLogo"></div>
        <p>{{item.title}}</p>
      </li>
    </ul>

    <!-- <div class="moreChange">
        <p class="moreChangeTitle">更多兑换</p>
        <ul>
          <li v-for="(item,index) in changeList" :key="index" @click="goLink(item.path)">
            <div class="changeList" :class="item.changeLogo"></div>
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div> -->

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    cardList: [
      { title: '爱奇艺', id: 2, cardLogo: 'cardLogo02', costWay:'1' },
      { title: '腾讯视频', id: 3, cardLogo: 'cardLogo03', costWay:'1' },
      { title: '腾讯体育', id: 4, cardLogo: 'cardLogo16' , costWay:'1'},
      { title: '优 酷', id: 1, cardLogo: 'cardLogo01' , costWay:'1'},
      { title: '芒果TV', id: 5, cardLogo: 'cardLogo04', costWay:'1' },
      { title: '搜狐视频', id: 6, cardLogo: 'cardLogo05' , costWay:'1'},
      // { title: 'QQ阅读', id: 13, cardLogo: 'cardLogo12' },
      // { title: '掌阅', id: 12, cardLogo: 'cardLogo11' },
      // { title: '酷狗音乐', id: 9, cardLogo: 'cardLogo08' },
      { title: '网易云音乐', id: 8, cardLogo: 'cardLogo07', costWay:'1' },
      { title: 'QQ音乐', id: 10, cardLogo: 'cardLogo09' , costWay:'1'},
      // { title: '喜马拉雅', id: 11, cardLogo: 'cardLogo10' },
      // { title: '新浪微博', id: 14, cardLogo: 'cardLogo14' },
      // { title: '乐视', id: 7, cardLogo: 'cardLogo06' },
      { title: '沃尔玛', id: 15, cardLogo: 'cardLogo26' , costWay:'2'},
      { title: '永辉超市', id: 16, cardLogo: 'cardLogo27' , costWay:'2'},
      { title: '家乐福', id: 17, cardLogo: 'cardLogo17', costWay:'2' },
      { title: '麦德龙', id: 18, cardLogo: 'cardLogo18' , costWay:'2'},
      { title: '盒马鲜生', id: 19, cardLogo: 'cardLogo19' , costWay:'2'},
      // { title: '百果园', id: 20, cardLogo: 'cardLogo20', costWay:'2' },
      { title: '哈根达斯', id: 21, cardLogo: 'cardLogo21', costWay:'2' },
      { title: '歌帝梵', id: 22, cardLogo: 'cardLogo22', costWay:'2' },
      { title: '瑞幸咖啡', id: 23, cardLogo: 'cardLogo23', costWay:'2' },
      { title: '滴滴快车', id: 24, cardLogo: 'cardLogo24', costWay:'2' },
      // { title: '星巴克', id: 25, cardLogo: 'cardLogo25' , costWay:'2'},
    ],
    changeList: [
      { title: '黄金兑换', changeLogo: 'changeList01', path: process.env.VUE_APP_INFO_URl + '#!/goldChange?token=' },
      { title: '加油卡充值', changeLogo: 'changeList02', path: process.env.VUE_APP_BASE_HOME_URL + '/ticket/oil/?token=' },
      { title: '话费充值', changeLogo: 'changeList03', path: process.env.VUE_APP_INFO_URl + '#!/phoneBill?token=' },
      // { title: '信用卡还款', changeLogo: 'changeList04', path: process.env.VUE_APP_INFO_URl + '#!/goldChange?token='},
    ]
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
    }),
  },
  methods: {
    goSelect(item) {
      this.$router.push({ name: 'cardType', query: { id: item.id, title: item.title ,costWay:item.costWay} })
    },
    goLink(path) {
      window.location = path + this.getToken;
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.cardSelect {
  background: #FFF;
  li {
    width: 25%;
    display: inline-block;
    text-align: center;
    margin: 20px 0;
    .cardLogo {
      display: inline-block;
      background-image: url(../../../../common/images/cardTicket.png?v=1);
      background-repeat: no-repeat;
      width: 40px;
      height: 40px;
      background-size: 278px 268px;
    }
    .cardLogo01 {
      background-position: -5px -5px;
    }
    .cardLogo02 {
      background-position: -52px -2px;
    }

    .cardLogo03 {
      background-position: -98px -4px;
    }

    .cardLogo04 {
      background-position: -145px -5px;
    }

    .cardLogo05 {
      background-position: -5px -51px;
    }

    .cardLogo06 {
      background-position: -46px -49px;
    }

    .cardLogo07 {
      background-position: -96px -51px;
    }

    .cardLogo08 {
      background-position: -145px -51px;
    }

    .cardLogo09 {
      background-position: -5px -99px;
    }

    .cardLogo10 {
      background-position: -51px -96px;
    }

    .cardLogo11 {
      background-position: -94px -97px;
    }
    .cardLogo12 {
      background-position: -144px -98px;
    }
    .cardLogo13 {
      background-position: -6px -142px;
    }
    .cardLogo14 {
      background-position: -50px -141px;
    }
    .cardLogo15 {
      background-position: -98px -145px;
    }
    .cardLogo16 {
      background-position: -146px -145px;
    }
    .cardLogo17 {
      background-position: -192px -5px;
    }
    .cardLogo18 {
      background-position: -191px -51px;
    }
    .cardLogo19 {
      background-position: -237px -5px;
    }
    .cardLogo20 {
      background-position: -192px -145px;
    }
    .cardLogo21 {
      background-position: -235px -54px;
    }
    .cardLogo22 {
      background-position: -146px -192px;
    }
    .cardLogo23 {
      background-position: -237px -98px;
    }
    .cardLogo24 {
      background-position: -52px -192px;
    }
    .cardLogo25 {
      background-position:-237px -145px;
    }
    .cardLogo26 {
      background-position: -191px -192px;
       width: 46px;
    }
    .cardLogo27 {
      background-position: -191px -98px;
    }
    p {
      color: #4A4A4A;
    }
  }
  .changeList {
    display: inline-block;
    background-image: url(../../../../common/images/change.png);
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    background-size: 190px 84px;
  }
  .changeList01 {
    background-position: -7px -3px;
  }
  .changeList02 {
    background-position: -51px -3px;
  }
  .changeList03 {
    background-position: -95px -3px;
  }
  .changeList04 {
    background-position: -139px -3px;
  }
  .moreChange {
    .moreChangeTitle {
      margin: 25px 0 0 15px;
      font-size: 15px;
    }
    p {
      color: #999;
    }
  }
}
</style>
