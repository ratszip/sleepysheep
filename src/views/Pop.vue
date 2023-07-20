<template>
  <van-dialog
    ref="dialogref"
    class="pops"
    v-model="show"
    closeOnClickOverlay
    :showCancelButton="tx"
    :showConfirmButton="tx"
  >
    <div class="header">
      <h3>welcome to sswd</h3>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        class="email"
        left-icon="contact"
        placeholder="Email"
        v-model="email"
        :rules="[{ pattern, message: '输入正确的邮箱格式' }]"
        required
      />
      <div class="space"></div>
      <van-field
        class="pwd"
        left-icon="shield-o"
        placeholder="Password"
        type="password"
        v-model="password"
        maxlength="20"
        required
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="space"></div>
      <div class="readfor">
        <van-checkbox
          class="check"
          shape="round"
          v-model="checked"
          icon-size="15px"
          >请勾选 <a href="#">用户协议</a>
        </van-checkbox>
        <a href="#">忘记密码?</a>
      </div>
      <van-button class="login" type="info" block round native-type="submit"
        >登录</van-button
      >
    </van-form>

    <div class="new">没有账号？ <a href="/register">注册新的账号</a></div>
    <van-icon class="close" name="cross" @click="close()" />
  </van-dialog>
</template>
<script>
export default {
  data() {
    return {
      checked: false,
      show: false,
      tx: false,
      email: "",
      password: "",
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/,
    };
  },
  methods: {
    // po() {
    //   this.show = true;
    // },
    onSubmit() {
      if (!this.checked) {
        this.$toast({
          message: "请勾选用户协议",
        });
      }
    },
    close() {
      this.$refs.dialogref.close();
    },
    open() {
      this.show = true;
    },
  },
};
</script>
<style lang="less">
.pops {
  width: 700px !important;
  top: 45%;
  height: 650px !important;
  transform: translate(-50%, -50%);
  overflow: visible !important;
  .close {
    position: absolute;
    width: 50px;
    height: 40px;
    top: -8px;
    right: -8px;
    border-radius: 35%;
    text-align: center;
    background-color: white;
    box-shadow: -2px 2px 1.4px gray;
    padding-top: 6px;
  }
  .header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 10px 16px;
    size: 30px;
  }
  .email,
  .pwd {
    margin: 0 auto;
    width: 90%;

    background-color: rgb(245, 247, 249);
    .van-cell__value {
      display: flex;
      .van-field__body {
        flex: 1;
        margin: 0 20px;
      }
    }
  }
  .space {
    height: 40px;
  }
  .login {
    background-color: rgb(48, 93, 255);
    margin: 0 auto;
    width: 90%;
  }
  .readfor {
    padding: 0 40px;
    font-size: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .new {
    padding: 0 40px;
    font-size: 20px;
    margin-top: 20px;
    text-align: center;
  }
}
</style>