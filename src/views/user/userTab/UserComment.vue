<template>
  <div>
    <scroller
      style="top: 50px"
      :on-refresh="onRefresh"
      :on-infinite="infinite"
      ref="myscroller3"
      class="container3"
    >
      <div class="cont">
        <div class="item3" v-for="(item, index) in commlist" :key="index">
          <div class="head3">
            <van-image
              round
              width="34px"
              height="34px"
              :src="`${baseurl}/${item.avatar}`"
            />
            <div class="info3">
              <span class="space3"></span>
              <span class="uname3">{{ item.nickName }}</span>
              <span class="time3">{{ item.createTime }}</span>
            </div>
            <span class="more3" @click="onMore(item, index)">︙</span>
          </div>
          <h1 class="content3">{{ item.content }}</h1>
          <div v-if="item.title" class="topic3" @click="gotopic(item)">
            <img
              class="image3"
              v-lazy="`${baseurl}/${item.images[0].path}`"
              alt=""
            />
            <span class="title3">{{ item.title }}</span>
          </div>
          <div v-if="!item.title" class="unknow">
            <van-icon name="close" />帖子已被删除
          </div>
        </div>
      </div>
    </scroller>
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      :actions="actions"
      close-on-click-action
      @select="onSelect"
    >
    </van-action-sheet>
  </div>
</template>
<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      actions: [{ name: "点赞" }, { name: "删除" }, { name: "举报" }],
      commlist: [],
      show: false,
      userId: null,
      baseurl: this.$store.state.sourceUrl,
      curComment: null,
      curIndex: null,
      lastTime: null,
    };
  },
  mounted() {
    this.$refs.myscroller3.finishInfinite(true);
    this.getComments();
  },
  methods: {
    gotopic(item) {
      this.$router.push(`/topic/${item.topicId}`);
    },
    infinite(done) {
      this.loadmore();
    },
    onRefresh() {
      this.lastTime = null;
      this.getComments();
    },
    loadmore() {
      this.userId = this.$route.params.uid;
      request({
        method: "post",
        url: "/user/comment",
        data: { comm: this.userId, size: 10, createTime: this.lastTime },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          this.$refs.myscroller3.finishInfinite(true);
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
          this.commlist.push(...res.data.data);
          let lastEle = this.commlist.slice(-1);
          this.lastTime = lastEle[0].createTime;
        },
        (err) => {
          console.log(err);
        }
      );
    },

    onSelect(action, index) {
      if (index === 0) {
        this.likeComment();
      } else if (index === 1) {
        Dialog.confirm({
          message: "确认删除?",
        })
          .then(() => {
            this.deleteComment();
          })
          .catch(() => {
            // on cancel
          });
      } else if (index === 2) {
        Dialog.confirm({
          message: "确认举报？",
        })
          .then(() => {
            this.reportComment();
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    reportComment() {
      request({
        method: "post",
        url: "/index/report",
        data: { reporterId: this.curComment, type: 1 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.code === 9000) {
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
    },
    onMore(item, index) {
      this.show = true;
      this.curComment = item.id;
      this.curIndex = index;
    },
    deleteComment() {
      request({
        method: "post",
        url: "/comment/deleteComment",
        data: { commentId: this.curComment },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.msg.includes("登录")) {
            this.$pop.open();
          }
          if (res.data.code === 2000) {
            this.commlist.splice(this.curIndex, 1);
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
    },
    likeComment() {
      request({
        method: "post",
        url: "/comment/like",
        data: { commentId: this.curComment },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.msg.includes("登录")) {
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
    },
    getComments() {
      this.userId = this.$route.params.uid;
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/user/comment",
        data: { userId: this.userId, size: 10 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            Toast.clear();
            this.commlist = res.data.data;
            let lastEle = this.commlist.slice(-1);
            this.lastTime = lastEle[0].createTime;
            this.$refs.myscroller3.finishPullToRefresh();
            if (res.data.msg.includes("登录")) {
              this.$pop.open();
            }
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
};
</script>

<style lang="less">
.cont {
  padding-bottom: 70px;
}
.cell {
  text-align: center;
  height: 100px;
}
.pull-to-refresh-layer {
  height: 0 !important;
  margin-top: 10px !important;
  visibility: hidden;
}
.more3 {
  flex: 1;
  text-align: end;
  font-size: 34px;
}
.container3 {
  box-sizing: border-box;
  margin-bottom: 100px;
}
.item3 {
  background-color: white;
  margin: 4px 6px;
  padding: 0px 10px 4px;
  border-radius: 10px;
}
.head3 {
  display: flex;
  padding: 4px 0px;
  .info3 {
    display: flex;
    flex-direction: column;
    margin-left: 6px;
  }
  .space3 {
    height: 8px;
  }
  .time3 {
    font-size: 20px;
    color: gray;
  }
}

.uname3 {
  font-size: 24px;
  flex: 1;
}
.content3 {
  font-size: 26px;
  margin-bottom: 10px;
  margin-top: 8px;
  font-weight: normal;
}
.topic3 {
  display: flex;
  background-color: rgb(247, 248, 250);
  align-items: center;
  .title3 {
    margin: 0 10px;
    font-size: 28px;
  }
  .image3 {
    background-color: white;
    border: 2px solid rgb(247, 248, 250);
    width: 200px;
    max-height: 200px;
    min-height: 140px;
    overflow: hidden;
    object-fit: contain;
  }
}
.unknow {
  font-size: 30px;
  line-height: 60px;
  text-align: center;
  height: 60px;
  background-color: rgb(247, 248, 250);
}
</style>