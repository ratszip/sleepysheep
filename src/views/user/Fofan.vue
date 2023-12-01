<template>
  <div class="nav_fcenter">
    <van-sticky class="st">
      <van-icon name="arrow-left" @click="fback" size="26" />
    </van-sticky>

    <van-tabs
      v-model="active"
      @click="tabClick"
      sticky
      :before-change="changeTab"
    >
      <van-search
        :show-action="showCancel"
        v-model="searchValue"
        @search="onSearch()"
        @cancel="onCancel"
        placeholder="请输入搜索关键词"
      />
      <van-tab disabled></van-tab>
      <van-tab title="关注">
        <scroller
          style="top: 100px"
          :height="sch"
          ref="myscroller"
          :on-infinite="infinite1"
        >
          <div v-for="(item, index) in followsShow" class="item">
            <van-image
              @click="gouser(item.followId)"
              round
              width="40px"
              height="40px"
              :src="`${baseurl}/${item.avatar}`"
            />
            <span @click="gouser(item.followId)" class="uname">{{
              item.nickName
            }}</span>
            <van-button
              plain
              round
              v-if="item.isF && item.followId != tokenid"
              type="default"
              size="mini"
              style="margin-left: 10px; width: 56px; font-size: 10px"
              @click="unfollow(item, index)"
              >已关注</van-button
            >
            <van-button
              v-else-if="!item.isF && item.followId != tokenid"
              round
              type="danger"
              style="margin-left: 10px; width: 56px; font-size: 10px"
              size="mini"
              @click="follow(item, index)"
              >关 &nbsp;注</van-button
            >
          </div>
        </scroller>
      </van-tab>
      <van-tab title="粉丝">
        <scroller
          style="top: 100px"
          :height="sch"
          ref="myscroller"
          :on-infinite="infinite2"
        >
          <div v-for="(item, index) in fansShow" class="item" :key="index">
            <van-image
              round
              @click="gouser(item.fansId)"
              width="40px"
              height="40px"
              :src="`${baseurl}/${item.avatar}`"
            />
            <span class="uname" @click="gouser(item.fansId)">{{
              item.nickName
            }}</span>
            <van-button
              v-if="!item.isB && item.fansId != tokenid"
              type="danger"
              size="mini"
              round
              style="margin-left: 10px; width: 56px; font-size: 10px"
              @click="follow(item, index)"
              >关 注</van-button
            >

            <van-button
              v-else-if="item.isB && item.fansId != tokenid"
              plain
              type="default"
              size="mini"
              round
              style="margin-left: 10px; width: 56px; font-size: 10px"
              @click="unfollow(item, index)"
              >已关注</van-button
            >
            <van-icon
              size="20"
              v-if="userId == tokenid"
              @click="moreAct"
              name="ellipsis"
              style="margin-left: 10px"
            />
          </div>
        </scroller>
      </van-tab>
      <van-tab disabled></van-tab>
    </van-tabs>
    <van-action-sheet
      v-model="sheet"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>
