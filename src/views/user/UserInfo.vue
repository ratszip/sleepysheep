<template>
  <div class="pinfo" ref="userh">
    <van-loading class="load" type="spinner" size="24px" v-show="pageLoading" />

    <div class="top">
      <van-icon
        class="self"
        v-show="userInfo && userInfo.self"
        size="20px"
        name="setting-o"
        @click="settings"
      />
      <div class="other" v-show="userInfo && !userInfo.self">
        <van-icon class="more" size="20px" name="arrow-left" @click="back" />
        <van-icon class="more" size="20px" name="ellipsis" @click="more" />
      </div>
    </div>
    <div class="pdinfo">
      <van-image
        v-if="userInfo"
        class="toux"
        round
        width="50px"
        height="50px"
        :src="`${this.$store.state.sourceUrl}/${userInfo.avatar}`"
      />
      <!-- <span>namesla</span> -->
      <div class="ptext">
        <div class="pin sp"></div>
        <div class="pin name">{{ userInfo.nickName }}</div>
        <div class="pin intro">
          {{ userInfo.intro }}
        </div>
      </div>
      <div class="ercode" @click="dashang">
        <van-icon name="gold-coin-o" />打赏
      </div>

      <van-dialog v-model="showds" title="打赏码">
        <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
        <img
          v-if="userInfo.ewm"
          style="
            width: 280px;
            height: 280px;
            margin-left: 50%;
            transform: translateX(-50%);
          "
          :src="`${baseurl}/${userInfo.ewm}`"
        />
      </van-dialog>
    </div>
    <div class="bottom">
      <div>
        <span class="fan">
          关注:
          <a href="javaScript:void(0); " @click="followlist">{{
            userInfo.followCount
          }}</a>
        </span>

        <span class="fan">
          粉丝：<a href="javaScript:void(0); " @click="fanslist">{{
            userInfo.fansCount
          }}</a>
        </span>
      </div>

      <van-button
        v-show="userInfo && userInfo.self"
        class="follow"
        size="small"
        round
        type="info"
        plain
        @click="edit"
        >编辑
      </van-button>
      <van-button
        v-show="userInfo && !userInfo.self && !userInfo.isFans"
        class="follow"
        size="small"
        round
        type="danger"
        @click="follow"
        >关注</van-button
      >
      <van-button
        v-show="userInfo && !userInfo.self && userInfo.isFans"
        class="follow"
        size="small"
        round
        type="default"
        @click="unfollow"
        >已关注</van-button
      >
    </div>
  </div>
</template>

<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      userInfo: "",
      pageLoading: "",
      uid: 0,
      showds: false,
      baseurl: this.$store.state.sourceUrl,
    };
  },
  methods: {
    dashang() {
      if (!this.userInfo.ewm) {
        this.$toast({
          message: "对方未开通此功能",
        });
        return;
      }
      this.showds = true;
    },
    setUser() {
      this.$emit("transUser", this.userInfo);
      this.bus.$emit("message", this.userInfo);
      this.$store.commit("setInfoH", this.$refs.userh.clientHeight + 51);
      // console.log(this.$store.state.userInfoH);
    },
    edit() {
      this.$router.push("/edit");
    },
    followlist() {
      this.$router.push(`/fans/${this.userInfo.id}/1`);
    },
    fanslist() {
      this.$router.push(`/fans/${this.userInfo.id}/2`);
    },
    getUserInfo() {
      this.uid = this.$route.params.uid;
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/user/info",
        data: { userId: this.uid },
        headers: {
          token: localStorage.token,
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          this.pageLoading = false;
          if (res.data.code === 2000) {
            this.userInfo = res.data.data;
            this.setUser();
          } else if (res.data.code === 9000) {
            this.$pop.open();
            Toast.clear();
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
          data: { userId: this.uid },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.userInfo.isFans = true;
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
          data: { userId: this.uid },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.userInfo.isFans = false;
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
    back() {
      this.$router.back();
    },
    more() {},
    settings() {
      this.$router.push("/settings");
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>

<style lang="less">
.van-image--round img {
  border-radius: inherit;
  object-fit: cover;
}
.bottom {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  .fan {
    font-size: 24px;
    margin-left: 30px;
    a {
      text-decoration: none;
      color: lightblue;
    }
  }
  .follow {
    font-size: 24px;
    vertical-align: bottom;
    margin-top: 20px;
    width: 160px;
    height: 46px;
  }
}
.top {
  display: flex;
  margin-right: 20px;
  padding-top: 15px;
  .self {
    align-self: flex-end;
    margin-left: auto;
  }
  .other {
    padding-bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
.pinfo {
  background-color: rgb(131, 158, 199);
  color: white;
  .load {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-32px, -32px);
  }
}

.pdinfo {
  padding: 10px 0px 0px 30px;
  height: 130px;
  display: flex;
  flex-direction: row;
  .ercode {
    margin-right: 60px;
    margin-top: 28px;
    font-size: 30px;
  }
  .ptext {
    flex: 1;
    display: flex;
    flex-flow: column;
    margin-left: 20px;
    .sp {
      overflow: hidden;
      flex: 1;
    }

    .name {
      flex: 1;
      font-size: 28px;
      font-weight: bold;
      text-overflow: ellipsis;
    }
    .intro {
      flex: 2;
      font-size: 22px;
    }
  }
}
</style>