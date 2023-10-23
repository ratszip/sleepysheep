<template>
  <div class="content">
    <div class="topic" v-for="(item, index) in suglist.data" :key="index">
      <div class="image" @click="t_click(item.id)">
        <img v-lazy="`${baseurl}/${item.images[0].path}`" alt="" />
      </div>
      <div class="titleall">
        <h3 class="title">{{ item.title }}</h3>
      </div>

      <div class="info">
        <div class="uinfo">
          <img :src="`${baseurl}/images/${item.avatar}.png`" />
          <span>&nbsp;{{ item.nickName }}</span>
        </div>
        <div class="tinfo">
          <van-icon
            style="vertical-align: -10%"
            v-if="!item.like"
            name="like-o"
            size="18"
            @click="like(item)"
          />
          <van-icon
            style="vertical-align: -10%"
            v-if="item.like"
            name="like"
            color="red"
            @click="unlike(item)"
            size="18"
          />
          {{ item.likeCount }}
        </div>
      </div>
    </div>
    <!-- <div class="nomore">暂无更多</div> -->
  </div>
</template>

<script>
import request from "@/util/request";

export default {
  data() {
    return {
      suglist: "",
      baseurl: this.$store.state.sBaseUrl,
    };
  },
  methods: {
    like(item) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/topic/like",
          data: { topicId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.like = true;
              item.likeCount++;
            } else if (res.data.code === 9000) {
              this.$pop.open();
            } else {
              this.$toast({
                message: res.data.msg,
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    unlike(item) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/topic/unlike",
          data: { topicId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.like = false;
              item.likeCount--;
            } else if (res.data.code === 9000) {
              this.$pop.open();
            } else {
              this.$toast({
                message: res.data.msg,
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    t_click(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      }
      this.$router.push(`/topic/${id}`);
      // console.log(id);
    },
  },
  mounted() {
    request({
      method: "post",
      url: "/index/sug",
      data: { token: localStorage.token },
      headers: {
        "content-type": "multipart/form-data",
      },
    }).then(
      (res) => {
        this.suglist = res.data;
        if (res.data.msg.includes("登录")) {
          this.$pop.open();
        }

        // console.log(this.suglist.data[0].images[0].path);
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
  width: 100%;
  list-style: none;
  background-color: rgb(247, 248, 250);

  .nomore {
    text-align: center;
    font-size: 26px;
    color: lightgray;
    padding-bottom: 16%;
  }
  .topic {
    float: left;
    box-sizing: border-box;
    margin-bottom: 2px;
    margin-top: 10px;
    margin-left: 8px;
    margin-right: 7px;
    border-radius: 3%;
    width: 360px;
    // max-height: 510px;
    height: 540px;
    background-color: white;
    // .titleall {
    //   display: flex;
    //   justify-content: space-between;
    //   margin-right: 8px;
    // }
    .solv {
      margin-top: 6px;
    }
    .info {
      display: flex;
      height: 50px;
      margin-left: 10px;
      margin-right: 10px;
      font-size: 26px;
      line-height: 50px;
      justify-content: space-between;

      .uinfo {
        vertical-align: middle;
        img {
          width: 30px;
          height: 30px;
        }
        span {
          font-size: 20px;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 160px;
          line-height: 28px;
          display: inline-block;
          white-space: nowrap;
        }
      }
      .tinfo {
        vertical-align: auto;
      }
    }
    .title {
      font-size: small;
      height: 50px;
      line-height: 50px;
      margin: 3px 7px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    }
    .image {
      // max-height: 300px;
      height: 420px;
      // background-color: black;
      img {
        border-top-right-radius: 3%;
        border-top-left-radius: 3%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>