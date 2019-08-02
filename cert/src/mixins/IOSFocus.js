export default {
  data: () => ({
    inFocus: false
  }),
  methods: {
      /* 问题: ios12+，微信6.7.4版本存在bug,键盘收回时,界面没有恢复,底下出现空白区域,并导致光标位置错乱,再次点击输入框区域时无法focus
         解决方案: 当input失焦,键盘收回后,滚动一下页面就可以使页面恢复正常
         补充: 当在手机号与验证码之间切换输入时,会同时触发前输入框的blur和后输入框focus,这个时候触发滚动,页面会出现较大跳跃,因此通过inFocus 和 setTimeout 判断,是切换input还是真正blur,真正blur的时候,再滚动页面
      */
      //focus
    iptFocus () {
      this.inFocus = true;
    },
    //blur
    iptBlur () {
      this.inFocus = false;
      setTimeout(() =>{
        if(this.inFocus == false){
          // 当input 失焦时,滚动一下页面就可以使页面恢复正常
          this.checkWxScroll();
        }
      },200)
    },

    checkWxScroll(){
      var ua = navigator.userAgent.toLowerCase();
      var u = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if(ua.match(/MicroMessenger/i) == 'micromessenger'&&!!u){//在iphone 微信中
        // var osVersion  =  navigator.userAgent.match(/iPhone\sOS\s([\d\_]+)/i);
        // var  osArr = osVersion.length>=1? osVersion[1].split('_'):[];
        // var newOS = osArr.length>=2 && (versionArr[0]>11)
        // if(newOS){ //如果iphone版本号>=12
          this.temporaryRepair();
        // }
      }
    },
     temporaryRepair(){
        // var currentPosition,timer;
        // var speed=1;//页面滚动距离
        var timer=setInterval(() => {
          //  currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
          //  currentPosition-=speed;
           window.scrollTo(0,0);//页面向上滚动
//            currentPosition+=speed; //speed变量
//            window.scrollTo(0,currentPosition);//页面向下滚动
           clearInterval(timer);
        }, 1);
     }
  }
}
