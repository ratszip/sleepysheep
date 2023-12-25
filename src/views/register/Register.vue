<template>
  <div class="login">
    <!-- <div class="navbar">
      <van-icon
        class="back"
        @click="onClickBack"
        name="arrow-left"
        size="20px"
        color="gray"
      />
      <a>帮助</a>
    </div> -->
    <van-nav-bar
      left-text="返回"
      right-text="帮助"
      left-arrow
      @click-left="onClickBack"
    />
    <div class="login_contain">
      <div class="header">
        <h4>邮箱注册</h4>
      </div>
      <van-field
        class="remail"
        v-model="email"
        left-icon="contact"
        placeholder="请输入邮箱"
        required
      />
      <van-field
        class="rpwd"
        v-model="passwd"
        left-icon="shield-o"
        placeholder="请输入密码"
        type="password"
        required
      />
      <van-field
        class="verf"
        v-model="code"
        center
        clearable
        placeholder="请输入验证码"
        required
      >
        <template #button>
          <van-button size="small" @click="sendvery" round v-show="!sended"
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
      <van-button class="reg" type="info" block round @click="regLogin"
        >注册并登录</van-button
      >
      <div class="read">
        <van-checkbox
          class="agree"
          shape="round"
          icon-size="15px"
          v-model="checked"
          >我已阅读并同意<a href="#">《用户协议》</a
          ><a href="#">《隐私政策》</a>
        </van-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
import JSEncrypt from "jsencrypt";
import request from "@/util/request";
export default {
  data() {
    return {
      checked: true,
      show: false,
      tx: false,
      btable: false,
      sended: false,
      email: "",
      passwd: "",
      code: "",
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
        data: { key: this.email, type: 1 },
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
          this.$toast({
            message: res.data.msg,
          });
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
    regLogin() {
      if (this.email == "" || this.passwd === "") {
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
      var passwd = this.getEncryPWD(this.passwd);
      console.log(passwd + "---");
      request({
        method: "post",
        url: "/user/register",
        data: {
          email: this.email,
          verifyCode: this.code,
          passwd: passwd,
        },
      }).then(
        (res) => {
          if (res.data.code === 9000) {
            this.$pop.open();
          } else if (res.data.code === 2000) {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("uid", res.data.data.uid);
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