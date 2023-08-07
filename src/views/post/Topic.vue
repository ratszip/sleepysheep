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
      <van-swipe class="imbg">
        <van-swipe-item
          :style="imgclass"
          ref="pics"
          v-for="(image, index) in tcontent.images"
          :key="index"
        >
          <img
            class="mainpic"
            v-lazy="`http://114.55.88.242:8080/${image.path}`"
          />
        </van-swipe-item>
      </van-swipe>

      <span class="title">{{ tcontent.title }}</span>

      <p class="content">
        {{ tcontent.content }}
      </p>
      <div class="tbotom">
        <span class="solve" v-if="tcontent.isSolved == true">
          <van-icon size="14" name="checked" color="green" /> 已解决</span
        >

        <span class="solve" v-else-if="tcontent.isSolved == false">
          <van-icon size="14" name="question-o" /> 未解决
        </span>

        <span class="topictime">发布于{{ tcontent.createTime }}</span>
      </div>
    </div>
    <div class="comment" v-if="tcontent.comments">
      <div>
        <van-image
          class="toux"
          round
          width="20px"
          height="20px"
          src="http://114.55.88.242:8080/images/avatar_m_c.png"
        />
        <span>用户123</span>
        <p>我的评论是，楼主牛逼</p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
// .loopicx {
//   margin: 0 auto;
//   height: 400px;
//   // width: 100%;
//   text-align: center;
//   vertical-align: middle;
// }

.imgs {
  background-color: white;
  // padding: 0 20px;
  .author {
    .toux {
      vertical-align: middle;
    }
    .auname {
      font-size: 24px;
    }
  }
    .mainpic {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle,
      // object-fit: contain;
    }
  
  .solve {
    font-size: 20px;
    color: gray;
  }
  .tbotom {
    display: flex;
    justify-content: space-between;
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
    margin-left: 30px;
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
      imgclass: {
        margin: "0 auto",
        height: "",
        lineHeight: "",
        textAlign: "center",
        verticalAlign: "middle",
      },
    };
  },
  computed: {},
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
        if (this.tcontent.images[0].height <= this.tcontent.images[0].width) {
          let realh =
            (document.body.clientWidth * this.tcontent.images[0].height) /
            this.tcontent.images[0].width;
          if (realh < 200) {
            this.imgclass.height = "200px";
          } else {
            this.imgclass.height = realh + "px";
          }
        } else {
          this.imgclass.height = "400px";
          this.imgclass.lineHeight = "400px";
        }
        // this.$refs.pics.$el.style.width = 200;
        // this.$refs.pics.$el.style.height = this.tcontent.images[0].height;
        // console.log(document.body.clientWidth);
        // console.log();
      },
      (err) => {
        console.log(err);
      }
    );
  },
  // created() {
  //   this.$nextTick(() => {
  //     // 在这里获取 this.$refs.dom
  //     console.log(this.$refs.pics);
  //   });
  // },
};
</script>