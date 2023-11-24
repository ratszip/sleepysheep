<template>
  <div>
    <scroller
      style="top: 50px"
      :on-refresh="onRefresh"
      :on-infinite="infinite"
      ref="myscroller"
      class="container4"
    >
      <div class="item4" v-for="(item, index) in commlike" :key="index">
        <div class="head4">
          <van-image
            round
            width="34px"
            height="34px"
            :src="`${baseurl}/images/${item.avatar}.png`"
          />
          <div class="info4">
            <span class="space4"></span>
            <span class="uname4">{{ item.nickName }}</span>
            <span class="time4">{{ item.createTime }}</span>
          </div>
          <span @click="onMorel(item, index)" class="more4">︙</span>
        </div>
        <h1 class="content4">{{ item.content }}</h1>
        <div v-if="item.title" class="topic4" @click="gotopic(item)">
          <img
            class="image4"
            v-lazy="`${baseurl}/${item.images[0].path}`"
            alt=""
          />
          <span class="title4">{{ item.title }}</span>
        </div>
        <div v-if="!item.title" class="unknow">
          <van-icon name="close" />帖子已被删除
        </div>
      </div>
    </scroller>
    <van-action-sheet
      :actions="actions"
      v-model="show"
      cancel-text="取消"
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
      actions: [{ name: "取消点赞" }, { name: "举报" }],
      commlike: [],
      userId: null,
      baseurl: this.$store.state.sBaseUrl,
      show: false,
      curComment: null,
      curIndex: null,
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
    onRefresh() {
      this.lastTime = null;
      this.getComments();
    },
    loadmore() {
      this.userId = this.$route.params.uid;
      request({
        method: "post",
        url: "/user/like",
        data: { userId: this.userId, size: 4, createTime: this.lastTime },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
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
          this.commlike.push(...res.data.data);
          let lastEle = this.commlike.slice(-1);
          this.lastTime = lastEle[0].createTime;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    onMorel(item, index) {
      this.show = true;
      this.curComment = item.id;
      this.curIndex = index;
    },
    onSelect(action, index) {
      if (index === 0) {
        this.unlike();
      }
    },
    unlike() {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/comment/unlike",
          data: { commentId: this.curComment },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 9000) {
              this.$pop.open();
            } else if (res.data.code === 2000) {
              this.commlike.splice(this.curIndex, 1);
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
    getComments() {
      this.userId = this.$route.params.uid;
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/user/like",
        data: { userId: this.userId, size: 4 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            this.commlike = res.data.data;
            let lastEle = this.commlike.slice(-1);
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
        });
    },
  },
};
</script>

<style lang="less">
.cell {
  text-align: center;
  height: 100px;
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
  align-items: center;
  .title4 {
    margin: 0 10px;
    font-size: 28px;
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