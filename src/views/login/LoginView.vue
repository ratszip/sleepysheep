<template>
  <div class="login-container">
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
      left-text="返回"
      right-text="按钮"
      left-arrow
    />

    <van-form class="loginform">
      <van-field
        v-model="username"
        name="用户名"
        placeholder="用户名"
      >
      <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="密码"
      >
      <i slot="left-icon" class="iconfont icon-suoding_o"></i>
      <template #button>
    <van-button size="small" class="sendver" type="default">发送验证码</van-button>
  </template>
      </van-field>
      <div class="loginButton">
        <van-button type="default" class="regB">注册</van-button>
        <van-button type="info" class="loginB">登录</van-button>
      </div>
      
    </van-form>
  </div>
</template>

<script>

</script>

<style lang="less">
  .login-container {
    position: relative;
    height: 100%;
    background-color: burlywood;
    .van-field {
      line-height: 35px;
    }
    .sendver{
      background-color: #ededed;
      height: 46px;
      width: 152px;
      line-height: 46px;
    }
      .icon-shouji{
      font-size: 17px;
      }
      .icon-suoding_o{
        font-size: 20px;
        line-height: -10px;
      }
  }
  .loginform {
    position: absolute;
    width: 100%;
    padding:50px 0;
    top: 20%;
    background-color: deepskyblue;
  }
  .loginButton{
    background-color: pink;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
    .regB,loginB{
      font-size: 10px;
    }
  }
</style>>
