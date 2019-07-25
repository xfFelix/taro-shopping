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
            @files-added="frontHandler"
            @file-submitted="frontGetFile"
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
    backFiles:[]
  }),
  methods: {
    frontGetFile() {
      this.$emit("front-file", this.frontFiles[0]);
    },
    frontHandler() {
      const file = this.frontFiles[0];
      file && this.$refs.frontUpload.removeFile(file);
    },
    backGetFile() {
      this.$emit("back-file", this.backFiles[0]);
    },
    backHandler() {
      const file = this.backFiles[0];
      file && this.$refs.backUpload.removeFile(file);
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
      .bgImg{
        width: 100%;
        height: 100%;
        background:url("../../../../common/images/frontImg.png") no-repeat;
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
      +.cube-upload-btn{
        opacity: 0;
      }
      .cubeic-wrong{
        display: none;
      }
      .cube-upload-file_stat{
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

