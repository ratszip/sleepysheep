<template>
  <div class="topicontent">
    <van-swipe class="imbg">
      <van-swipe-item
        ref="pics"
        :style="imgclass"
        v-for="(image, index) in detail.images"
        :key="index"
      >
        <img class="mainpic" v-lazy="`${baseurl}/${image.path}`" />
      </van-swipe-item>
    </van-swipe>

    <h1 class="topictitle">
      {{ detail.title }}

      <div class="like">
        <van-icon
          v-if="!detail.like"
          size="20"
          name="like-o"
          @click="like_t(detail.topicId)"
        />
        <van-icon
          v-if="detail.like"
          color="red"
          size="20"
          name="like"
          @click="unlike_t(detail.topicId)"
        />
      </div>
    </h1>
    <p class="topictext">{{ detail.content }}</p>
    <div class="topicbottom">
      <span class="topictime">{{ detail.createTime }}</span>
      <div class="isfixed">
        <span
          class="solve"
          @click="setSolve(0)"
          v-if="
            detail.isSolved == 1 && this.detail.userId == this.detail.guestId
          "
        >
          <van-icon
            size="13"
            color="green"
            name="checked"
            style="vertical-align: -10%"
          />
          设为未解决</span
        >
        <span
          class="solve"
          @click="setSolve(1)"
          v-else-if="
            detail.isSolved == 0 && this.detail.userId == this.detail.guestId
          "
        >
          <van-icon
            size="13"
            color="red"
            name="question-o"
            style="vertical-align: -10%"
          />
          设为已解决
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/util/request";
import { Dialog } from "vant";
export default {
  props: {
    pcontent: {},
  },
  data() {
    return {
      baseurl: this.$store.state.sBaseUrl,
      detail: this.pcontent,
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
    setSolve(is) {
      Dialog.confirm({
        message: "修改问题解决状态",
      })
        .then(() => {
          // on confirm
          request({
            method: "post",
            url: "/topic/solve",
            data: {
              id: this.detail.topicId,
              isSolved: is,
            },
            headers: {
              "content-type": "multipart/form-data",
              token: localStorage.token,
            },
          }).then(
            (res) => {
              if (res.data.code === 2000) {
                this.detail.isSolved = is;
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
        })
        .catch(() => {
          // on cancel
        });
    },
    measure() {
      if (this.detail.userId === this.detail.guestId) {
        this.guest = false;
      } else {
        this.guest = true;
      }
      if (this.detail.images[0].height <= this.detail.images[0].width) {
        let realh =
          (document.body.clientWidth * this.detail.images[0].height) /
          this.detail.images[0].width;
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

    like_t(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/topic/like",
          data: { topicId: id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.detail.like = true;
              // item.likeCount++;
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
    unlike_t(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/topic/unlike",
          data: { topicId: id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.detail.like = false;
              // this.detail.likeCount--;
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
  },
  mounted() {
    this.measure();
    // this.$nextTick(() => {
    //   this.bus.$emit("tinfoh", this.$refs.tinfo.offsetHeight);
    // });
  },
};
</script>
<style lang="less">
.mainpic {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle,
      // object-fit: contain;
}
.topictitle {
    display: flex;
    width: 100%;
    font-size: 30px;
    vertical-align: bottom;
    line-height: 30px;
    margin-left: 16px;
    text-overflow: ellipsis;
    justify-content: space-between;
    .like{
      padding-right: 40px;
    }
}
  .topictext {
    font-size: 28px;
    line-height: 32px;
    word-wrap: break-word;
    margin-bottom: 10;
    padding-left: 16px;
    background-color: white;
  }
  .topictime {
    // margin-left: 16px;
    margin-right: 10px;
    font-size: 20px;
    color: lightgray;
  }
  .topicbottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px;
    .isfixed{
      padding-bottom: 10px;
      .solve {
        font-size: 20px;
        color: #7093DB;
        vertical-align: middle;
        }
    }
  }
</style>