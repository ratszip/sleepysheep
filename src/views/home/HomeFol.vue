<template>
  <div class="container4">
    <div class="item4" v-for="(item, index) in commhome" :key="index">
      <div class="head4">
        <van-image
          v-if="item.commentAvatar"
          round
          width="34px"
          height="34px"
          :src="`${baseurl}/images/${item.commentAvatar}.png`"
        />
        <van-image
          v-if="!item.commentAvatar"
          round
          width="34px"
          height="34px"
          :src="`${baseurl}/images/${item.topicAvatar}.png`"
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
        <span @click="onMorel" style="flex: 1; text-align: end">︙</span>
      </div>
      <h1 class="content4" v-if="item.commentId">{{ item.content }}</h1>
      <div v-if="item.title" class="topic4">
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
      <div v-if="!item.title" class="unknow">
        <van-icon name="close" />帖子已被删除
      </div>
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>
<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      commhome: [],
      baseurl: this.$store.state.sBaseUrl,
      actions: [{ name: "喜欢" }, { name: "举报" }],
      show: false,
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    onMorel() {
      this.show = true;
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
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            Toast.clear();
            this.commhome = res.data.data;
            if (res.data.msg.includes("登录")) {
              this.$pop.open();
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
  },
};
</script>

<style lang="less">
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
    border: 2px solid lightblue;
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