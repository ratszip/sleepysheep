<template>
  <div class="topic" @scroll="onScroll">
    <topicNav v-if="nvData.avatar" :pnv="nvData"></topicNav>
    <topicInfo
      v-if="contentData.createTime"
      :pcontent="contentData"
    ></topicInfo>
    <commentV :pcomments="comments" ref="comment"></commentV>
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
      comments: { comments: null, topicId: null, logined: null },
    };
  },
  methods: {
    onScroll(e) {
      let oh = e.srcElement.offsetHeight;
      let sc = e.srcElement.scrollTop;
      let sh = e.srcElement.scrollHeight;
      if (oh + sc === sh) {
        this.$refs.comment.loadMore();
      }
    },
    //初始化数据
    initData(resData) {
      this.nvData.nickName = resData.topicVO.nickName;
      this.nvData.userId = resData.topicVO.userId;
      this.nvData.guestId = resData.topicVO.guestId;
      this.nvData.fans = resData.fans;
      this.nvData.avatar = resData.topicVO.avatar;
      this.nvData.topicId = this.topicId;

      this.contentData.like = resData.topicVO.like;
      this.contentData.title = resData.topicVO.title;
      this.contentData.topicId = this.topicId;
      this.contentData.content = resData.topicVO.content;
      this.contentData.userId = resData.topicVO.userId;
      this.contentData.isSolved = resData.topicVO.isSolved;
      this.contentData.guestId = resData.guestId;
      this.contentData.images = resData.topicVO.images;
      this.contentData.createTime = resData.topicVO.createTime;
    },
    getComments() {
      request({
        method: "post",
        url: "/comment/queryComments",
        data: {
          token: localStorage.token,
          topicId: this.topicId,
          page:0,
          size: 10,
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          if (res.data.code === 9000) {
            this.comments.logined = false;
            this.$pop.open();
          } else {
            this.comments.logined = true;
          }
          this.comments.comments = res.data.data;
          this.comments.topicId = this.topicId;
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
      })
        .then(
          (res) => {
            if (res.data.code === 8000) {
              this.$router.push("/404");
              return;
            }
            this.getComments();
            // this.comments.comments = getComments;
            // console.log(res.data.data.topicVO);
            // console.log(res.data.code);
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
        )
        .finally(() => {
          Toast.clear();
        });
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
  height: 100vh;
  overflow: scroll;
}
</style>