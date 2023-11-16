<template>
  <waterfall class="contentsug2" :data="mylist2.data">
    <div
      class="box2"
      ref="box2"
      v-for="(item, index) in mylist2.data"
      :key="index"
    >
      <img
        @click="t_click(item.id)"
        class="image2"
        :lazy-src="`${baseurl}/${item.images[0].path}`"
        alt=""
      />
      <h1 @click="t_click(item.id)" class="title2">
        <van-icon
          size="13"
          color="green"
          name="checked"
          style="vertical-align: -10%"
          v-if="item.isSolved"
        />
        <van-icon
          size="13"
          color="red"
          name="question-o"
          style="vertical-align: -10%"
          v-else-if="!item.isSolved"
        />{{ item.title }}
      </h1>
      <div class="info2">
        <div class="uinfo2" @click="t_click(item.id)">
          <img class="tx" :src="`${baseurl}/images/${item.avatar}.png`" />
          <span>&nbsp;{{ item.nickName }}</span>
        </div>
        <div class="tinfo2">
          <van-icon
            style="vertical-align: -10%"
            v-if="!item.like"
            name="like-o"
            size="16"
            @click="like(item)"
          />
          <van-icon
            style="vertical-align: -10%"
            v-if="item.like"
            name="like"
            color="red"
            @click="unlike(item, index)"
            size="16"
          />
          {{ item.likeCount }}
        </div>
      </div>
    </div>
  </waterfall>
</template>

<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      userId: null,
      mylist2: "",
      baseurl: this.$store.state.sBaseUrl,
    };
  },
  methods: {
    like(item) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/topic/like",
          data: { topicId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000 || res.data.code === 3100) {
              item.like = true;
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
    unlike(item, index) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/topic/unlike",
          data: { topicId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000 || res.data.code === 3100) {
              item.like = false;
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
    t_click(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      }
      this.$router.push(`/topic/${id}`);
      // console.log(id);
    },
    getTopic() {
      this.userId = this.$route.params.uid;
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/user/collect",
        data: { userId: this.userId },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          Toast.clear();
          this.mylist2 = res.data;
          if (res.data.msg.includes("登录")) {
            this.$pop.open();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },

  mounted() {
    this.getTopic();
  },
};
</script>

<style lang="less">
.contentsug2 {
  box-sizing: border-box;
  margin-bottom: 20px;
}

.box2 {
  // width: 50%;
  width: 380px !important;
  margin-top: 6px;
  background-color: white;
}
.image2 {
  width: 100%;
  max-height: 480px;
  min-height: 200px;
  overflow: hidden;
  object-fit: cover;
}

.title2 {
  font-size: small;
  width: 350px;
  // height: 70px;
  line-height: 36px;
  margin: 3px 7px 5px 7px;
  overflow: hidden;
  display: -webkit-box2;
  -webkit-box2-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.solv {
  margin-top: 6px;
}
.info2 {
  display: flex;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 26px;
  line-height: 50px;
  justify-content: space-between;

  .uinfo2 {
    vertical-align: baseline;
    .tx {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      vertical-align: text-bottom;
    }
    span {
      font-size: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 160px;
      line-height: 22px;
      display: inline-block;
      white-space: nowrap;
    }
    .tinfo2 {
      vertical-align: top;
      padding-right: 20px;
    }
  }
}
</style>