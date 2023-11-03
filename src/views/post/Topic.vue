<template>
  <div class="topic">
    <topicNav v-if="nvData.avatar" :pnv="nvData"></topicNav>
    <topicInfo v-if="contentData.likeCount" :pcontent="contentData"></topicInfo>
    <commentV v-if="comments" :pcomments="comments"></commentV>
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
      },
      contentData: {
        topicId: null,
        title: null,
        content: null,
        userId: null,
        solved: null,
        guestId: null,
        createTime: null,
        images: null,
        likeCount: null,
      },
      comments: [],
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

      this.contentData.title = resData.title;
      this.contentData.content = resData.content;
      this.contentData.userId = resData.userId;
      this.contentData.solved = resData.isSolved;
      this.contentData.guestId = resData.guestId;
      this.contentData.createTime = resData.createTime;
      this.contentData.images = resData.images;
      this.contentData.likeCount = resData.likeCount;

      this.comments = resData.comments;
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