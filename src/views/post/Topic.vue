<template>
  <div class="topic">
    <van-nav-bar left-text="返回" fixed left-arrow @click-left="onClickLeft" />
    <div class="imgs">
      <div class="topau">
        <div class="author" @click="goInfo">
          <van-image
            class="toux"
            round
            style="vertical-align: -20%"
            width="28px"
            height="28px"
            :src="`${baseurl}/images/${tcontent.avatar}.png`"
          />
          <span class="auname">{{ tcontent.nickName }}</span>
        </div>

        <van-button
          v-show="this.guest && !this.tcontent.fans"
          class="follow"
          size="small"
          round
          type="info"
          plain
          @click="follow"
          >关注</van-button
        >
        <van-button
          v-show="this.guest && this.tcontent.fans"
          class="follow"
          size="small"
          round
          type="default"
          plain
          @click="unfollow"
          >已关注</van-button
        >
      </div>
      <van-swipe class="imbg">
        <van-swipe-item
          :style="imgclass"
          ref="pics"
          v-for="(image, index) in tcontent.images"
          :key="index"
        >
          <img class="mainpic" v-lazy="`${baseurl}/${image.path}`" />
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
    <div class="comment" ref="refresh">
      <div class="ttc">共 {{ comments ? comments.length : 0 }} 条评论</div>
      <div class="citem" v-for="(item, index) in comments">
        <van-image
          class="ctoux"
          round
          width="28px"
          height="28px"
          :src="`${baseurl}/images/${item.avatar}.png`"
        />
        <span class="cuname"> {{ item.nickName }} </span>
        <p class="ccontent">{{ item.content }}</p>
        <span class="topictime ctime">{{ item.createTime }} </span>
        <div class="handl">
          <span>copy</span>
          <van-icon size="18" name="comment-o" />
          <div class="zan">
            <van-icon
              style="vertical-align: -10%"
              v-if="!item.likeCom"
              name="bookmark-o"
              size="18"
              @click="like(item)"
            />
            <van-icon
              style="vertical-align: -10%"
              v-if="item.likeCom"
              name="bookmark"
              color="red"
              @click="unlike(item)"
              size="18"
            />
            {{ item.likeCount }}
          </div>
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
  margin-top: 90px;
  padding-bottom: 10px;
  .topau {
   display: flex;
   justify-content: space-between;
   align-items:center;
    .author{
      display: flex;
      align-items:center;
      justify-content:center;
      .toux {
        vertical-align: middle;
        margin: 5px 5px 5px 10px;
        display: inline-block;
      }
      .auname {
        font-size: 30px;
      }
    }
    .follow {
      font-size: 24px;
      vertical-align: middle;
      width: 120px;
      height: 40px;
      margin-right: 20px;
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
    line-height: 40px;
    word-wrap: break-word;
    margin: 16px 8px 8px 60px;
    }
    .ctime{
      display: block;
      margin: 16px 8px 8px 60px;
    }
  }

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
      guest: false,
      baseurl: this.$store.state.sBaseUrl,
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

  methods: {
    goInfo() {
      console.log("ttttclick");
    },
    follow() {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
        this.$toast({
          message: "登录过期，请重新登录",
        });
      } else {
        request({
          method: "post",
          url: "/common/follow",
          data: { userId: this.tcontent.userId },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.tcontent.fans = true;
            } else if (res.data.code === 9000) {
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
    unfollow() {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
        this.$toast({
          message: "登录过期，请重新登录",
        });
      } else {
        request({
          method: "post",
          url: "/common/unfollow",
          data: { userId: this.tcontent.userId },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.tcontent.fans = false;
            } else if (res.data.code === 9000) {
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
    onClickLeft() {
      this.$router.back();
    },
    focus() {
      this.inputSize.maxHeight = 120;
    },
    blur() {
      this.inputSize.maxHeight = 30;
    },
    like(item) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
        this.$toast({
          message: "登录过期，请重新登录",
        });
      } else {
        request({
          method: "post",
          url: "/comment/like",
          data: { commentId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.likeCom = true;
              item.likeCount++;
            } else if (res.data.code === 9000) {
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
    unlike(item) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/comment/unlike",
          data: { commentId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.likeCom = false;
              item.likeCount--;
            } else if (res.data.code === 9000) {
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
    // 发布评论
    publish() {
      request({
        method: "post",
        url: "/comment/insertComment",
        data: { topicId: this.topicId, content: this.pubopinion },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.code === 2000) {
            if (this.commnets === undefined) {
              this.commnets = [];
            }
            this.comments.push(res.data.data);
          } else if (res.data.code === 9000) {
            setTimeout(() => {
              this.$pop.open();
            }, 1000);
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
      data: { token: localStorage.token, topicId: this.topicId },
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
        this.tcontent = res.data.data;
        this.comments = res.data.data.comments;
        if (this.tcontent.userId === this.tcontent.guestId) {
          this.guest = false;
        } else {
          this.guest = true;
        }
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