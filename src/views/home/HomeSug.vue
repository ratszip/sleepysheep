<template>
  <div class="home_sug">
    <navbar></navbar>

    <ul class="content">
      <li class="topic">
        <div class="image">
          <img src="../../assets/595860.png" alt="" />
        </div>
        <h3 class="title">123</h3>
        <div class="uinfo">
          <img src="http://114.55.88.242:8080/images/avatar_m_c.png" />
          <span>lucy</span>
          <van-icon name="like" size="16" color="red" />
          <van-icon name="checked" color="green" />
        </div>
      </li>
      <li class="topic">
        <div class="image">
          <img src="../../assets/595860.png" alt="" />
        </div>
        <h3 class="title">123</h3>
        <div class="uinfo">
          <img src="http://114.55.88.242:8080/images/avatar_m_c.png" />
          <span>lucy</span>
          <van-icon name="like" size="16" color="red" />
          <van-icon name="checked" color="green" />
        </div>
      </li>
      <li class="topic">
        <div class="image">
          <img src="../../assets/595860.png" alt="" />
        </div>
        <h3 class="title">123</h3>
        <div class="uinfo">
          <img src="http://114.55.88.242:8080/images/avatar_m_c.png" />
          <span>lucy</span>
          <van-icon name="like" size="16" color="red" />
          <van-icon name="checked" color="green" />
        </div>
      </li>
      <li class="topic">
        <div class="image">
          <img src="../../assets/595860.png" alt="" />
        </div>
        <h3 class="title">123</h3>
        <div class="uinfo">
          <img src="http://114.55.88.242:8080/images/avatar_m_c.png" />
          <span>lucy</span>
          <van-icon name="like" size="16" color="red" />
          <van-icon name="checked" color="green" />
        </div>
      </li>
      <li class="topic">
        <div class="image">
          <img src="../../assets/595860.png" alt="" />
        </div>
        <h3 class="title">123456789012345678901321</h3>
        <div class="uinfo">
          <img src="http://114.55.88.242:8080/images/avatar_m_c.png" />
          <span>lucy</span>
          <van-icon name="like" size="16" color="red" />
          <van-icon name="checked" color="green" />
        </div>
      </li>
      <li class="topic">
        <div class="image">
          <img src="../../assets/595860.png" alt="" />
        </div>
        <h3 class="title">123</h3>
        <div class="uinfo">
          <img src="http://114.55.88.242:8080/images/avatar_m_c.png" />
          <span>lucy</span>
          <van-icon name="like" size="16" color="red" />
          <van-icon name="checked" color="green" />
        </div>
      </li>
    </ul>
    <bottombar></bottombar>
  </div>
</template>
<script>
import navbar from "./HomeTag.vue";
import bottombar from "../BottomBar.vue";
export default {
  components: {
    navbar,
    bottombar,
  },
};
</script>

<style lang="less">
.home_sug {
  background-color: pink;
}
.content {
  box-sizing: border-box;
  display: inline-block;
  list-style: none;
  background-color: lightblue;

  // padding: 10px 10px 10px 0;

  .topic {
    float: left;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 8px;
    margin-right: 7px;
    border-radius: 3%;
    width: 360px;
    height: 510px;
    background-color: white;
    .uinfo {
      height: 50px;
      margin-left: 8px;
      font-size: 26px;
      line-height: 50px;
      img {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
    }
    .title {
      font-size: 30px;
      height: 56px;
      font-weight: 550;
      line-height: 50px;
      margin: 3px 7px;
      overflow: hidden;
      text-overflow: ellipsis;
      // vertical-align: top;
    }
    .image {
      height: 400px;
      // background-color: black;
      img {
        border-top-right-radius: 3%;
        border-top-left-radius: 3%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        // position: relative;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%, -50%);
        // max-width: 100%;
        // max-height: 100%;
      }
    }
  }
}
</style>