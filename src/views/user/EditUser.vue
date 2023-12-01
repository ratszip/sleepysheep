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
        maxlength="16"
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
        maxlength="50"
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
  </div>
</template>

<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      baseurl: this.$store.state.sourceUrl,
      txactive: -1, //选中头像的index
      txselect: "", //选中头像名称
      dialogbt: false, //确认取消按钮显示
      toux: false, //头像弹窗
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