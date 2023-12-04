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
      @click-right="onClickRight"
    />
    <div class="login_contain">
      <div class="header">
        <h4>邮箱注册</h4>
      </div>
      <van-field class="remail" left-icon="contact" placeholder="请输入邮箱" />
      <van-field
        class="rpwd"
        left-icon="shield-o"
        placeholder="请输入密码"
        type="password"
      />
      <van-field class="verf" center clearable placeholder="请输入验证码">
        <template #button>
          <van-button size="small" round>发送验证码</van-button>
        </template>
      </van-field>
      <van-button class="reg" type="info" disabled block round
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
export default {
  data() {
    return {
      show: false,
      tx: false,
      checked: false,
    };
  },
  methods: {
    onClickBack() {
      this.$router.back();
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