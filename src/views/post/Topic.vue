<template>
  <div class="topic">
    <van-nav-bar left-text="返回" fixed left-arrow @click-left="onClickLeft" />

    <div class="imgs">
      <div class="topau">
        <div class="author">
          <van-image
            class="toux"
            round
            style="vertical-align: -20%"
            width="28px"
            height="28px"
            src="http://114.55.88.242:8080/images/avatar_m_c.png"
          />
          <span class="auname"> {{ tcontent.userName }}</span>
        </div>
        <van-button class="follow" size="small" round type="info" plain
          >关注</van-button
        >
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

      <p class="content">&nbsp{{ tcontent.content }}</p>
      <div class="tbotom">
        <span class="solve" v-if="tcontent.isSolved == true">
          <van-icon
            style="vertical-align: -10%"
            size="15"
            name="checked"
            color="green"
          />
          已解决</span
        >
        <span class="solve" v-else-if="tcontent.isSolved == false">
          <van-icon style="vertical-align: -10%" size="15" name="question-o" />
          未解决
        </span>
        <span class="topictime">发布于{{ tcontent.createTime }}</span>
      </div>
    </div>
    <div class="comment">
      <div class="ttc">共 {{ comments ? comments.length : 0 }} 条评论</div>
      <div class="citem" v-for="(item, index) in comments">
        <van-image
          class="ctoux"
          round
          width="28px"
          height="28px"
          src="http://114.55.88.242:8080/images/avatar_m_c.png"
        />
        <span class="cuname">{{ item.uname }} </span>
        <p class="ccontent">{{ item.content }}</p>
        <span class="topictime ctime">{{ item.createTime }} </span>
        <div class="handl">
          <van-icon size="18" name="comment-o" />
          <span><van-icon name="good-job-o" size="18" /> 123</span>
          <span>copy</span>
        </div>
      </div>
      <div class="nomore">~暂无更多回复~</div>
    </div>
    <div class="empty"></div>
    <div class="huifu">
      <van-field
        class="rep"
        type="textarea"
        placeholder="发表一下观点吧"
        extra="发表"
        v-model="pubopinion"
        @focus="focus"
        @blur="blur"
        ref="input"
        :autosize="inputSize"
      >
        <template #button>
          <van-button @click="publish" size="small" round type="primary"
            >发表</van-button
          >
        </template>
      </van-field>
    </div>
  </div>
</template>

<style lang="less">
.empty{
  width: 100%;
  height: 60px;
}
.huifu{
  position: fixed;
  bottom: 0;
  width: 100%;
  .rep{
    .van-field__body{
      width: 100%;
      .van-field__control{
        width:90%;
        // height: 60px;
        padding-left: 20px;
        background-color: #F0F0F0;
        border-radius: 20px;
      }
    }
  }
}
.imgs {
  background-color: white;
  // padding: 0 20px;
  padding-bottom: 10px;
  .topau {
   display: flex;
   justify-content: space-between;
    .author{
      .toux {
        vertical-align: middle;
        margin: 0px 5px 5px 10px;
      }
      .auname {
        font-size: 28px;
      }
    }
    .follow {
      font-size: 24px;
      vertical-align: middle;
      width: 120px;
      margin-top: 30px;
      height: 40px;
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
    font-size: 26px;
    color: gray;
  }
  .tbotom {
    display: flex;
    justify-content: space-between;
    padding-left: 16px;
  }
  .title {
    font-size: 40px;
    height: 50px;
    font-weight: 550;
    line-height: 50px;
    margin: 10px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content {
    font-size: 32px;
    line-height: 50px;
    word-wrap: break-word;
    margin: 0;
    padding-left: 12px;
    background-color: white;
  }
 
}

.topictime {
    margin-left: 20px;
    margin-right: 10px;
    font-size: 20px;
    color: lightgray;
  }
  .ttc{
    margin-top: 2px;
    color: rgb(107, 106, 106);
    font-size: 26px;
    padding: 10px;
    background-color: white;
  }
  .nomore{
    text-align: center;
    font-size: 26px;
    color: lightgray;
    margin-bottom: 60px;
  }
  .citem{
    // display: flex;
    padding: 8px 10px 8px 18px;
    // margin: 2px 0;
    margin-bottom: 2px;
    background-color: white;
    .ctoux {
      vertical-align: middle;
    }
    .handl{
      font-size: 28px;
      display: flex;
      justify-content: space-between;
      color: gray;
      margin:0 60px;
    }
    .cuname {
      font-size: 28px;
      color: gray;
    }
    .ccontent{
      font-size: 28px;
    line-height: 28px;
    word-wrap: break-word;
    margin: 16px 8px 8px 60px;
    }
    .ctime{
      display: block;
      margin: 16px 8px 8px 60px;
    }
  }

// "`http://114.55.88.242:8080/${tcontent.images[0].path}`
</style>
<script>
import request from "@/util/request";
export default {
  data() {
    return {
      pubopinion: "",
      topicId: null,
      tcontent: "",
      comments: [],
      baseurl: "http://114.55.88.242:8080/",
      inputSize: {
        maxHeight: 28,
        minHeight: 28,
      },
      imgclass: {
        margin: "0 auto",
        height: "",
        lineHeight: "",
        textAlign: "center",
        verticalAlign: "middle",
      },
    };
  },
  inject: ["reload"],
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    focus() {
      this.inputSize.maxHeight = 120;
    },
    blur() {
      this.inputSize.maxHeight = 30;
    },

    publish() {
      request({
        method: "post",
        baseURL: "http://localhost:8080",
        url: "/topic/insertComment",
        data: { topicId: this.topicId, content: this.pubopinion },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.code === 2000) {
            this.comments.push(this.pubopinion);
            this.$router.go(0);
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
        this.comments = res.data.data.comments;
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
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>