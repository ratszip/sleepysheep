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
        left-icon="shield-o"
      >
      <template #button>
    <van-button size="small" round class="sendver" type="default">发送验证码</van-button>
  </template>
      </van-field>
      <div class="loginButton">
        <van-button type="default" round class="regB">注册</van-button>
        <van-button type="info" round class="loginB">登录</van-button>
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
    background-color: #f5f7f9;
    
    .sendver{
      background-color: #ededed;
      height: 46px;
      width: 156px;
      line-height: 46px;
      font-size: 22px;
      
    }
    
      .icon-shouji{
      font-size: 37px;
      
      }
    
  }
  .loginform {
    position: absolute;
    width: 100%;
  }
  .loginButton{
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
    .regB,loginB{
      font-size: 10px;
    }
  }
</style>>
