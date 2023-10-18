<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="eback" />
    <van-image
      class="etx"
      round
      width="60px"
      height="60px"
      :src="`${this.$store.state.sBaseUrl}/images/${userInfo.avatar}.png`"
    />
    <van-field
      v-model="userInfo.nickName"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="userInfo.intro"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      label="简介"
      placeholder="请输入简介"
    />
    <van-cell is-link title="性别" @click="show = true" class="gd" />
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />
  </div>
</template>

<script>
import request from "@/util/request";
export default {
  data() {
    return {
      userInfo: "",
      show: false,
      actions: [{ name: "男" }, { name: "女" }, { name: "保密" }],
    };
  },
  methods: {
    onSelect() {},
    eback() {
      this.$router.back();
    },
    getUserInfo() {
      this.uid = this.$route.params.uid;
      this.pageLoading = true;
      request({
        method: "post",
        url: "/user/info",
        headers: {
          token: localStorage.token,
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          this.pageLoading = false;
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
.gd::before {
  position: absolute;
  content: "男";
  left: 230px;
}
</style>