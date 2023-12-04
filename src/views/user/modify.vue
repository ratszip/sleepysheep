<template>
  <div class="login">
    <van-nav-bar
      left-text="返回"
      right-text="帮助"
      left-arrow
      @click-left="onClickBack"
    />
    <div class="login_contain">
      <div class="header">
        <h4>修改密码</h4>
      </div>
      <van-field
        class="remail"
        left-icon="contact"
        v-model="email"
        :rules="[{ pattern, message: '输入正确的邮箱格式' }]"
        required
        placeholder="请输入邮箱"
      />
      <van-field
        class="rpwd"
        left-icon="shield-o"
        placeholder="请输入密码"
        v-model="pwd"
        type="password"
        maxlength="20"
        required
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        class="verf"
        v-model="code"
        center
        clearable
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button
            size="small"
            round
            @click="sendvery"
            :disabled="btable"
            v-show="!sended"
            >发送验证码</van-button
          >
          <van-count-down
            v-show="sended"
            :time="60000"
            :auto-start="false"
            format="ss 秒"
            ref="countDown"
            @finish="finish"
          />
        </template>
      </van-field>
      <van-button class="reg" type="info" @click="subpwd" block round
        >提交</van-button
      >
    </div>
  </div>
</template>
  <script>
import JSEncrypt from "jsencrypt";
import request from "@/util/request";
export default {
  data() {
    return {
      show: false,
      tx: false,
      checked: false,
      btable: false,
      sended: false,
      pwd: "",
      code: "",
      email: "",
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/,
      pubKey:
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZ6PSpdV0ORwjzDHRNlpGnkE63LVHmdR0FHwHSUHdVAsO7Gfd3LdAAUN8HzXgrhX+lk7wcR40+/BHkb1Be7mrS80TiadsPEIYRzRXB71btBfy2kLiZGgUK0NEqarAhtzcqeBoD2FHZ8mehbHGL6Fa+IafNjWajY8jQsa+wjzOdwQIDAQAB",
    };
  },
  methods: {
    onClickBack() {
      this.$router.back();
    },

    finish() {
      this.btable = false;
      this.sended = false;
      this.$refs.countDown.reset();
    },
    sendvery() {
      if (this.email == "") {
        this.$toast({
          message: "请先输入邮箱",
        });
        return;
      }

      request({
        method: "post",
        url: "/info/verify",
        data: { key: this.email, type: 2 },
      }).then(
        (res) => {
          // res.data.token;
          if (res.data.code === 2000) {
            this.$toast({
              message: "发送成功",
            });
            this.btable = true;
            this.sended = true;
            this.$refs.countDown.start();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getEncryPWD(pwd) {
      var jsen = new JSEncrypt();
      jsen.setPublicKey(this.pubKey);
      return jsen.encrypt(pwd.toString());
    },
    subpwd() {
      if (this.email == "" || this.pwd === "") {
        this.$toast({
          message: "请先输入邮箱密码",
        });
        return;
      }
      if (this.code.trim().length != 6) {
        this.$toast({
          message: "请输入正确的验证码",
        });
        return;
      }
      var passwd = this.getEncryPWD(this.pwd);
      // console.log(passwd + "---");
      request({
        method: "post",
        url: "/user/modifyPwd",
        data: {
          email: this.email,
          code: this.code,
          passwd: passwd,
        },
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
          }
          this.$toast({
            message: res.data.msg,
          });
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
.login {
  height: 100%;
  background-color: white;
  .navbar {
    display: flex;
    justify-content: space-between;
    margin: 20px;

    a {
      font-size: 28px;
      color: gray;
    }
    line-height: 40px;
  }
  .login_contain {
    .remail,
    .rpwd,
    .verf {
      margin: 0 auto;
      width: 80%;
      .van-cell__value {
        display: flex;
        .van-field__body {
          flex: 1;
          margin: 0 20px;
        }
      }
    }
    .read {
      // padding: 0 60px;
      font-size: 18px;
      margin: 20px auto;
      display: flex;
      justify-content: center;
    }
    .reg {
      width: 70%;
      height: 70px;
      margin: 30px auto;
    }
    .header {
      text-align: center;
      font-size: 35px;
      h4 {
        margin: 20px;
        font-weight: 600;
      }
    }
  }
}
</style>