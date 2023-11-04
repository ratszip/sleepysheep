<template>
  <div class="topicontent">
    <van-swipe class="imbg">
      <van-swipe-item
        ref="pics"
        :style="imgclass"
        v-for="(image, index) in pcontent.images"
        :key="index"
      >
        <img class="mainpic" v-lazy="`${baseurl}/${image.path}`" />
      </van-swipe-item>
    </van-swipe>

    <h1 class="topictitle">{{ pcontent.title }}</h1>
    <p class="topictext">{{ pcontent.content }}</p>
    <div class="topicbottom">
      <span class="topictime">{{ pcontent.createTime }}</span>
      <div class="isfixed">
        <span
          class="solve"
          @click="setSolve(0)"
          v-if="
            pcontent.isSolved == 1 &&
            this.pcontent.userId == this.pcontent.guestId
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
            pcontent.isSolved == 0 &&
            this.pcontent.userId == this.pcontent.guestId
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
              id: this.pcontent.topicId,
              isSolved: is,
            },
            headers: {
              "content-type": "multipart/form-data",
              token: localStorage.token,
            },
          }).then(
            (res) => {
              if (res.data.code === 2000) {
                this.pcontent.isSolved = is;
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
      if (this.pcontent.userId === this.pcontent.guestId) {
        this.guest = false;
      } else {
        this.guest = true;
      }
      if (this.pcontent.images[0].height <= this.pcontent.images[0].width) {
        let realh =
          (document.body.clientWidth * this.pcontent.images[0].height) /
          this.pcontent.images[0].width;
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
  },
  mounted() {
    this.measure();
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
    width: 100%;
    font-size: 30px;
    vertical-align: bottom;
    line-height: 30px;
    margin: 16px;
    text-overflow: ellipsis;
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