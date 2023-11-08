<template>
  <waterfall class="contentsug" :data="suglist.data">
    <!-- <div class="sugad">banner</div> -->
    <div
      class="box"
      ref="box"
      v-for="(item, index) in suglist.data"
      :key="index"
    >
      <img
        @click="t_click(item.id)"
        class="image"
        :lazy-src="`${baseurl}/${item.images[0].path}`"
        alt=""
      />
      <h1 @click="t_click(item.id)" class="title">
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
        />
        {{ item.title }}
      </h1>
      <div class="info">
        <div class="uinfo">
          <img
            class="tx"
            @click="gouser(item.userId)"
            :src="`${baseurl}/images/${item.avatar}.png`"
          />
          <span @click="gouser(item.userId)">&nbsp;{{ item.nickName }}</span>
        </div>
        <div class="tinfo">
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
            @click="unlike(item)"
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
      suglist: "",
      baseurl: this.$store.state.sBaseUrl,
    };
  },
  methods: {
    gouser(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      }
      this.$router.push(`/user/${id}`);
    },
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
            if (res.data.code === 2000) {
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
    unlike(item) {
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
            if (res.data.code === 2000) {
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
    getData() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/index/sug",
        data: { token: localStorage.token },
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then(
          (res) => {
            this.suglist = res.data;
            if (res.data.msg.includes("登录")) {
              this.$pop.open();
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
    this.getData();
  },
};
</script>

<style lang="less">
.contentsug {
  box-sizing: border-box;
}
.sugad {
  width: 100%;
  height: 300px;
  background-color: bisque;
}
// .space {
//   height: 200px;
// }
.box {
  // float: left;
  // position: absolute;
  // width: 50%;
  width: 382px !important;
  margin-top: 6px;
  background-color: white;
}
.image {
  width: 100%;
  max-height: 480px;
  min-height: 200px;
  overflow: hidden;
  object-fit: cover;
}

.title {
  font-size: small;
  width: 350px;
  // height: 70px;
  line-height: 36px;
  margin: 3px 7px 5px 7px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.solv {
  margin-top: 6px;
}
.info {
  display: flex;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 26px;
  line-height: 50px;
  justify-content: space-between;

  .uinfo {
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
    .tinfo {
      vertical-align: top;
      padding-right: 20px;
    }
  }
}
</style>