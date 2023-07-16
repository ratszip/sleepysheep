<template>
  <div class="home_follow">
    <div class="f_cell">
      <div class="finfo">
        <img class="tx" src="http://114.55.88.242:8080/images/avatar_m_c.png" />
        <span>用户123123</span>
        回答了
        <div>dsaf dsfaas</div>
      </div>
      <div class="htopic">qrj</div>
    </div>
  </div>
</template>
<style lang="less">
.f_cell {
  margin: 6px;
  border-radius: 3%;
  overflow: hidden;
  background-color: red;
  .htopic {
    border-radius: 3%;
    height: 200px;
    margin: 6px 10px;
    background-color: lightblue;
  }
}
.tx {
  vertical-align: top;
  width: 60px;
  height: 60px;
}
.finfo {
  background-color: pink;
  font-size: 24px;
  line-height: 70px;
  padding-left: 10px;
  padding-right: 10px;
  p {
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;
  }
}
</style>