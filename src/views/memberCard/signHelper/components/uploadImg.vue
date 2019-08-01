<template>
  <div>
    <div class="identity-photo-wrap">
      <p>请上传您的身份证照片</p>
      <div class="identity-front-back">
        <!-- 身份证正面照 -->
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
                  <img src="~/common/images/frontImg.png" alt="正面照" />
                </div>
              </cube-upload-btn>
            </div>
          </cube-upload>
        </div>
        <!-- 身份证反面照 -->
        <div class="identity-back-img">
          <cube-upload
            ref="backUpload"
            v-model="backFiles"
            @files-added="backHandler"
            @file-submitted="backGetFile"
          >
            <div class="clear-fix">
              <cube-upload-file v-for="(file, i) in backFiles" :file="file" :key="i"></cube-upload-file>
              <cube-upload-btn :multiple="false">
                <div>
                  <img src="~/common/images/backImg.png" alt="反面照" />
                </div>
              </cube-upload-btn>
            </div>
          </cube-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    frontFiles: [],
    backFiles: [],

  }),
  methods: {
    frontHandler(files) {
      this.sizeJudge(files);
      const file = this.frontFiles[0];
      file && this.$refs.frontUpload.removeFile(file);
    },
    backHandler(files) {
      this.sizeJudge(files);
      const file = this.backFiles[0];
      file && this.$refs.backUpload.removeFile(file);
    },
    frontGetFile() {
      const file = this.frontFiles[0].file;
      this.uploadImg(file,'front')
    },
    backGetFile() {
      const file = this.backFiles[0].file;
      this.uploadImg(file,'back');
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
    uploadImg(file,imgDir) {
      let that = this;
      let hasIgnore = false;
      const limitSize = 20 *1024 ;
      // 如果选择的图片大小大于20K则进行图片压缩处理（Base64）
      if (file.size > limitSize) {
        this.compressPic(file,imgDir);
      } else {
        let reads = new FileReader();
        reads.readAsDataURL(file);
        reads.onload = function(e) {
          let bdata = e.target.result;
          // let dataBese = bdata.split(',')[1];
          if(imgDir=='front'){
            that.$emit("front-file", bdata);
          }else{
            that.$emit("back-file", bdata);
          }
        };
      }
    },
    compressPic(file,imgDir) {
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
          // let dataBese = data.split(',')[1];
           console.log(data)
          if(imgDir=='front'){
            that.$emit("front-file", data);
          }else{
            that.$emit("back-file", data);
          }
        };
      };
    },

  }
};
</script>

<style lang="scss" scoped>
.identity-photo-wrap {
  background: #fff;
  padding: 25px 15px 30px 15px;
  p {
    color: #4e4e4e;
  }
  .identity-front-back {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .identity-front-img,
    .identity-back-img {
      width: 160px;
      height: 140px;
      img {
        width: 100%;
      }
    }
  }
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

