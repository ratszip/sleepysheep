<template>
  <scroller
    style="top: 80px"
    :on-refresh="onRefresh"
    :on-infinite="infinite"
    ref="myscroller2"
  >
    <waterfall class="contentsug2" gutterWidth="6" :data="mylist2">
      <div
        class="box2"
        ref="box2"
        v-for="(item, index) in mylist2"
        :key="index"
      >
        <img
          @click="t_click(item.id)"
          class="image2"
          :lazy-src="`${baseurl}/${item.images[0].path}`"
          alt=""
        />
        <h1 @click="t_click(item.id)" class="title2">
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
        <div class="info2">
          <div class="uinfo2" @click="t_click(item.id)">
            <img class="tx" :src="`${baseurl}/${item.avatar}`" />
            <span>&nbsp;{{ item.nickName }}</span>
          </div>
          <div class="tinfo2">
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
              @click="unlike(item, index)"
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
      userId: null,
      mylist2: "",
      lastTime: null,
      baseurl: this.$store.state.sourceUrl,
    };
  },
  computed: {
    itemWidth() {
      return 160 * 0.5 * (document.documentElement.clientWidth / 375);
    },
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
        url: "/user/collect",
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
            this.$refs.myscroller2.finishInfinite(true);
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
            this.mylist2.push(...res.data.data);
            let lastEle = this.mylist2.slice(-1);
            this.lastTime = lastEle[0].createTime;
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
    unlike(item, index) {
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
        url: "/user/collect",
        data: { userId: this.userId, size: 8 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          Toast.clear();
          this.mylist2 = res.data.data;
          let lastEle = this.mylist2.slice(-1);
          this.lastTime = lastEle[0].createTime;
          this.$refs.myscroller2.finishPullToRefresh();
          if (res.data.msg.includes("登录")) {
            this.$pop.open();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },

  mounted() {
    this.$refs.myscroller2.finishInfinite(true);
    this.getTopic();
  },
};
</script>

<style lang="less">
.contentsug2 {
  box-sizing: border-box;
  margin-left: 6px;
  margin-right: 6px;
  padding-bottom: 70px;
}
.pull-to-refresh-layer {
  height: 0 !important;
  margin-top: 10px !important;
}
.box2 {
  // width: 380px !important;
  margin-top: 6px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: white;
}
.image2 {
  width: 100%;
  max-height: 460px;
  min-height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  object-fit: cover;
}

.title2 {
  font-size: small;
  width: 350px;
  // height: 70px;
  line-height: 36px;
  margin: 3px 7px 5px 7px;
  overflow: hidden;
  display: -webkit-box2;
  -webkit-box2-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.solv {
  margin-top: 6px;
}
.info2 {
  display: flex;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  padding-bottom: 10px;
  font-size: 26px;
  line-height: 50px;
  justify-content: space-between;
  .uinfo2 {
    vertical-align: baseline;
    .tx {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      // vertical-align: text-bottom;
    }
    span {
      font-size: 24px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 160px;
      line-height: 24px;
      display: inline-block;
      white-space: nowrap;
    }
    .tinfo2 {
      vertical-align: top;
      margin-right: 40px;
      // padding-right: 40px;
    }
  }
}
</style>