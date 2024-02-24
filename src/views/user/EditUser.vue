<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="eback" />
    <van-image
      v-if="userInfo"
      class="etx"
      round
      width="60px"
      height="60px"
      @click="avatar"
      :src="`${baseurl}/${userInfo.avatar}`"
    />
    <van-field
      v-model="userInfo.nickName"
      label="用户名"
      placeholder="请输入用户名"
      readonly
      clickable
      @click="nameClick"
    />

    <van-field
      v-model="userInfo.intro"
      rows="2"
      autosize
      readonly
      type="textarea"
      maxlength="50"
      label="简介"
      placeholder="请输入简介"
      clickable
      @click="introClick"
    />
    <van-cell is-link title="性别" @click="show = true" />
    <span class="gd">{{ userInfo.gender == 0 ? "女" : "男" }}</span>
    <van-cell is-link title="上传打赏码" @click="goewm" />
    <van-image
      v-if="userInfo.ewm"
      width="150px"
      height="150px"
      @click="avatar"
      :src="`${baseurl}/${userInfo.ewm}`"
      style="left: 50%; transform: translateX(-50%); margin-top: 30px"
    ></van-image>
    <div v-if="!userInfo.ewm" style="font-size: 14px">
      可添加客服微信：wendaxie666<br />
      公众号：问答蟹
      <br />10元解锁自定义头像和打赏码。服务器维护开销，谢谢！
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />

    <van-dialog
      v-model="mingz"
      title="昵称"
      :before-close="bclose"
      :showCancelButton="dialogbt"
      :showConfirmButton="dialogbt"
    >
      <van-field
        style="margin-top: 20px"
        v-model="namec"
        type="text"
        placeholder="请输入名字"
        input-align="center"
        maxlength="15"
      />
      <span style="font-size: 12px; color: red; margin: 10px">{{ mzmsg }}</span>
      <div class="txbt" style="margin-top: 20px">
        <van-button
          class="txbtct"
          type="info"
          block
          size="normal"
          round
          @click="changeName"
          >提交</van-button
        >
        <van-button class="txbtct" @click="close" type="default" block round
          >取消</van-button
        >
      </div>
    </van-dialog>
    <van-dialog
      v-model="jianj"
      title="简介"
      :before-close="bclose"
      :showCancelButton="dialogbt"
      :showConfirmButton="dialogbt"
    >
      <van-field
        style="margin-top: 20px"
        v-model="introc"
        type="textarea"
        placeholder="请输入简介"
        maxlength="40"
      />
      <span style="font-size: 12px; color: red; margin: 10px">{{ mzmsg }}</span>
      <div class="txbt" style="margin-top: 20px">
        <van-button
          class="txbtct"
          type="info"
          block
          size="normal"
          round
          @click="changeIntro"
          >提交</van-button
        >
        <van-button class="txbtct" @click="close" type="default" block round
          >取消</van-button
        >
      </div>
    </van-dialog>
    <van-dialog
      v-model="toux"
      :before-close="bclose"
      :showCancelButton="dialogbt"
      :showConfirmButton="dialogbt"
    >
      <ul class="txcontent">
        <li
          v-for="(item, index) in userInfo.avatarList"
          :class="{ txactive: txactive == index }"
          @click="txclick(item, index)"
        >
          <van-image width="52" height="52" round :src="`${baseurl}/${item}`" />
        </li>
      </ul>
      <div class="txbt">
        <van-button class="txbtct" @click="goupload" type="default" block round
          >上传(仅赞助者)</van-button
        >
        <van-button
          class="txbtct"
          type="info"
          block
          size="normal"
          round
          @click="changetx"
          >提交</van-button
        >
        <van-button class="txbtct" @click="close" type="default" block round
          >取消</van-button
        >
      </div>
    </van-dialog>
    <van-dialog
      v-model="upload"
      title="上传头像"
      :showCancelButton="dialogbt"
      :showConfirmButton="dialogbt"
    >
      <van-uploader
        v-model="uploader"
        multiple
        :max-count="1"
        :max-size="1024 * 1024 * 30"
        :after-read="afterRead"
        :before-read="beforeRead"
        style="margin-left: 40%; margin-top: 10px"
      />
      <div class="txbt" style="margin-top: 10px">
        <van-button
          class="txbtct"
          type="info"
          block
          size="normal"
          round
          @click="subup"
          >提交</van-button
        >
        <van-button class="txbtct" type="default" @click="closeup" block round
          >取消</van-button
        >
      </div>
    </van-dialog>
    <van-dialog
      v-model="uploadewm"
      title="上传打赏码"
      :showCancelButton="dialogbt"
      :showConfirmButton="dialogbt"
    >
      <van-uploader
        v-model="uploaderewm"
        multiple
        :max-count="1"
        :max-size="1024 * 1024 * 30"
        :after-read="afterRead"
        :before-read="beforeRead"
        style="margin-left: 40%; margin-top: 10px"
      />
      <div class="txbt" style="margin-top: 10px">
        <van-button
          class="txbtct"
          type="info"
          block
          size="normal"
          round
          @click="upewm"
          >提交</van-button
        >
        <van-button class="txbtct" type="default" block round @click="closewm"
          >取消</van-button
        >
      </div>
    </van-dialog>
  </div>
