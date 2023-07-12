<template>
  <div class="content">
    <div class="topic" v-for="(item, index) in suglist.data">
      <div class="image">
        <img :src="baseurl + `${item.images[0]}`" alt="" />
      </div>
      <h3 class="title">{{ item.title }}</h3>
      <div class="info">
        <div class="uinfo">
          <img src="http://114.55.88.242:8080/images/avatar_m_c.png" />
          <span>{{ item.userName }}</span>
        </div>
        <div class="tinfo">
          <van-icon
            v-if="item.isSolved == true"
            class="solve"
            name="checked"
            color="green"
          />
          <van-icon v-else-if="item.isSolved == false" name="question-o" />
          <van-icon name="like-o" size="16" />
          <span>{{ item.likeCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/util/request";

export default {
  data() {
    return {
      suglist: "",
      baseurl: "http://114.55.88.242:8080/",
    };
  },
  mounted() {
    request({ url: "/index/sug" }).then(
      (res) => {
        this.suglist = res.data;
        // console.log(res.data.data[0].images[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>

<style lang="less">
.content {
  box-sizing: border-box;
  display: inline-block;
  list-style: none;
  background-color: rgb(247, 248, 250);
  // column-count: 2;
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
    // max-height: 510px;
    height: 500px;
    background-color: white;
    .info {
      display: flex;
      height: 50px;
      margin-left: 10px;
      margin-right: 10px;
      font-size: 26px;
      line-height: 50px;
      justify-content: space-between;

      img {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .uinfo {
        span {
          text-overflow: ellipsis;
          overflow: hidden;
          width: 140px;
          display: inline-block;
          white-space: nowrap;
        }
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
      // max-height: 300px;
      height: 380px;
      // background-color: black;
      img {
        border-top-right-radius: 3%;
        border-top-left-radius: 3%;
        width: 100%;
        height: 100%;
        // max-height: 300px;
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