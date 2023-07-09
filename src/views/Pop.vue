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
    <van-field class="email" left-icon="contact" placeholder="Email" />
    <div class="space"></div>
    <van-field
      class="pwd"
      left-icon="shield-o"
      placeholder="Password"
      type="password"
    />
    <div class="space"></div>
    <div class="readfor">
      <van-checkbox class="check" shape="round" icon-size="15px"
        >请勾选 <a href="#">用户协议</a>
      </van-checkbox>
      <a href="#">忘记密码?</a>
    </div>
    <van-button class="login" type="info" block round>登录</van-button>
    <div class="new">没有账号？ <a href="/register">注册新的账号</a></div>
    <van-icon class="close" name="cross" @click="close()" />
  </van-dialog>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      tx: false,
    };
  },
  methods: {
    // po() {
    //   this.show = true;
    // },
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