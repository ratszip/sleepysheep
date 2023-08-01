<template>
  <div class="topic">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="imgs">
      <div class="author">
        <van-image
          class="toux"
          round
          width="20px"
          height="20px"
          src="http://114.55.88.242:8080/images/avatar_m_c.png"
        />
        <span class="auname">{{ tcontent.userName }}</span>
      </div>
      <van-swipe class="loopic"
        ><!--:autoplay="3000" -->
        <van-swipe-item v-for="(image, index) in tcontent.images" :key="index">
          <img v-lazy="`http://114.55.88.242:8080/${image.path}`" />
        </van-swipe-item>
      </van-swipe>
      <div class="solve">
        <van-icon
          v-if="tcontent.isSolved == true"
          class="solve"
          name="checked"
          color="green"
        />
        <van-icon v-else-if="tcontent.isSolved == false" name="question-o" />
      </div>
      <span class="title">{{ tcontent.title }}</span>

      <p class="content">
        {{ tcontent.content }}
      </p>
      <span class="topictime">{{ tcontent.createTime }}</span>
    </div>
    <div class="comment" v-if="tcontent.comments">
      {{ tcontent.comments[0].content }}
    </div>
  </div>
</template>

<style lang="less">
.imgs {
  background-color: white;
  padding: 0 20px;
  .author {
    .toux {
      vertical-align: middle;
    }
    .auname {
      font-size: 24px;
    }
  }
  .loopic {
    margin: 0 auto;
    max-height: 900px;
    width: 100%;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  .solve {
    display: inline-block;
    vertical-align: middle;
    height: 40px;
  }
  .title {
    font-size: 40px;
    height: 56px;
    font-weight: 550;
    line-height: 50px;
    margin: 3px 7px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content {
    font-size: 32px;
    line-height: 50px;
    word-wrap: break-word;
    margin: 0;
    background-color: white;
  }
  .topictime {
    font-size: 20px;
    color: lightgray;
  }
}

// "`http://114.55.88.242:8080/${tcontent.images[0].path}`
</style>
<script>
import request from "@/util/request";
export default {
  data() {
    return {
      topicId: null,
      tcontent: "",
      baseurl: "http://114.55.88.242:8080/",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
  mounted() {
    this.topicId = this.$route.params.id;
    request({
      method: "post",
      url: "/topic/detail",
      data: { id: this.topicId },
    }).then(
      (res) => {
        this.tcontent = res.data.data;
        console.log(this.tcontent);
      },
      (err) => {
        console.log(err);
      }
    );
  },
  test() {},
};
</script>