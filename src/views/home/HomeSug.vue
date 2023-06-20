<template>
  <div class="home_sug">
    <ul class="content">
      <li class="topic">
        <div class="image">
          <img src="../../assets/595860.png" alt="" />
        </div>
        <span class="title">123</span>
        <div class="uinfo">
          <van-image
            round
            width="20px"
            height="20px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />123
        </div>
      </li>
      <!-- <li class="topic"><img src="../../assets/595860.png" alt="" /></li>
      <li class="topic"><img src="../../assets/595860.png" alt="" /></li> -->
    </ul>
  </div>
</template>
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
      font-size: 28px;
      line-height: 50px;
    }
    .title {
      display: block;
      font-size: 30px;
      height: 50px;
      font-weight: 550;
      line-height: 50px;
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