<template>
  <div class="login-container">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
    />

    <van-form class="loginform">
      <van-field
      left-icon="\eb50"
        v-model="username"
        name="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
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
