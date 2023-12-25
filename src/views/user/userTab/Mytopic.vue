<template>
  <scroller
    style="top: 80px"
    :on-refresh="onRefresh"
    :on-infinite="infinite"
    ref="myscroller"
    class="contopic"
  >
    <waterfall class="contentsug" :data="mylist">
      <!-- <div class="sugad">广告位</div> -->
      <div class="box" ref="box" v-for="(item, index) in mylist" :key="index">
        <img
          @click="t_click(item.id)"
          class="image"
          :lazy-src="`${baseurl}/${item.images[0].path}`"
          alt=""
        />
        <h1 @click="t_click(item.id)" class="title">
          <van-icon
            size="13"
            color="green"
            name="checked"
            style="vertical-align: -10%"
            v-if="item.isSolved"
          />
          <van-icon
            size="13"
            color="red"
            name="question-o"
            style="vertical-align: -10%"
            v-else-if="!item.isSolved"
          />{{ item.title }}
        </h1>
        <div class="infomy">
          <div class="uinfomy" @click="t_click(item.id)">
            <img class="tx" :src="`${baseurl}/${item.avatar}`" />
            <span>&nbsp;{{ item.nickName }}</span>
          </div>
          <div class="tinfomy">
            <van-icon
              style="vertical-align: -10%"
              v-if="!item.like"
              name="like-o"
              size="16"
              @click="like(item)"
            />
            <van-icon
              style="vertical-align: -10%"
              v-if="item.like"
              name="like"
              color="red"
              @click="unlike(item)"
              size="16"
            />
            {{ item.likeCount }}
          </div>
        </div>
      </div>
    </waterfall>
  </scroller>
</template>

<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      mylist: "",
      baseurl: this.$store.state.sourceUrl,
      userId: null,
      lastTime: null,
    };
  },
  methods: {
    infinite(done) {
      this.loadmore();
    },
    onRefresh() {
      this.lastTime = null;
      this.getTopic();
    },
    loadmore() {
      this.userId = this.$route.params.uid;
      request({
        method: "post",
        url: "/user/topic",
        data: {
          userId: this.userId,
          createTime: this.lastTime,
          size: 8,
        },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            this.$refs.myscroller.finishInfinite(true);
            if (res.data.data == undefined) {
              this.$toast({
                message: "没有更多了~",
              });
              return;
            }
            if (res.data.code === 6000) {
              this.$toast({
                message: "访问过于频繁，稍后再试",
              });
              return;
            }
            this.mylist.push(...res.data.data);
            // console.log(this.mylist);
            let lastEle = this.mylist.slice(-1);
            this.lastTime = lastEle[0].createTime;

            // console.log(this.mylist);
          },
          (err) => {
            console.log(err);
          }
        )
        .finally(() => {
          Toast.clear();
        });
    },
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
            if (res.data.code === 2000 || res.data.code === 3100) {
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
            if (res.data.code === 2000 || res.data.code === 3100) {
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
    getTopic() {
      this.userId = this.$route.params.uid;
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/user/topic",
        data: {
          userId: this.userId,
          size: 8,
        },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            this.mylist = res.data.data;
            let lastEle = this.mylist.slice(-1);
            this.lastTime = lastEle[0].createTime;
            this.$refs.myscroller.finishPullToRefresh();
            if (res.data.msg.includes("登录")) {
              this.$pop.open();
            }

            // console.log(this.mylist);
          },
          (err) => {
            console.log(err);
          }
        )
        .finally(() => {
          Toast.clear();
        });
    },
  },

  mounted() {
    this.$refs.myscroller.finishInfinite(true);
    this.getTopic();
  },
};
</script>

<style lang="less">
.contentsug {
  box-sizing: border-box;
  padding-bottom: 70px;
}
.pull-to-refresh-layer {
  height: 0 !important;
  margin-top: 10px !important;
}
// .contopic {
//   margin-top: 80px;
//   box-sizing: border-box;
//   margin-bottom: 20px;
// }
.space {
  height: 200px;
}
.box {
  // width: 50%;
  width: 382px !important;
  margin-top: 6px;
  background-color: white;
}
.image {
  width: 100%;
  max-height: 480px;
  min-height: 200px;
  overflow: hidden;
  object-fit: cover;
}

.title {
  font-size: small;
  width: 350px;
  // height: 70px;
  line-height: 36px;
  margin: 3px 7px 5px 7px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.solv {
  margin-top: 6px;
}
.infomy {
  display: flex;
  width: 96%;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  padding-bottom: 10px;
  font-size: 26px;
  line-height: 50px;
  // flex-direction: column;
  justify-content: space-between;
  .tinfomy {
    vertical-align: top;
    margin-right: 20px;
  }
  .uinfomy {
    vertical-align: baseline;
    .tx {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      // vertical-align: text-bottom;
    }
    span {
      // flex: 1;
      font-size: 24px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 160px;
      line-height: 24px;
      display: inline-block;
      white-space: nowrap;
    }
  }
}
</style>