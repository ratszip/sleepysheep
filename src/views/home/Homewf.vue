<template>
  <!-- <van-pull-refresh v-model="isloading" @refresh="onRefresh" v-if="topics"> -->
  <scroller
    style="top: 80px"
    :on-refresh="onRefresh"
    :on-infinite="infinite"
    ref="myscroller"
  >
    <waterfall
      class="contentsug"
      :height="rqh"
      :data="topics"
      :loadDistance="150"
      gutterWidth="4"
    >
      <!-- <div class="sugad">banner</div> -->
      <div class="boxm" ref="box" v-for="(item, index) in topics" :key="index">
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
          />
          {{ item.title }}
        </h1>
        <div class="infos">
          <div class="uinfos">
            <img
              class="tx"
              @click="gouser(item.userId)"
              :src="`${baseurl}/${item.avatar}`"
            />
            <span @click="gouser(item.userId)">&nbsp;{{ item.nickName }}</span>
          </div>
          <div class="tinfos">
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
      isloading: true,
      rqh: null,
      topics: [],
      lastTime: null,
      baseurl: this.$store.state.sourceUrl,
    };
  },
  // computed: {
  //   // itemWidth() {
  //   //   return 160 * 0.5 * (document.documentElement.clientWidth / 375);
  //   // },
  // },
  mounted() {
    this.$refs.myscroller.finishInfinite(true);
    this.getData();
  },
  methods: {
    infinite(done) {
      this.loadmore();
    },
    loadmore() {
      request({
        method: "post",
        url: "/index/sug",
        data: {
          size: 10,
          token: localStorage.token,
          createTime: this.lastTime,
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          this.$refs.myscroller.finishInfinite(true);
          if (res.data.code === 6000) {
            this.$toast({
              message: "访问过于频繁，稍后再试",
            });
            return;
          }
          if (res.data.data == undefined) {
            this.$toast({
              message: "没有更多了~",
            });
            return;
          }
          this.topics.push(...res.data.data);
          // console.log(this.topics);
          let lastEle = this.topics.slice(-1);
          this.lastTime = lastEle[0].createTime;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    onRefresh() {
      this.lastTime = null;
      this.getData();
    },
    gouser(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      }
      this.$router.push(`/user/${id}`);
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
    getData() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/index/sug",

        data: { size: 10, token: localStorage.token },
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then(
          (res) => {
            this.topics = res.data.data;
            let lastEle = this.topics.slice(-1);
            this.lastTime = lastEle[0].createTime;
            this.$refs.myscroller.finishPullToRefresh();
            if (res.data.code === 9000) {
              this.$pop.open();
            }
          },
          (err) => {
            console.log(err);
          }
        )
        .finally(() => {
          Toast.clear();
          this.isloading = false;
        });
    },
  },
};
</script>

<style lang="less">
.contentsug {
  box-sizing: border-box;
  margin-left: 6px;
  margin-right: 6px;
  padding-bottom: 70px;
}
.sugad {
  width: 100%;
  height: 300px;
  background-color: bisque;
}
// .space {
//   height: 200px;
// }
.boxm {
  // width: 100%;
  margin-top: 6px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: white;
}
.image {
  width: 100%;
  max-height: 460px;
  min-height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
.infos {
  display: flex;
  width: 94%;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  padding-bottom: 10px;
  font-size: 26px;
  line-height: 50px;
  // flex-direction: column;
  justify-content: space-between;
  .tinfos {
    vertical-align: top;
    margin-right: 20px;
  }
  .uinfos {
    vertical-align: middle;
    margin-top: 6px;
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