</template>

<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      uploader: [],
      uploaderewm: [],
      baseurl: this.$store.state.sourceUrl,
      txactive: -1, //选中头像的index
      txselect: "", //选中头像名称
      dialogbt: false, //确认取消按钮显示
      toux: false, //头像弹窗
      upload: false, //上传弹窗
      uploadewm: false, //二维码弹窗
      mingz: false, //名字弹窗
      jianj: false, //简介弹窗
      mzmsg: "", //名字提示
      userInfo: "",
      namec: "", //修改后的昵称
      introc: "", //修改后的简介
      show: false,
      actions: [{ name: "女" }, { name: "男" }],
    };
  },
  methods: {
    beforeRead(file) {
      let regex = /(.jpg|.jpeg|.png|.gif)$/;
      if (!regex.test(file.type)) {
        this.$toast({
          message: "格式不支持",
        });
        return false;
      } else {
        return true;
      }
    },
    afterRead(file) {
      file = file.file;
      this.compressImg(file, 0.2);
    },
    goewm() {
      this.uploadewm = true;
    },
    closewm() {
      this.uploadewm = false;
    },
    goupload() {
      this.toux = false;
      this.upload = true;
    },
    upewm() {
      let formData = new FormData();
      if (!this.uploaderewm[0]) {
        this.$toast({
          message: "请选择图片",
        });
        this.close();
        return;
      }
      formData.append("file", this.uploaderewm[0].file);
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/user/ewm",
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          // res.data.token;
          Toast.clear();
          if (res.data.code === 2000) {
            this.uploadewm = false;
            this.$toast({
              message: "上传成功",
            });
          } else if (res.data.code === 9000) {
            this.$pop.open();
          } else {
            this.$toast({
              message: res.data.msg,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    subup() {
      let formData = new FormData();
      if (!this.uploader[0]) {
        this.$toast({
          message: "请选择图片",
        });
        this.close();
        return;
      }
      formData.append("file", this.uploader[0].file);
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/user/avatarvip",
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          // res.data.token;
          Toast.clear();
          if (res.data.code === 2000) {
            this.$toast({
              message: "上传成功",
            });
            this.userInfo.avatar = res.data.data;
            this.upload = false;
          } else if (res.data.code === 9000) {
            this.$pop.open();
          } else {
            this.$toast({
              message: res.data.msg,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    closeup() {
      this.upload = false;
    },
    close() {
      this.mingz = false;
      this.toux = false;
      this.jianj = false;
      this.mzmsg = "";
      this.txactive = -1;
    },
    bclose(action, done) {
      this.close();
      return done();
    },
    introClick() {
      this.jianj = true;
      this.introc = this.userInfo.intro;
    },
    nameClick() {
      this.mingz = true;
      this.namec = this.userInfo.nickName;
    },
    changeIntro() {
      if (this.userInfo.intro == this.introc.trim()) {
        this.$toast({
          message: "没有改动",
        });
        this.close();
        return;
      }
      request({
        method: "post",
        url: "/user/edit",
        data: { intro: this.introc },
        headers: {
          token: localStorage.token,
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          if (res.data.code === 2000) {
            this.userInfo.intro = this.introc;
            this.close();
            this.$toast({
              message: res.data.msg,
            });
          } else if (res.data.code === 9000) {
            this.$pop.open();
          } else {
            this.$toast({
              message: res.data.msg,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    changeName() {
      if (this.userInfo.nickName == this.namec.replace(/\s/g, "")) {
        this.mzmsg = "*名字未修改";
        return;
      }
      var usernameRegex =
        /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/;
      if (!usernameRegex.test(this.namec)) {
        this.mzmsg = "*名字仅可包含中英文";
        return;
      }
      request({
        method: "post",
        url: "/user/edit",
        data: { nickName: this.namec },
        headers: {
          token: localStorage.token,
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          if (res.data.code === 2000) {
            this.userInfo.nickName = this.namec;
            this.$toast({
              message: res.data.msg,
            });
            this.close();
          } else if (res.data.code === 9000) {
            this.$pop.open();
          } else if (res.data.code === 7000) {
            this.mzmsg = "昵称已存在，请换个昵称";
          } else {
            this.$toast({
              message: res.data.msg,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    txclick(item, index) {
      this.txactive = index;
      this.txselect = item;
    },
    changetx() {
      if (this.txselect == "") {
        this.$toast({
          message: "请选择头像",
        });
        return;
      }
      request({
        method: "post",
        url: "/user/edit",
        data: { avatar: this.txselect },
        headers: {
          token: localStorage.token,
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          if (res.data.code === 2000) {
            this.userInfo.avatar = this.txselect;
            this.toux = false;
            this.$toast({
              message: res.data.msg,
            });
          } else if (res.data.code === 9000) {
            this.$pop.open();
          } else {
            this.$toast({
              message: res.data.msg,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    onSelect(item) {
      this.show = false;
      var gender;
      if (item.name == "男") {
        gender = 1;
      } else if (item.name == "女") {
        gender = 0;
      }
      request({
        method: "post",
        url: "/user/edit",
        data: { gender: gender },
        headers: {
          token: localStorage.token,
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          if (res.data.code === 2000) {
            this.userInfo.gender = gender;
            this.$toast({
              message: res.data.msg,
            });
          } else if (res.data.code === 9000) {
            this.$pop.open();
          } else {
            this.$toast({
              message: res.data.msg,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    avatar() {
      this.toux = true;
    },
    eback() {
      this.$router.back();
    },
    getUserInfo() {
      this.uid = this.$route.params.uid;
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/user/avatar",
        headers: {
          token: localStorage.token,
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          Toast.clear();
          if (res.data.code === 2000) {
            this.userInfo = res.data.data;
          } else if (res.data.code === 9000) {
            this.$pop.open();
          } else {
            this.$toast({
              message: res.data.msg,
            });
          }
        },
        (err) => {
          Toast.clear();
          console.log(err);
        }
      );
    },
    compressImg(file, quality) {
      var qualitys = 0.52;
      // console.log(parseInt((file.size / 1024).toFixed(2)) + "111");
      // console.log(parseInt((file.size / 1024).toFixed(2)));
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
          // console.log(file);
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
                this.uploader.at(-1).file = miniFile;
              };
              image.src = src;
            };
            reader.readAsDataURL(file);
          }
        });
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>
<style lang="less">
.etx {
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.gd {
  position: absolute;
  margin-top: -64px;
  font-size: 30px;
  left: 230px;
}
.txbt {
  margin-top: 220px;
  padding: 20px;
  .txbtct {
    height: 60px;
    margin-top: 10px;
  }
}
.txcontent {
  padding: 20px 10px;
}
li {
  list-style: none;
  margin: 10px;
  float: left;
}
.txactive {
  background-color: #d3d9df;
}
.van-field__body {
  width: 100%;
}
</style>