<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      showCancel: false,
      baseurl: this.$store.state.sourceUrl,
      userId: null,
      active: 1,
      tokenid: null,
      fans: [],
      fansShow: [],
      follows: [],
      followsShow: [],
      searchValue: "",
      sheet: false,
      actions: [{ name: "移除" }],
      sch: document.documentElement.clientHeight + "",
      lastTime1: null,
      lastTime2: null,
    };
  },
  mounted() {
    this.init();
    this.getdata();
    this.setContain();
  },
  methods: {
    async setContain() {
      await this.$nextTick();
      this.$refs.myscroller1.finishInfinite(true);
      this.$refs.myscroller2.finishInfinite(true);
    },

    infinite1(done) {
      this.loadmorefol();
    },
    infinite2() {
      this.loadmorefan();
    },
    loadmorefol(done) {
      request({
        method: "post",
        url: "/common/followList",
        data: { fansId: this.userId, size: 20, createTime: this.lastTime1 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          this.$refs.myscroller1.finishInfinite(true);
          if (res.data.data == undefined) {
            this.$toast({
              message: "没有更多了~",
            });
            return;
          }
          if (res.data.code === 6000) {
            this.$toast({
              message: "访问过于频繁，稍后再试",
            });
            return;
          }
          this.follows.push(...res.data.data);
          let lastEle = this.follows.slice(-1);
          this.lastTime1 = lastEle[0].createTime;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    loadmorefan() {
      request({
        method: "post",
        url: "/common/fansList",
        data: { followId: this.userId, size: 20, createTime: this.lastTime2 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          this.$refs.myscroller2.finishInfinite(true);
          if (res.data.data == undefined) {
            this.$toast({
              message: "没有更多了~",
            });
            return;
          }
          if (res.data.code === 6000) {
            this.$toast({
              message: "访问过于频繁，稍后再试",
            });
            return;
          }
          this.fans.push(...res.data.data);
          let lastEle = this.fans.slice(-1);
          this.lastTime2 = lastEle[0].createTime;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    follow(item) {
      var uid = item.followId ? item.followId : item.fansId;
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
          data: { userId: uid },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.isF = true;
              item.isB = true;
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
    unfollow(item) {
      var uid = item.followId ? item.followId : item.fansId;
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
          data: { userId: uid },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.isF = false;
              item.isB = false;
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
    gouser(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      }
      this.$router.push(`/user/${id}`);
    },
    moreAct() {
      this.sheet = true;
    },
    onCancel() {
      this.clear();
    },
    clear() {
      if (this.active > 1) {
        this.fansList();
      } else {
        this.followList();
      }
      this.searchValue = "";
      this.showCancel = false;
    },
    changeTab() {
      if (this.showCancel) {
        this.clear();
      }
      return true;
    },
    onSearch() {
      this.showCancel = true;
      if (this.searchValue.trim() === "") {
        this.$toast({
          message: "不能为空",
        });
        this.showCancel = false;
        return;
      }
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/common/search",
        data: {
          info: this.searchValue,
          type: this.active - 1,
          id: this.userId,
        },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            if (res.data.code === 2000) {
              if (this.active > 1) {
                this.fansShow = res.data.data;
              } else {
                this.followsShow = res.data.data;
              }
            } else if (res.data.code === 9000) {
              this.showCancel = false;
              this.$pop.open();
            } else {
              this.showCancel = false;
              this.$toast({
                message: res.data.msg,
              });
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
    tabClick(index) {
      if (index == 2 && this.fans.length == 0) {
        this.fansList();
      } else if (index == 1 && this.follows.length == 0) {
        this.followList();
      }
    },
    init() {
      this.active = Number(this.$route.params.act);
      this.userId = this.$route.params.id;
    },
    fback() {
      this.$router.back();
    },
    fansList() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/common/fansList",
        data: { followId: this.userId, size: 20, createTime: this.lastTime2 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            if (res.data.code === 2000) {
              this.fans = res.data.data.flist;
              this.fansShow = this.fans;
              this.tokenid = res.data.data.uid;
              let lastEle = this.fans.slice(-1);
              this.lastTime2 = lastEle[0].createTime;
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
        )
        .finally(() => {
          Toast.clear();
        });
    },
    followList() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/common/followList",
        data: { fansId: this.userId, size: 20, createTime: this.lastTime1 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            if (res.data.code === 2000) {
              this.follows = res.data.data.flist;
              this.followsShow = this.follows;
              this.tokenid = res.data.data.uid;
              let lastEle = this.follows.slice(-1);
              this.lastTime1 = lastEle[0].createTime;
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
        )
        .finally(() => {
          Toast.clear();
        });
    },
    getdata() {
      if (this.active == 1) {
        this.followList();
      } else if (this.active == 2) {
        this.fansList();
      }
    },
  },
};
</script>
<style lang="less">
.st {
  position: absolute;
  z-index: 99999;
  margin: 20px;
}
.item {
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 28px;
  background-color: white;
  margin: 2px 0;
  padding: 10px 20px;
  .uname {
    margin-left: 20px;
    width: 56%;
  }
}
.fcontent {
  margin-top: 10px;
}
.fdet {
  background-color: white;
  // display: flex;
  height: 80px;
  // margin: 0 auto;
  margin-top: 10px;
  padding: 0px 50px;

  .funame {
    // flex: 2;
    text-overflow: ellipsis;
    display: inline-block;
    font-size: 30px;
    height: 72px;
    width: 210px;
    vertical-align: middle;
    margin-left: 30px;
  }
  .follow {
    margin-left: 180px;
    margin-top: -40px;
    width: 120px;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
  }
}
.fhead {
  display: flex;
  display: -webkit-flex;
  background-color: #ffff;
  .fback {
    margin-top: 20px;
  }
}
.ftab {
  flex: 1;
}
.nav_fcenter {
  flex: 2;
}
</style>