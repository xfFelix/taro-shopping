
import {mapGetters} from 'vuex'
export default {
  data:()=>({
    yingqiudiShow:false
  }),
  computed: {
    ...mapGetters({
      userinfo: 'getUserinfo'
    })
  },
  mounted(){
    if(this.userinfo.vendorId == 'yingqiudi'){
      this.yingqiudiShow = true;
    }
  }
}
