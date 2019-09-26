<template>
    <div class="upload-card">
        <p class="card-title">上传信用卡正面照片</p>
        <div  class="card-img">
        <div class="identity-front-img">
          <cube-upload
            ref="frontUpload"
            v-model="frontFiles"
            @file-submitted="frontGetFile"
            @files-added="frontHandler"
          >
            <div class="clear-fix">
              <cube-upload-file v-for="(file, i) in frontFiles" :file="file" :key="i"></cube-upload-file>
              <cube-upload-btn :multiple="false">
                <div>
                  <img src="../../../../common/images/addCard-01.jpg" alt="正面照" />
                </div>
              </cube-upload-btn>
            </div>
          </cube-upload>
        </div>
          <span>示例</span>
          <div class="card-upload-examp">
            <img src="../../../../common/images/addCard-02.jpg" class="card-example" />
          </div>
        </div>
      </div>

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios';
export default {
  data:()=>({
    frontFiles:[],
    ext:''
  }),
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      userinfo: 'getUserinfo'
    }),
  },
  methods:{
    frontGetFile() {
      const file = this.frontFiles[0].file;
      this.ext = file.name.split('.')[1]
      this.uploadImg(file)
    },
    frontHandler(files) {
      this.sizeJudge(files);
      const file = this.frontFiles[0];
      file && this.$refs.frontUpload.removeFile(file);
    },
      // 图片不能超过10M
    sizeJudge(files){
       const maxSize = 10 * 1024* 1024;
        if(files[0].size>maxSize){
          files[0].ignore = true;
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "图片不能超过10M"
          }).show();
        }
    },
    // 上传图片
    uploadImg(file) {
      let that = this;
      let hasIgnore = false;
      const limitSize = 20 *1024 ;
      // 如果选择的图片大小大于20K则进行图片压缩处理（Base64）
      if (file.size > limitSize) {
        this.compressPic(file);
      } else {
        let reads = new FileReader();
        reads.readAsDataURL(file);
        reads.onload = function(e) {
          let data = e.target.result;
          that.uploadbase(data);
        };
      }
    },
    compressPic(file) {
      let reads = new FileReader();
      reads.readAsDataURL(file);
      let that = this;
      reads.onload = function(e) {
        var bdata = e.target.result;
        // 这里quality的范围是（0-1）
        var quality = 0.92;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = bdata;
        img.onload = function() {
          var width = 400;
          // var width = img.width;
          canvas.width = width;
          canvas.height = width * (img.height / img.width);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          let data = canvas.toDataURL("image/jpeg", quality);
          that.uploadbase(data)

        };
      };
    },
    uploadbase(image_data){
      let formData = new FormData()
      formData.append("file", image_data);
      formData.append("token", this.getToken);
      formData.append("ext", this.ext);
      formData.append("folder", 'cards');
      const instance = axios.create({
        headers:{'Content-Type': 'multipart/form-data;charset=utf-8'},
        withCredentials: process.env.NODE_ENV === 'production',
      })
      instance.post(process.env.VUE_APP_INFO_URl+'/user/uploadbase64',formData).then(res=>{
        if(res.data.error_code==0){
          this.$emit("front-file", res.data.message);
        }else{
          this.$toast('上传图片失败：'+res.data.message);
        }
      }).catch(err=>{
        this.$toast('上传图片失败');
      })
    }
  },
  mounted(){

  }
}
</script>
<style lang="scss" scoped>
.upload-card{
  .card-title{
    color: #4A4A4A;
    font-size: 15px;
    padding: 30px 0 20px 13px;
  }
  .card-img{
    display: flex;
    align-items: center;
    justify-content: space-around;
    img{
      width: 150px;
      height: 90px;
    }
  }
}
.identity-front-img{
  width: 150px;
  height: 90px;
}

</style>

<style lang="scss">
.cube-upload {
  height: 100%;
  .clear-fix {
    height: 100%;
    .cube-upload-file,
    .cube-upload-btn {
      margin: 0;
      height: 100%;
      .bgImg {
        width: 100%;
        height: 100%;
        background: url("../../../../common/images/frontImg.png") no-repeat;
      }
    }
    .cube-upload-file {
      margin: 0;
      .cube-upload-file-def {
        position: relative;
        box-sizing: border-box;
        background: #fff no-repeat center;
        background-size: 100% auto;
        border-radius: 0.053333rem;
        height: 100%;
        width: 100%;
      }
      + .cube-upload-btn {
        opacity: 0;
      }
      .cubeic-wrong {
        display: none;
      }
      .cube-upload-file_stat {
        display: none;
      }
    }
    .cube-upload-btn {
      position: absolute;
      top: 0;
      opacity: 1;
    }
  }
}
</style>

