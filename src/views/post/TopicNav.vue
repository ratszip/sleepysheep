<template>
  <div>
    <div class="topicnav">
      <van-icon name="arrow-left" @click="onClickLeft" style="margin: 0 6px" />
      <van-image
        @click="goUserInfo(pnv.userId)"
        round
        width="30px"
        height="30px"
        :src="`${baseurl}/images/${pnv.avatar}.png`"
      />
      <span class="lzName" @click="goUserInfo(pnv.userId)">{{
        pnv.nickName
      }}</span>
      <div class="navright">
        <van-icon name="ellipsis" style="margin: 0 10px" />
        <van-button
          class="follow"
          size="small"
          v-show="pnv.userId != pnv.guestId && !pnv.fans"
          round
          type="default"
          @click="follow"
          >关 注</van-button
        >
        <van-button
          class="follow"
          size="small"
          v-show="pnv.userId != pnv.guestId && pnv.fans"
          round
          type="default"
          @click="unfollow"
          >已关注</van-button
        >
      </div>
    </div>
    <div class="nvsp"></div>
  </div>
</template>

<script>
import request from "@/util/request";
export default {
  data() {
    return {
      baseurl: this.$store.state.sBaseUrl,
    };
  },
  props: {
    pnv: {},
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    goUserInfo(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      }
      this.$router.push(`/user/${id}`);
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
          data: { userId: this.pnv.userId },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.pnv.fans = true;
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
          data: { userId: this.pnv.userId },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.pnv.fans = false;
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
};
</script>

<style lang="less">
.nvsp {
  height: 81px;
}
.topicnav {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  .lzName {
    max-width: 50%;
    font-size: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .navright {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    .follow {
      width: 100px;
      height: 50px;
      color: rgb(99, 121, 218);
    }
  }
}
</style>