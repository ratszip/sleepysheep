<template>
  <div class="post_page">
    <van-nav-bar @click-left="backClick" left-text="返回" left-arrow />
    <van-form @submit="onSubmit">
      <van-field name="uploader">
        <template #input>
          <van-uploader
            v-model="uploader"
            multiple
            :max-count="3"
            :max-size="1024 * 1024 * 50"
            :after-read="afterRead"
            :before-read="beforeRead"
          />
        </template>
      </van-field>
      <van-field
        v-model="p_title"
        rows="1"
        maxlength="20"
        placeholder="请输入标题"
        show-word-limit
        required
      />

      <van-field
        v-model="p_content"
        autosize
        rows="4"
        type="textarea"
        maxlength="100"
        placeholder="添加正文"
        show-word-limit
        required
      />
      <div class="pub">
        <!-- <div class="save">
        <div class="cg">
          <van-icon class="vcg" name="envelop-o" size="18px" />
        </div>
        <span>存草稿</span>
      </div> -->
        <van-button native-type="submit" class="publish" round color="#fd3748"
          >发布内容</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<style lang="less">
.pub {
  position: absolute;
  width: 100%;
  bottom: 50px;
  display: flex;
  .publish {
    flex: 1;
    margin: 10px 20px 10px 10px;
  }
  .save {
    padding-top: 6px;
    margin: 10px 10px 10px 20px;
    span {
      display: block;
      font-size: 12px;
    }
    .cg {
      margin: 0 auto;
      width: 50px;
      height: 50px;
      background-color: #dcdcdc;
      border-radius: 50%;
      .vcg {
        margin-left: 7px;
        bottom: 4px;
      }
    }
  }
}
.post_page {
  background-color: #ffff;
  height: 100%;
  .van-field__control {
    width: 600px;
  }
}
.van-cell__value {
  display: flex;
  justify-content: space-between;
}
</style>
<script>
import request from "@/util/request";
export default {
  data() {
    return {
      p_title: "",
      p_content: "",
      uploader: [],
      fileList: [],
    };
  },
  methods: {
    compressImg(file, quality) {
      var qualitys = 0.52;
      console.log(parseInt((file.size / 1024).toFixed(2)) + "111");
      console.log(parseInt((file.size / 1024).toFixed(2)));
      if (parseInt((file.size / 1024).toFixed(2)) < 1024) {
        qualitys = 0.85;
      }
      if (5 * 1024 < parseInt((file.size / 1024).toFixed(2))) {
        qualitys = 0.92;
      }
      if (quality) {
        qualitys = quality;
      }
      if (file[0]) {
        return Promise.all(
          Array.from(file).map((e) => this.compressImg(e, qualitys))
        ); // 如果是 file 数组返回 Promise 数组
      } else {
        return new Promise((resolve) => {
          console.log(file);
          if ((file.size / 1024).toFixed(2) < 300) {
            resolve({
              file: file,
            });
          } else {
            const reader = new FileReader(); // 创建 FileReader
            reader.onload = ({ target: { result: src } }) => {
              const image = new Image(); // 创建 img 元素
              image.onload = async () => {
                const canvas = document.createElement("canvas"); // 创建 canvas 元素
                const context = canvas.getContext("2d");
                var targetWidth = image.width;
                var targetHeight = image.height;
                var originWidth = image.width;
                var originHeight = image.height;
                if (
                  1 * 1024 <= parseInt((file.size / 1024).toFixed(2)) &&
                  parseInt((file.size / 1024).toFixed(2)) <= 10 * 1024
                ) {
                  var maxWidth = 1600;
                  var maxHeight = 1600;
                  targetWidth = originWidth;
                  targetHeight = originHeight;
                  // 图片尺寸超过的限制
                  if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                      // 更宽，按照宽度限定尺寸
                      targetWidth = maxWidth;
                      targetHeight = Math.round(
                        maxWidth * (originHeight / originWidth)
                      );
                    } else {
                      targetHeight = maxHeight;
                      targetWidth = Math.round(
                        maxHeight * (originWidth / originHeight)
                      );
                    }
                  }
                }
                if (
                  10 * 1024 <= parseInt((file.size / 1024).toFixed(2)) &&
                  parseInt((file.size / 1024).toFixed(2)) <= 20 * 1024
                ) {
                  maxWidth = 1400;
                  maxHeight = 1400;
                  targetWidth = originWidth;
                  targetHeight = originHeight;
                  // 图片尺寸超过的限制
                  if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                      // 更宽，按照宽度限定尺寸
                      targetWidth = maxWidth;
                      targetHeight = Math.round(
                        maxWidth * (originHeight / originWidth)
                      );
                    } else {
                      targetHeight = maxHeight;
                      targetWidth = Math.round(
                        maxHeight * (originWidth / originHeight)
                      );
                    }
                  }
                }
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                context.clearRect(0, 0, targetWidth, targetHeight);
                context.drawImage(image, 0, 0, targetWidth, targetHeight); // 绘制 canvas
                const canvasURL = canvas.toDataURL("image/jpeg", qualitys);
                const buffer = atob(canvasURL.split(",")[1]);
                let length = buffer.length;
                const bufferArray = new Uint8Array(new ArrayBuffer(length));
                while (length--) {
                  bufferArray[length] = buffer.charCodeAt(length);
                }
                const miniFile = new File([bufferArray], file.name, {
                  type: file.type,
                });
                // console.log({
                //   file: miniFile,
                //   origin: file,
                //   beforeSrc: src,
                //   afterSrc: canvasURL,
                //   beforeKB: Number((file.size / 1024).toFixed(2)),
                //   afterKB: Number((miniFile.size / 1024).toFixed(2)),
                //   qualitys: qualitys,
                // });
                resolve({
                  file: miniFile,
                  origin: file,
                  beforeSrc: src,
                  afterSrc: canvasURL,
                  beforeKB: Number((file.size / 1024).toFixed(2)),
                  afterKB: Number((miniFile.size / 1024).toFixed(2)),
                });
                // this.fileList.push(miniFile);
                // file = miniFile;
                // this.uploader.pop();
                // this.fileList.push(miniFile);
                this.uploader.at(-1).file = miniFile;
              };
              image.src = src;
            };
            reader.readAsDataURL(file);
          }
        });
      }
    },
    beforeRead(file) {
      let regex = /(.jpg|.jpeg|.png|.bmp)$/;
      if (!regex.test(file.type)) {
        Toast("图片格式不支持上传");
        return false;
      } else {
        return true;
      }
    },
    afterRead(file) {
      file = file.file;
      this.compressImg(file, 0.2);
      console.log(this.uploader);
    },

    backClick() {
      this.$router.back();
    },
    onSubmit() {
      this.afterRead();
      let formData = new FormData();
      this.uploader.forEach((item, index) => {
        formData.append("files", item.file);
        // console.log(item.file);
      });
      // formData.append("files", this.uploader[0].file);
      formData.append("title", this.p_title);
      formData.append("content", this.p_content);
      console.log(formData);
      // console.log(localStorage.token);
      request({
        method: "post",
        url: "/topic/create",
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          // res.data.token;
          if (res.data.code === 2000) {
            this.$toast({
              message: "发帖成功",
            });
            this.$router.push("/user");
          } else if (res.data.code === 3000) {
            this.$toast({
              message: res.data.msg,
            });
          } else if (res.data.code === 9000) {
            this.$pop.open();
          }
          // console.log(this.suglist.data[0].images[0].path);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>