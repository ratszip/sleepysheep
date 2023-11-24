<template>
  <div class="topic">
    <topicNav v-if="nvData.avatar" :pnv="nvData"></topicNav>
    <topicInfo
      v-if="contentData.createTime"
      :pcontent="contentData"
    ></topicInfo>
    <commentV :pcomments="comments"></commentV>
  </div>
</template>
<script>
import topicNav from "./TopicNav.vue";
import topicInfo from "./TopicInfo.vue";
import commentV from "./Comment.vue";
import request from "@/util/request";
import { Toast } from "vant";

export default {
  components: {
    topicNav,
    topicInfo,
    commentV,
  },
  data() {
    return {
      topicId: null,
      nvData: {
        nickName: null,
        avatar: null,
        userId: null,
        fans: null,
        guestId: null,
        topicId: null,
      },
      contentData: {
        topicId: null,
        title: null,
        content: null,
        userId: null,
        isSolved: null,
        guestId: null,
        createTime: null,
        images: null,
        like: null,
      },
      comments: { comments: null, topicId: null },
    };
  },
  methods: {
    //初始化数据
    initData(resData) {
      this.nvData.nickName = resData.nickName;
      this.nvData.userId = resData.userId;
      this.nvData.guestId = resData.guestId;
      this.nvData.fans = resData.fans;
      this.nvData.avatar = resData.avatar;
      this.nvData.topicId = this.topicId;

      this.contentData.like = resData.like;
      this.contentData.title = resData.title;
      this.contentData.topicId = this.topicId;
      this.contentData.content = resData.content;
      this.contentData.userId = resData.userId;
      this.contentData.isSolved = resData.isSolved;
      this.contentData.guestId = resData.guestId;
      this.contentData.images = resData.images;
      this.contentData.createTime = resData.createTime;

      // this.comments.comments = resData.comments;
      this.comments.topicId = this.topicId;
    },
    getComments() {
      request({
        method: "post",
        url: "/comment/queryComments",
        data: {
          token: localStorage.token,
          topicId: this.topicId,
          page: 1,
          size: 2,
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          if (res.data.code === 9000) {
            this.$toast({
              message: "请先登录",
            });
          }
          this.comments.comments = res.data.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //获取帖子详情
    getDetail() {
      this.topicId = this.$route.params.id;
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/topic/detail",
        data: { token: localStorage.token, topicId: this.topicId },
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          this.getComments();
          // this.comments.comments = getComments;
          Toast.clear();
          this.initData(res.data.data);
          if (res.data.code === 9000) {
            this.$toast({
              message: "请先登录",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
<style lang="less">
.topic {
  background-color: white;
}
</style>