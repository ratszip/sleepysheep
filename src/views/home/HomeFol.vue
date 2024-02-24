<template>
  <div>
    <scroller
      class="container4"
      style="top: 80px"
      :on-refresh="onRefresh"
      :on-infinite="infinite"
      ref="myscroller"
    >
      <div class="cont">
        <div class="item4" v-for="(item, index) in commhome" :key="index">
          <div class="head4">
            <van-image
              v-if="item.commentAvatar"
              round
              width="34px"
              height="34px"
              :src="`${baseurl}/${item.commentAvatar}`"
            />
            <van-image
              v-if="!item.commentAvatar"
              round
              width="34px"
              height="34px"
              :src="`${baseurl}/${item.topicAvatar}`"
            />
            <div class="info4">
              <span class="space4"></span>
              <span class="uname4" v-if="item.commentId">{{
                item.commentUname
              }}</span>
              <span class="uname4" v-if="!item.commentId">{{
                item.topicUname
              }}</span>
              <span class="time4">{{ item.createTime }}</span>
            </div>
            <span @click="onMorel(item)" class="more4">︙</span>
          </div>
          <h1 class="content4" v-if="item.commentId">{{ item.content }}</h1>
          <div
            v-if="item.title && item.tstatus == 1"
            class="topic4"
            @click="gotopic(item)"
          >
            <img
              class="image4"
              v-lazy="`${baseurl}/${item.images[0].path}`"
              alt=""
            />
            <div class="topicInfo4">
              <div class="title4">{{ item.title }}</div>
              <div class="tcontent4">{{ item.tcontent }}</div>
            </div>
          </div>
          <div v-if="item.tstatus == 0 || !item.title" class="unknow">
            <van-icon name="close" />帖子已被删除或隐藏
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
      actions: [{ name: "喜欢" }, { name: "举报" }],
      commhome: [],
      baseurl: this.$store.state.sourceUrl,
      show: false,
      // isLoading: true,
      curComment: null,
      lastTime: null,
    };
  },
  mounted() {
    this.$refs.myscroller.finishInfinite(true);
    this.getComments();
  },
  methods: {
    gotopic(item) {
      this.$router.push(`/topic/${item.topicId}`);
    },
    infinite(done) {
      this.loadmore();
    },
    loadmore() {
      request({
        method: "post",
        url: "/common/home",
        data: {
          size: 10,
          createTime: this.lastTime,
        },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          this.$refs.myscroller.finishInfinite(true);
          if (red.data.code === 9000) {
            this.$pop.open();
          }
          if (res.data.data == undefined) {
            this.$toast({
              message: "没有更多了~",
            });
            return;
          }
          this.commhome.push(...res.data.data);
          let lastEle = this.commhome.slice(-1);
          this.lastTime = lastEle[0].createTime;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    likeComment() {
      if (this.curItem.content === undefined) {
        this.likeTopic(this.curItem);
        return;
      }
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
    onSelect(action, index) {
      if (index === 0) {
        this.likeComment();
      }
    },
    onMorel(item) {
      this.show = true;
      this.curComment = item.commentId;
      this.curItem = item;
    },
    onRefresh() {
      this.lastTime = null;
      this.getComments();
      // this.isLoading = false;
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
        url: "/common/home",
        data: { size: 10 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            Toast.clear();

            if (res.data.code === 9000) {
              this.$pop.open();
            } else {
              this.commhome = res.data.data;
              let lastEle = this.commhome.slice(-1);
              this.lastTime = lastEle[0].createTime;
              this.$refs.myscroller.finishInfinite(true);
              this.$refs.myscroller.finishPullToRefresh();
            }

            // console.log(this.mylist2);
          },
          (err) => {
            console.log(err);
          }
        )
        .finally(() => {
          Toast.clear();
        });
    },
    likeTopic(item) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/topic/like",
          data: { topicId: item.topicId },
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
      }
    },
  },
};
</script>

<style lang="less">
.cont {
  padding-bottom: 70px;
}
.container4 {
  overflow: scroll;
}
.more4 {
  flex: 1;
  text-align: end;
  font-size: 34px;
}
.item4 {
  background-color: white;
  margin: 4px 6px;
  padding: 0px 10px 4px;
  border-radius: 10px;
}
.head4 {
  display: flex;
  padding: 4px 0px;
  .info4 {
    display: flex;
    flex-direction: column;
    margin-left: 6px;
  }
  .space4 {
    height: 8px;
  }
  .time4 {
    font-size: 20px;
    color: gray;
  }
}

.uname4 {
  font-size: 24px;
  flex: 1;
}
.content4 {
  font-size: 26px;
  margin-bottom: 10px;
  margin-top: 8px;
  font-weight: normal;
}
.topic4 {
  display: flex;
  background-color: rgb(247, 248, 250);
  .topicInfo4 {
    flex: 1;
    height: 140px;
    .title4 {
      font-size: 28px;
    }
    .tcontent4 {
      font-size: 22px;
      color: gray;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }

  .image4 {
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