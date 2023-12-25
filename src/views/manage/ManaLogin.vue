<template>
  <van-form @submit="onSubmit" class="manalogin">
    <van-field v-model="username" name="用户名" placeholder="用户名" />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      placeholder="密码"
    />
    <div style="margin: 16px">
      <van-button
        class="button"
        round
        block
        type="info"
        size="small"
        native-type="submit"
        >登录</van-button
      >
    </div>
  </van-form>
</template>
<script>
import request from "@/util/request";
import JSEncrypt from "jsencrypt";
export default {
  data() {
    return {
      pubKey:
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZ6PSpdV0ORwjzDHRNlpGnkE63LVHmdR0FHwHSUHdVAsO7Gfd3LdAAUN8HzXgrhX+lk7wcR40+/BHkb1Be7mrS80TiadsPEIYRzRXB71btBfy2kLiZGgUK0NEqarAhtzcqeBoD2FHZ8mehbHGL6Fa+IafNjWajY8jQsa+wjzOdwQIDAQAB",
      username: "",
      password: "",
    };
  },
  methods: {
    getEncryPWD(pwd) {
      var jsen = new JSEncrypt();
      jsen.setPublicKey(this.pubKey);
      return jsen.encrypt(pwd.toString());
    },
    onSubmit(values) {
      this.password = this.getEncryPWD(this.password);

      request({
        method: "post",
        url: "/bg/login",
        data: { name: this.username, password: this.password },
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          if (res.data.code === 2000) {
            localStorage.setItem("tokem", res.data.data);
            this.$router.push("wendaxie1&manage2&admin3&home");
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
      //   console.log("hanxuan");
    },
  },
};
</script>

<style lang="less">
.manalogin {
  margin-top: 40%;
}
</style>