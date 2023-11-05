<template>
  <div class="nav_fcenter">
    <van-sticky class="st">
      <van-icon name="arrow-left" @click="fback" size="26" />
    </van-sticky>

    <van-tabs v-model="active" @click="tabClick" sticky>
      <van-search
        v-model="value"
        @focus="onfocus"
        placeholder="请输入搜索关键词"
      />
      <van-tab disabled></van-tab>
      <van-tab title="关注">
        <div v-for="(item, index) in follows" class="item">
          <van-image
            round
            width="40px"
            height="40px"
            :src="`${baseurl}/images/${item.avatar}.png`"
          />
          <span class="uname">{{ item.nickName }}</span>
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
      </van-tab>
      <van-tab title="粉丝">
        <div v-for="(item, index) in fans" class="item" :key="index">
          <van-image
            round
            width="40px"
            height="40px"
            :src="`${baseurl}/images/${item.avatar}.png`"
          />
          <span class="uname">{{ item.nickName }}</span>
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
      </van-tab>
      <van-tab disabled></van-tab>
    </van-tabs>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >到底了</van-divider
    >
    <van-action-sheet
      v-model="sheet"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
    />
  </div>
</template>
<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      baseurl: this.$store.state.sBaseUrl,
      userId: null,
      active: null,
      tokenid: null,
      fans: [],
      follows: [],
      searchRes: [],
      value: "",
      sheet: false,
      actions: [{ name: "移除" }],
    };
  },
  methods: {
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

    moreAct() {
      this.sheet = true;
    },
    onCancel() {},
    cancel() {},
    onfocus() {},
    tabClick(index, title) {
      console.log(this.userId == this.tokenid);
      if (index == 2 && this.fans.length == 0) {
        this.fansList();
      } else if (index == 1 && this.follows.length == 0) {
        this.followList();
      }
    },
    init() {
      this.$nextTick(function () {
        this.active = this.$route.params.act;
      });
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
        data: { followId: this.userId, size: 20, page: 1 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            if (res.data.code === 2000) {
              this.fans = res.data.data.flist;
              this.tokenid = res.data.data.uid;
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
        data: { fansId: this.userId, size: 20, page: 1 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            if (res.data.code === 2000) {
              this.follows = res.data.data.flist;
              this.tokenid = res.data.data.uid;
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
      this.active = 2;
      if (this.active == 1) {
        this.followList();
      } else if (this.active == 2) {
        this.fansList();
      }
    },
  },
  mounted() {
    this.init();
    this.getdata();
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