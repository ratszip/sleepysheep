<template>
  <div>
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div class="group">
      <van-cell center title="帖子">
        <template #right-icon>
          <van-switch v-model="checked" size="24" />
        </template>
      </van-cell>
      <van-cell center title="评论">
        <template #right-icon>
          <van-switch v-model="checked" size="24" />
        </template>
      </van-cell>
      <van-cell center title="收藏">
        <template #right-icon>
          <van-switch v-model="checked" size="24" />
        </template>
      </van-cell>
      <van-cell center title="点赞">
        <template #right-icon>
          <van-switch v-model="checked" size="24" />
        </template>
      </van-cell>
    </div> -->
    <van-cell-group class="group">
      <van-cell title="修改密码" clickable @click="modifyPwd" />
      <!-- <van-cell title="注销账号" clickable /> -->
      <van-cell title="退出登录" @click.native="logout" clickable />
    </van-cell-group>
  </div>
</template>
<script>
import request from "@/util/request";
export default {
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    modifyPwd() {
      this.$router.push("/password");
    },
    logout() {
      // console.log("ccc");
      request({
        method: "post",
        url: "/user/logout",
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.code === 9000) {
            this.$pop.open();
          } else if (res.data.code === 2000) {
            this.$router.push("/home");
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
};
</script>
<style lang="less">
.group {
  margin-top: 20px;
}
</style>