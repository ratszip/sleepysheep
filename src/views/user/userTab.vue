<template>
  <van-tabs class="coll" boder v-model="active" sticky>
    <van-tab>
      <template #title>
        帖子<img
          src="../../assets/lock.png"
          class="lock"
          v-show="userProp.topicPri"
        />
      </template>
      <!-- <mytopic></mytopic> -->
      <div ref="aa" class="test" v-if="this.$store.state.userInfoH">
        <h1 v-for="index in 9">{{ index }}</h1>
      </div>
    </van-tab>
    <van-tab>
      <template #title>
        评论<img
          src="../../assets/lock.png"
          class="lock"
          v-show="userProp.commentPri"
        />
      </template>
    </van-tab>
    <van-tab>
      <template #title>
        收藏<img
          src="../../assets/lock.png"
          class="lock"
          v-show="userProp.collectPri"
        />
      </template>
      收藏
    </van-tab>
    <van-tab>
      <template #title>
        点赞<img
          src="../../assets/lock.png"
          class="lock"
          v-show="userProp.likePri"
        />
      </template>
      点赞
    </van-tab>
  </van-tabs>
</template>

<script>
import request from "@/util/request";
// import mytopic from "./Mytopic.vue";
export default {
  data() {
    return {
      active: 0,
      userProp: "",
      topic: "",
      collocet: "",
      like: "",
      comment: "",
      // isReset: this.$refs.aa,
    };
  },

  methods: {
    update() {},
    // aa.style.height = ;
    getTopic() {
      request({
        method: "post",
        url: "/user/topic",
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          this.topic = res.data;
          if (res.data.msg.includes("登录")) {
            this.$pop.open();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getCollect() {},
    getLike() {},
    getComment() {},
    async setContain() {
      await this.$nextTick();
      var aa = this.$refs.aa;
      var fixedH = this.$store.state.bottomHeight + this.$store.state.userInfoH;
      aa.style.height = document.documentElement.clientHeight - fixedH + "px";
      // console.log(this.$store.state.bottomHeight, this.$store.state.userInfoH);
    },
  },

  mounted() {
    this.bus.$on("message", (res) => {
      this.userProp = res;
      //console.log(res);
    });
    this.getTopic();
    this.setContain();
  },
  updated() {
    this.setContain();
  },
};
</script>

<style lang="less">
.nr {
  overflow: auto;
}
.test {
  width: 100%;
  height: 18rem;
  background-color: yellow;
  overflow: scroll;
}
.lock {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.coll {
  border-radius: 3%;
  position: sticky;
}
</style>